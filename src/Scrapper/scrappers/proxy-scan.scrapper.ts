import fetch from 'node-fetch';
import {Config} from '../../config';
import {IScrapper} from './scrapper.interface';

export class ProxyScanScrapper implements IScrapper {

  readonly targets = [
    'https://www.proxyscan.io/Home/FilterResult',
  ]

  async scrap() {

    const output: string[] = [];

    try {
      const formData = new URLSearchParams();

      formData.append('selectedCountry', 'DE');
      formData.append('selectedCountry', 'PL');
      formData.append('selectedCountry', 'GB');
      formData.append('ping', String(Config.TIMEOUT))
      formData.append('status', '1')
      formData.append('selectedType', 'HTTPS')
      formData.append('sortPing', 'false')
      formData.append('sortTime', 'true')
      formData.append('sortUptime', 'false')
  
      const response = await fetch(this.targets[0], {
        method: 'POST',
        headers: {
          Origin: 'https://proxyscan.io/',
          Referer: 'https://proxyscan.io/',
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0',
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: formData.toString(),
      }).then((res) => res.text());
  
      const rows = response.split('<tr>')
      for (const row of rows) {
        const IPmatches = row.match(/(<th scope="row">)(.*)(<\/th>)/);
        if (IPmatches) {
          const portMatches = row.match(/(<td>)([0-9]*)(<\/td>)/);
          if (portMatches) {
            const ip = IPmatches[2];
            const port = portMatches[2];
            output.push(`${ip}:${port}`)
          }
        }
      }  
    } catch (e) {
      console.log(e);
    }
    console.log('ProxyScanScrapper found', output.length, 'proxies');
    return output;
  }

}