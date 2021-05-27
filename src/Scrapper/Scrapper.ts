import createHttpsProxyAgent from 'https-proxy-agent';
import fetch from 'node-fetch';
import {SslProxiesScrapper} from './scrappers/ssl-proxies.scrapper';
import {ProxyScrapeScrapper} from './scrappers/proxy-scrape.scrapper';
import {ProxyScanScrapper} from './scrappers/proxy-scan.scrapper';

export class Scrapper {

  scrappers = [
    new ProxyScrapeScrapper(),
    new ProxyScanScrapper(),
    new SslProxiesScrapper(),
  ]

  async scrap() {
    const scrappersResponse = await Promise.all(this.scrappers.map((scrapper) => scrapper.scrap()));
    return scrappersResponse.flat();
  }

  static async checkProxy(ip: string) {
    try {
      const abortController = new AbortController();
      const agent = createHttpsProxyAgent(ip);
      const timeoutId = setTimeout(
        () => {
          abortController.abort();
        },
        10000
      )
      await fetch('https://raqz.pl', {
        agent,
        timeout: 100,
        signal: abortController.signal,
      });
      clearTimeout(timeoutId);
      return true;
    } catch (e) {
      return false;
    }
  }

}