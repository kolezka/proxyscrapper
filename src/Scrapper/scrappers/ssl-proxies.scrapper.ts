import fetch from 'node-fetch';
import {IScrapper} from './scrapper.interface';

const tableRowRegex = /(<tr.*?>)(.*?)(<\/tr>)/g
const columnRegex = /(<td>)(.*?)(<\/td>)/g;
const ipRegex = /((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;
const portRegex = /(6553[0-5]|655[0-2][0-9]|65[0-4][0-9][0-9]|6[0-4][0-9][0-9][0-9][0-9]|[1-5](\d){4}|[1-9](\d){0,3})/;
const countries = /(United Kingdom)|(Germany)|(Poland)/g;

export class SslProxiesScrapper implements IScrapper {
  
  readonly targets = [
    'https://www.sslproxies.org/'
  ]

  async scrap() {
    const output: string[] = [];
    try {
      const txt = await fetch(this.targets[0]).then((res) => res.text());
      const rows = txt.match(tableRowRegex)
      if (rows) {
        for (const row of rows) {
          if (row.match(countries)) {
            const colMatches = row.match(columnRegex);
            if (colMatches) {
              const [ipDirty, portDirty] = colMatches;
              const ipMatches = ipDirty.match(ipRegex);
              const portMatches = portDirty.match(portRegex);
              if (ipMatches && portMatches) {
                const [ip, port] = [
                  ipMatches[0],
                  portMatches[0]
                ];
                output.push(`${ip}:${port}`)
              }
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
    console.log('SslProxiesScrapper found', output.length, 'proxies');
    return output;
  }
}

