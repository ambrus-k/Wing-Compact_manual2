const fs = require('fs');
let content = fs.readFileSync('src/components/GitHubExportModal.tsx', 'utf8');

const newContent = content.replace(
  /<div className="space-y-4">\s*<h3 className="text-white font-bold text-base">Krok za krokem: Jak propojit AI Studio s GitHubem<\/h3>[\s\S]*?<\/ol>\s*<\/div>/,
  `<div className="space-y-4">
            <h3 className="text-white font-bold text-base">Aktualizovaný návod (podle tvého screenshotu):</h3>
            
            <ol className="space-y-4 list-decimal list-inside text-white/80 marker:text-white/40">
              <li className="pl-2">
                <strong className="text-white">Nové repozitáře:</strong> Jak je vidět na tvém screenshotu, okno ukazuje <strong>"A new GitHub repository will be created"</strong>. To znamená, že platforma AI Studio primárně vytváří pro každý projekt <strong>nový, čistý repozitář</strong>. Neumožňuje vybrat existující staré repozitáře ze seznamu.
              </li>
              <li className="pl-2">
                <strong className="text-white">Klikni na "Create new repository":</strong> Propojení už máš zjevně hotové (ikona GitHubu svítí). Nyní stačí kliknout na to velké šedé tlačítko <strong>"Create new repository"</strong> dole.
              </li>
              <li className="pl-2">
                <strong className="text-white">Kde to najdeš:</strong> AI Studio vytvoří na tvém GitHub profilu zcela nový repozitář (pravděpodobně s názvem tvého AI Studio projektu). Bude na něj po vytvoření odkaz.
              </li>
              <li className="pl-2">
                <strong className="text-white">Automatická synchronizace:</strong> Text "Changes from Google AI Studio will be synced to GitHub, and vice versa" znamená, že od chvíle, kdy klikneš na to tlačítko, budou se všechny naše další úpravy kódu automaticky nahrávat do tohoto nového repozitáře. Nemusíš už dělat nic dalšího!
              </li>
            </ol>
          </div>`
);

fs.writeFileSync('src/components/GitHubExportModal.tsx', newContent);
