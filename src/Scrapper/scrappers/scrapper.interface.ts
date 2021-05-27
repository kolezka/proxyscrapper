export interface IScrapper {
  readonly targets: string[];
  scrap(): Promise<string[]>;
}
