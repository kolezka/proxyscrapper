// https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=10000&country=pl&ssl=yes&anonymity=all&simplified=true

export abstract class Scrapper {

  abstract readonly targets: string[];

  abstract scrap(): Promise<string[]>;

}
