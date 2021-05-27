import {
  Worker,
  isMainThread,
  parentPort
} from 'worker_threads';

import { ProxyModel } from '../models/proxy/proxy.model';

if (isMainThread) {
  new Worker(__filename);
} else {
  console.log('Hello world');

  console.log(ProxyModel);

  parentPort?.postMessage('Hello World :)');
}
