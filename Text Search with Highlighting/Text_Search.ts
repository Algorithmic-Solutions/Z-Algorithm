class TextSearch {
  private text: string;
  private remove_punctuation: boolean;
  private searchItem: string;
  private length: number;
  private words: string;
  private highlightStyle: string;
  public readonly result: string;
  constructor(
    text: string,
    searchItem: string,
    styleText: string = "|",
    case_sensitive = true,
    remove_punctuation: boolean = false
  ) {
    this.text = text;
    this.remove_punctuation = remove_punctuation;
    this.searchItem = searchItem;
    this.words = this.cleanText();
    this.length = this.words.length;
    this.highlightStyle = styleText;
    this.result = this.highlighting();
  }
  cleanText(): string {
    let clean_text: string;
    let regexp = /[^\w\s]/;
    this.remove_punctuation
      ? (clean_text = this.text.replace(regexp, "").toLowerCase())
      : (clean_text = this.text.toLowerCase());
    return clean_text;
  }
  calculateZBox(concat: string) {
    const zValue = new Array(concat.length).fill(0);
    console.log("concat:", concat);
    for (let i = 1; i < concat.length; i++) {
      let k = 0;
      while (k < i && concat[i + k] === concat[k]) {
        k++;
      }
      zValue[i] = k;
    }
    return zValue;
  }

  searchText(): Array<number> {
    const matches: number[] = [];
    const textLength = this.text.length;
    const searchItemLength = this.searchItem.length;

    for (let i = 0; i < textLength - searchItemLength + 1; i++) {
      if (this.text.substring(i, i + searchItemLength) === this.searchItem) {
        matches.push(i);
        i += searchItemLength - 1;
      }
    }

    return matches;
  }
  highlighting(): string {
    const matches = this.searchText();
    let highlightedText = ""; // Create an empty string to build the highlighted text

    let currentPos = 0;

    for (const match of matches) {
      const startIndex = match;
      highlightedText += this.text.substring(currentPos, startIndex);
      highlightedText += this.highlightStyle;
      highlightedText += this.text
        .substring(startIndex, startIndex + this.searchItem.length)
        .toUpperCase();
      highlightedText += this.highlightStyle;

      currentPos = startIndex + this.searchItem.length;
    }

    highlightedText += this.text.substring(currentPos);

    return highlightedText;
  }
}
const a = new TextSearch(
  "The quick brown fox jumps over the lazy dog. The quick brown fox is a very clever animal.",
  "fox"
);

console.log('a:',a);
