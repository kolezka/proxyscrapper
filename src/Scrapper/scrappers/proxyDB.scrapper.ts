import { IScrapper } from "./scrapper.interface";
import fetch from 'node-fetch';

const ipPortRegex = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):\d{1,5}\b/g

export class ProxyDB implements IScrapper {

  targets: string[] = [
    'http://proxydb.net/?protocol=https&country=PL',
  ]

  async scrap(): Promise<string[]> {
    const output: string[] = [];
    try {
      // TODO: use puppeter to collect data from other pages
      const txt = await fetch(this.targets[0], {
        headers: {
          'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0',
        }
      }).then((res) => res.text());
      const proxies = txt.match(ipPortRegex);
      if (proxies) {
        output.push(...proxies);
      }
    } catch (e) {
      console.log(e);
    }
    console.log('ProxyDB found', output.length, 'proxies');
    return output;
  }

}
