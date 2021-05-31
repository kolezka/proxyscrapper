import dotenv from 'dotenv';
dotenv.config();

import bootstrap from './bootstrap';
import {Scrapper} from './Scrapper/Scrapper';
import {ProxyModel} from './models/proxy/proxy.model';
import {Config} from './config';
import {clearInterval} from 'timers';
// import {Worker } from 'worker_threads';
// import {IWorkerMessage, WorkerMessages } from './workers/proxyscrapper.worker';

let intervalId: any = -1;


// function startWorker() {
//   if (process.env.ENABLE_WORKER !== 'false') {
//     console.log(new Date, 'creating worker');
//     const worker = new Worker(__dirname + '/workers/proxyscrapper.worker.js');
//     worker.on('message', (e) => {
//       const onLog = (payload: IWorkerMessage<string>)  => console.log(payload.data);
//       const onError = (payload: IWorkerMessage<any>) => console.log(String(payload.data));
//       switch (e.type) {
//         case WorkerMessages.ERROR:
//           onError(e);
//           break;
//         case WorkerMessages.LOG:
//           onLog(e);
//         break;
//       }
//     });
//   }
// }

bootstrap
  .then(async () => {
    const scrapper = new Scrapper();
    const loop = async () => {
      console.log(new Date, 'scrapping proxies list');
      const proxies = await scrapper.scrap();
      console.log(proxies);
      // for await (const proxy of proxies) {
      //   const model = new ProxyModel({
      //     status: true,
      //     proxy,
      //   })
      //   try {
      //     await model.save();
      //   } catch (e) {
      //     if (e.code !== 11000) { // Duplicate code error
      //       throw e
      //     }
      //   }
      // }
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