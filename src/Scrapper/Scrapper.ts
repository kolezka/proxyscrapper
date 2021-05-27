import {SslProxiesScrapper} from './scrappers/ssl-proxies.scrapper';
import {ProxyScrapeScrapper} from './scrappers/proxy-scrape.scrapper';
import {ProxyScanScrapper} from './scrappers/proxy-scan.scrapper';

export class Scrapper {

  scrappers = [
    new ProxyScrapeScrapper(),
    new ProxyScanScrapper(),
    new SslProxiesScrapper(),
  ]

  scrap = () => Promise.all(this.scrappers.map((scrapper) => scrapper.scrap())).then((lists) => lists.flat());

}