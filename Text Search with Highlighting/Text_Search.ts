class TextSearch {
  private text: string;
  private remove_punctuation: boolean;
  private searchItem: string;
  private length: number;
  private words: string;
  private highlightStyle: string;
  constructor(
    text: string,
    searchItem: string,
    styleText: string = " ",
    case_sensitive = true,
    remove_punctuation: boolean = false
  ) {
    this.text = text;
    this.remove_punctuation = remove_punctuation;
    this.searchItem = searchItem;
    this.words = this.cleanText();
    this.length = this.words.length;
    this.highlightStyle = styleText;
    const highlightedText = this.highlighting();
    console.log("A:", highlightedText);
  }
  cleanText(): string {
    let clean_text: string;
    let regexp = /[^\w\s]/;
    this.remove_punctuation
      ? (clean_text = this.text.replace(regexp, "  ").toLowerCase())
      : (clean_text = this.text.toLowerCase());
    return clean_text;
  }
  calculateZBox(concat: string) {
    const zValue = new Array(concat.length).fill(0);
    let left = 0;
    let right = 1;
    while (right < concat.length) {
      if (concat[right] === concat[left]) {
        zValue[right] = right - left + 1;
        right++;
        left++;
      } else {
        if (left > 0) {
          left = zValue[left - 1];
        } else {
          right++;
        }
      }
    }
    // console.log(zValue);
    return zValue;
  }
  searchText(): Array<number> {
    const matches: number[] = [];
    const concat = this.searchItem + this.words;
    const zValues = this.calculateZBox(concat);
    const searchItemLength = this.searchItem.length;
    for (let i = 0; i < zValues.length; i++) {
      if (zValues[i] >= searchItemLength) {
        matches.push(i);
      }
    }
    return matches;
  }
  highlighting(): string {
    const matches = this.searchText();
    console.log("matches:", matches);
    let highlightedText = this.text;
    for (let i of matches) {
      const matchLength = this.searchItem.length;
      const replacement =
        this.highlightStyle +
        highlightedText.slice(i, i + matchLength) +
        this.highlightStyle;
      console.log("replacement:", replacement);
      highlightedText =
        highlightedText.slice(0, i) +
        "|" +
        replacement.toUpperCase() +
        "|" +
        highlightedText.slice(i + matchLength);
    }
    return highlightedText;
  }
}
const a = new TextSearch(
  "The quick brown fox jumps over the lazy dog. The quick brown fox is a very clever animal.",
  "fox"
);
