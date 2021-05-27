import {IScrapper} from './scrapper.interface';

export class FreeProxyScrapper implements IScrapper {
  readonly targets = [
    'http://free-proxy.cz/en/proxylist/country/PL/https/ping/all',
    'http://free-proxy.cz/en/proxylist/country/DE/https/ping/all',
    'http://free-proxy.cz/en/proxylist/country/GB/https/ping/all',
  ]

  async scrap() {
    // TODO
    return Promise.resolve([]);
  }

}
