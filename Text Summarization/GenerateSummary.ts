export class GenerateSummary {
  summary: string = "";
  constructor(phrase: any[], top_n: number) {
    for (let i = 0; i < Math.min(top_n, phrase.length); i++) {
      this.summary += phrase[i] + ". ";
    }
  }
}
