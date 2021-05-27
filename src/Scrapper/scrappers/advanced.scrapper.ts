import {IScrapper} from './scrapper.interface';

export class AdvancedScrapper implements IScrapper {

  readonly targets = [
    'https://advanced.name/freeproxy?country=PL',
    'https://advanced.name/freeproxy?country=GB',
    'https://advanced.name/freeproxy?country=DE',
  ]

  async scrap() {
    // TODO
    return [];
  }

}
