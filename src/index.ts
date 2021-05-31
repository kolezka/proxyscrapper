import dotenv from 'dotenv';
dotenv.config();

import bootstrap from './bootstrap';
import {Scrapper} from './Scrapper/Scrapper';
import {ProxyModel} from './models/proxy/proxy.model';
import {Config} from './config';
import {clearInterval} from 'timers';

let intervalId: any = -1;

bootstrap
  .then(async () => {
    const scrapper = new Scrapper();
    const loop = async () => {
      console.log(new Date, 'scrapping proxies list');
      const proxies = await scrapper.scrap();
      for await (const proxy of proxies) {
        const model = new ProxyModel({
          status: true,
          proxy,
        })
        try {
          await model.save();
        } catch (e) {
          if (e.code !== 11000) { // Duplicate code error
            throw e
          }
        }
      }
      console.log(new Date, 'finished scrapping proxies list');
    }
    intervalId = setInterval(loop, Config.INTERVAL);
    loop();
    // startWorker();
  })
  .catch((e) => {
    clearInterval(intervalId);
    console.log(e);
    process.exit(1);
  });