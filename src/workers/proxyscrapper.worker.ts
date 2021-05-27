import {
  Worker,
  isMainThread,
  parentPort
} from 'worker_threads';
import createHttpProxyAgent from 'http-proxy-agent';
import fetch from 'node-fetch';
import {Config} from '../config'
import db from '../database';
import { IProxyBaseDocument, ProxyModel } from '../models/proxy/proxy.model';

export enum WorkerMessages {
  LOG = 'LOG',
  ERROR = 'ERROR',
}

export interface IWorkerMessage<T = any> {
  type: WorkerMessages,
  data: T,
}

if (isMainThread) {
  new Worker(__filename);
} else {
  db.then(() => main());
}


const log = (str: string) => {
  parentPort?.postMessage({
    type: WorkerMessages.LOG,
    data: str,
  });
}

const error = (str: string) => {
  parentPort?.postMessage({
    type: WorkerMessages.ERROR,
    data: str,
  });
}

const chunk = (array: any[], size: number) =>
  array.reduce((acc, _, i) => {
    if (i % size === 0) acc.push(array.slice(i, i + size))
    return acc
  }, [])

async function checkProxyConnection(proxy: string) {
  try {
    const agent = createHttpProxyAgent(proxy);
    const abortController = new AbortController();
    const timeoutId = setTimeout(
      () => {
        abortController.abort();
      },
      Config.TIMEOUT * 2,
    )
    await fetch('https://raqz.pl', {
      agent,
      signal: abortController.signal,
    });
    clearTimeout(timeoutId);
    return true;
  } catch (e) {
    error(e.toString());
    return false;
  }
}

async function checkProxy(proxy: IProxyBaseDocument) {
  const { proxy: proxyString } = proxy.toObject();
  log(`Checking ${proxyString}`);
  const isProxyWorking = await checkProxyConnection(proxyString);
  if (!isProxyWorking) {
    await proxy.delete(); 
  } else {
    proxy.updated_at = new Date;
    proxy.save();
  }
  return Promise.resolve();
}

async function main() {
  const proxies = await ProxyModel.find({});
  const chunks: IProxyBaseDocument[][] = chunk(proxies, 3);
  for await (const chunk of chunks) {
    await Promise.all(chunk.map(checkProxy));
  }
}