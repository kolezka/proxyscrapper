import bootstrap from './bootstrap';
import {Scrapper} from './Scrapper/Scrapper';
import {ProxyModel} from './models/proxy/proxy.model';

bootstrap
  .then(async () => {
    const scrapper = new Scrapper();
    const proxies = await scrapper.scrap();
    for await (const proxy of proxies) {
      const model = new ProxyModel({
        status: true,
        proxy,
      })
      await model.save();
    }
  })
  .catch(() => {
    process.exit(1);
  });