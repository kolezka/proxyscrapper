import nodeFetch from 'node-fetch';
import fetchCookie from 'fetch-cookie';
import {IScrapper} from './scrapper.interface';

const fetch = fetchCookie(nodeFetch);

const ipRegex = /(<td data-ip="(.*)">)(<\/td>)/;
const portRegex = /(<td data-port="(.*)">)(<\/td>)/;
const rowRegex = /(<tr>)(.*?)(<\/tr>)/sg;

export class AdvancedScrapper implements IScrapper {

  readonly targets = [
    'https://advanced.name/freeproxy?country=PL&type=https',
    'https://advanced.name/freeproxy?country=GB&type=https',
    'https://advanced.name/freeproxy?country=DE&type=https',
  ]

  async scrap() {
    // TODO
    const output: string[] = [];

    try {
      
      for await (const target of this.targets) {
        const txt = await fetch(target, {
          headers: {
            'Host': 'advanced.name',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:88.0) Gecko/20100101 Firefox/88.0',
            'Cookie': 'DDOSEXPERT_COM_V6=57891ae4e054f26c02104536a89edc0e; XSRF-TOKEN=eyJpdiI6InYyY1BMR0RmeVNDc3JwOHJoQ2NtUHc9PSIsInZhbHVlIjoiMjA3UmYyR1dYSEJYOW9LaDJ1cXRpcHh2Q3BzMW5wYm9ZMDZJemFOZm94TElhSjBYUnJHSDhTTVBZQjlhTE5IU1hWb0psV1ZFTnVLRnBUWVM3a2dMeEE9PSIsIm1hYyI6IjE2NTU5YjA1ZjNjZjdhZGEyNTZlYzcxYmM0MzlkNGU2MmM2NDUwZGFmYWUyYjcwNTI3N2Y1MmEwODRlNDhmOTgifQ%3D%3D; laravel_session=eyJpdiI6IjBidnNPYUtNc294d1VUdTg4TzNCdVE9PSIsInZhbHVlIjoiakRPcFFzZ2NIREt5aW5mU0ZKUGhCb1IzOFlwWE52bkE5UUdlYlwvb1AyTTZEdGFcL09hZ0dPWlJBYitpdWU3VzdTWVpncGw2ekQ2MDRDSHA2M2RjdTdwdz09IiwibWFjIjoiNTgxNTNmOWM1ZTllNDU2N2M5NGIyMGNlZThjMDI5MjU2ZDA0NTBiMTYwYzE5MWJhMjQ0NjRjMDdjYzgzZmI4MyJ9; supportOnlineTalkID=uFnWoFGnpcQvan12rnZM7bNhT5Bhq2Ml'
          }
        }).then((res) => res.text());
        
        const rows = txt.match(rowRegex);
        if (rows) {
          for (const row of rows) {
            const ipMatch = row.match(ipRegex);
            const portMatch = row.match(portRegex);
            if (ipMatch && portMatch) {
              const [ipDirty, portDirty] = [ipMatch[2], portMatch[2]]
              const ip = Buffer.from(ipDirty, 'base64').toString();
              const port = Buffer.from(portDirty, 'base64').toString();
              output.push(`${ip}:${port}`);
            }
          } 
        }

      }

    } catch (e) {
      console.log(e);
    }
    return output;
  }

}
