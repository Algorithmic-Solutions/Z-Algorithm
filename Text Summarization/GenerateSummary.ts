export class GenerateSummary {
  summary: string = "";
  constructor(phrases: any[], top_n: number) {
    for (let i = 0; i < Math.min(top_n, phrases.length); i++) {
      
      if (phrases[i].length > 1) {
        this.summary += phrases[i] + ". ";
      }
    }
  }
}
