import fetch from 'node-fetch';
import {Config} from '../../config';
import {IScrapper} from './scrapper.interface';

export class ProxyScrapeScrapper implements IScrapper {

  targets: string[] = [
    `https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=${Config.TIMEOUT}&country=pl&ssl=yes&anonymity=all&simplified=true`,
    `https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=${Config.TIMEOUT}&country=de&ssl=yes&anonymity=all&simplified=true`,
    `https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=${Config.TIMEOUT}&country=gb&ssl=yes&anonymity=all&simplified=true`,
  ];

  async scrap() {
    const output: string[] = [];
    for await (const target of this.targets) {
      try {
        const text = await fetch(target).then((res) => res.text());
        const list = text.split('\r\n');
        list.pop();
        output.push(...list);
      } catch (e) {
        console.log(e);
      }
    }
    console.log('ProxyScrapeScrapper found', output.length, 'proxies');
    return output;
  }

}
