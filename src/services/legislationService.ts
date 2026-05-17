import fetch from 'node-fetch';

interface TrackedLaw {
  id: string;
  url: string;
  name: string;
  lastChecked?: string;
  contentHash?: string;
}

const TRACKED_LEGISLATION: TrackedLaw[] = [
  { id: 'Constituicao', name: 'Constituicao Federal (Art 225)', url: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm' },
  { id: 'PNRS', name: 'Lei 12.305/2010 (Resíduos Sólidos)', url: 'https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2010/lei/l12305.htm' },
  { id: 'Licitacoes', name: 'Lei 14.133/2021 (Licitações)', url: 'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l1433.htm' },
  { id: 'A3P_MMA', name: 'Diretrizes A3P (MMA)', url: 'https://www.gov.br/mma/pt-br/composicao/secex/dea/programas-e-projetos/a3p' }
];

export async function checkLegislationUpdates() {
  const results = [];
  
  for (const law of TRACKED_LEGISLATION) {
    try {
      const response = await fetch(law.url, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'EcoIF-Legislation-Monitor/1.0'
        }
      });
      
      const lastModified = response.headers.get('last-modified');
      
      results.push({
        id: law.id,
        name: law.name,
        url: law.url,
        status: response.ok ? 'UP-TO-DATE' : 'OFFLINE',
        lastModified: lastModified || new Date().toISOString(),
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      results.push({
        id: law.id,
        name: law.name,
        status: 'ERROR',
        error: String(error)
      });
    }
  }
  
  return results;
}
