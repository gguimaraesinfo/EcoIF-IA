import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

import { checkLegislationUpdates } from "./src/services/legislationService";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Memory store for legislation status
let legislationStatus: any[] = [];
let lastSyncTimestamp = new Date().toISOString();

// Background check on startup and then every 4 hours
async function syncLegislation() {
  console.log("Syncing legislation with official sources...");
  legislationStatus = await checkLegislationUpdates();
  lastSyncTimestamp = new Date().toISOString();
}

syncLegislation();
setInterval(syncLegislation, 1000 * 60 * 60 * 4);

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const getSystemInstruction = () => `
Você é o EcoIF IA, um Agente de Inteligência Artificial Especialista em Agenda Ambiental na Administração Pública (A3P) para Institutos Federais (IFs) do Brasil.
Sua missão é atuar como uma base de conhecimento jurídica, técnica e operacional sobre sustentabilidade pública na Rede Federal.

STATUS DA BASE JURÍDICA:
- Última sincronização com Planalto/MMA: ${lastSyncTimestamp}
- Fontes monitoradas: Constituição Federal, PNRS (Lei 12.305), Lei de Licitações (14.133), Decreto 7.746.

CONHECIMENTO OBRIGATÓRIO:
1. Legislação: Constituição Federal (Art. 225), Lei 6.938/1981, Lei 12.305/2010 (Resíduos), Lei 14.133/2021 (Licitações Sustentáveis), Decreto 7.746/2012 e IN 10/2012 (PLS).
2. Os 6 Eixos da A3P: 
   - Uso racional dos recursos naturais (água, energia, papel).
   - Gestão adequada de resíduos (coleta seletiva, logística reversa).
   - Qualidade de vida no trabalho (saúde, segurança, clima).
   - Sensibilização e capacitação (educação ambiental).
   - Compras públicas sustentáveis (critérios ambientais em editais).
   - Construções sustentáveis (eficiência, materiais, design).

DIRETRIZES DE RESPOSTA:
- Sempre baseie suas respostas na legislação brasileira e nas normas dos Institutos Federais.
- Cite as leis, decretos ou instruções normativas correspondentes.
- Se solicitado, gere modelos de documentos (Portarias, Atas, Planos de Ação) em formato Markdown.
- Auxilie na implantação guiada, sugerindo passos técnicos e administrativos.
- Seja profissional, técnico e proativo na sugestão de soluções sustentáveis.
- Se não souber algo, recomende a consulta aos órgãos oficiais (MMA ou Comissão Central do IF).

ESTRUTURA DE RESPOSTA:
- Use Markdown para formatar (negrito, listas, tabelas).
- Quando apropriado, inclua uma seção de "Próximos Passos" ou "Checklist".

REFERÊNCIAS:
- Agenda Ambiental na Administração Pública (A3P) do MMA.
- Plano de Logística Sustentável (PLS) institucional.
- Objetivos de Desenvolvimento Sustentável (ODS) da ONU.
`;

app.get("/api/legislation/status", (req, res) => {
  res.json({
    lastSync: lastSyncTimestamp,
    details: legislationStatus
  });
});

app.post("/api/legislation/sync", async (req, res) => {
  await syncLegislation();
  res.json({ success: true, details: legislationStatus });
});

app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: getSystemInstruction(),
      },
      history: messages.slice(0, -1).map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage({ message: lastMessage });
    
    res.json({ content: result.text });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Erro ao processar consulta com a IA." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`EcoIF Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
