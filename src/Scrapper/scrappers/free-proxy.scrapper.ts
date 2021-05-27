import cheerio from 'cheerio';
import fetch from 'node-fetch';
import {Scrapper} from './abstract.scrapper';

export class FreeProxyScrapper extends Scrapper {
  readonly targets = [
    'http://free-proxy.cz/en/proxylist/country/PL/https/ping/all',
    'http://free-proxy.cz/en/proxylist/country/DE/https/ping/all',
    'http://free-proxy.cz/en/proxylist/country/GB/https/ping/all',
  ]

  async scrap() {

    console.log('Scrap');

    for await (const url of this.targets) {
      console.log(url);
      const txt = await fetch(url).then((res) => res.text());
      console.log(txt);
      const $ = cheerio.load(txt);
      console.log($.html());
    }

    return Promise.resolve([]);
  }

}
