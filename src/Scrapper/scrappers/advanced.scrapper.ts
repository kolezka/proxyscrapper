import fetch from 'node-fetch';
import cheerio from 'cheerio';
import {Scrapper} from './abstract.scrapper';

export class AdvancedScrapper extends Scrapper {

  readonly targets = [
    'https://advanced.name/freeproxy?country=PL',
    'https://advanced.name/freeproxy?country=GB',
    'https://advanced.name/freeproxy?country=DE',
  ]

  async scrap() {

    for await (const target of this.targets) {
      const txt = await fetch(target).then((res) => res.text());
      const $ = cheerio.load(txt);

      console.log($.html());



    }

    return [];
  }

}
