class TextSummarization {
  text: string;
  words: string[];
  stopwords: string[] = ["the", "a", "an"];
  constructor(text: string) {
    this.text = text.toLowerCase().replace(/[^\w]/, " ");
    this.text = this.Preprocess();
  }
  Preprocess(): string {
    this.words = this.text
      .split(/\s+/)
      .filter((word) => !this.stopwords.includes(word));
    return (this.text = this.words.join(" "));
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
  RankPhrases(){
    
  }
}