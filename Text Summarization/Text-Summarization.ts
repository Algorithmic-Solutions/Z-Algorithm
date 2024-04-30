class TextSummarization {
  private text: string;
  public summary: string;
  constructor(text: string) {
    this.text = text.toLowerCase().replace(/[^\w]/, " ");
    this.text = this.Preprocess();
    this.summary = this.generatedSummary();
  }
  Preprocess(): string {
    let stopwords: string[] = ["the", "a", "an"];
    let words: string[] = this.text
      .split(/\s+/)
      .filter((word) => !stopwords.includes(word));
    return (this.text = words.join(" "));
  }
  zBox(): number[] {
    const n = this.text.length;
    const zValues = new Array(n).fill(0);
    let l = 0;
    let r = 0;

    for (let i = 1; i < n; i++) {
      // If i is inside the box (defined by l and r)
      if (i <= r) {
        // Check if remaining characters inside the box can extend the current Z value
        const k = i - l;
        if (zValues[k] <= r - i) {
          zValues[i] = zValues[k];
        } else {
          // zValues[i] will be at least as much as remaining characters in the box
          zValues[i] = r - i + 1;
        }
      } else {
        // i is outside the box
        l = i;
        r = 0;
        // Search for the longest prefix that matches a suffix starting at i
        while (
          i + zValues[i] < n &&
          this.text[i + zValues[i]] === this.text[zValues[i]]
        ) {
          zValues[i]++;
        }
        r = i + zValues[i] - 1;
      }
    }
    return zValues;
  }
  FrequentPhrases(): string[] {
    const phrases: string[] = [];
    const zValues = this.zBox();
    for (let i = 0; i < this.text.length; i++) {
      if (zValues[i] >= 3) {
        let phrase = this.text.slice(i, i + zValues[i]);
        if (!phrase.endsWith(".")) {
          let end = i + zValues[i];
          while (end < this.text.length && this.text[end] !== ".") {
            end++;
          }
          phrase = this.text.slice(i, end);
        }
        phrases.push(phrase);
      }
    }
    return phrases;
  }
  RankPhrases() {
    const phrases: string[] = this.FrequentPhrases();
    const z = this.zBox();
    const rankedPhrases = phrases.map((p, i) => ({ p, Z: z[i] }));
    rankedPhrases.sort((a, b) => b.Z - a.Z);
    let phrase: string[] = rankedPhrases.map(
      (rankedPhrases) => rankedPhrases.p
    );
    return phrase;
  }
  generatedSummary(): string {
    let summary: string = "";
    const phrase = this.RankPhrases();
    for (let i = 0; i < Math.min(2, phrase.length); i++) {
      if (phrase[i].length > 1) {
        summary += phrase[i] + ". ";
      }
    }
    return summary;
  }
}
const text =
  "The quick brown fox jumps over the lazy dog. The quick brown fox is a very clever animal.";
const generatedSummary = new TextSummarization(text);
console.log("Summary:", generatedSummary.summary);
