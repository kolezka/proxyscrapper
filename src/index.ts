import { Scrapper } from './Scrapper/Scrapper';


async function main() {
  const scrapper = new Scrapper();
  const proxies = await scrapper.scrap();
  console.log(proxies);
}

main();