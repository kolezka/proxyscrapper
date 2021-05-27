import fetch from 'node-fetch';
import {Scrapper} from './abstract.scrapper';

export class ProxyScrapeScrapper extends Scrapper {

  targets: string[] = [
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=pl&ssl=yes&anonymity=all&simplified=true',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=de&ssl=yes&anonymity=all&simplified=true',
    'https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=gb&ssl=yes&anonymity=all&simplified=true',
  ];

  async scrap() {
    const output: string[] = [];
    for await (const target of this.targets) {
      const text = await fetch(target).then((res) => res.text());
      const list = text.split('\r\n');
      list.pop();
      output.push(...list);
    }
    return output;
  }

}
