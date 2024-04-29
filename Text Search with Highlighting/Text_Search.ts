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
  calculateZBox(concatenatedString:string) {
    const zValue = new Array(concatenatedString.length).fill(0);
    let k = 0;
        for (let i = 1; i < this.length; i++) {
        k = 0;
        while (k < this.length - i && concatenatedString[i + k] === concatenatedString[k]) {
            k ++;
        }
        zValue[i] = k;
    }
    console.log(zValue);
    return zValue;
}
  searchText(): Array<number> {
    const matches: number[] = [];
    const concatenatedString = this.searchItem + this.words;
    const zValues = this.calculateZBox(concatenatedString);
    const searchItemLength = this.searchItem.length;
    for (let i = 0; i < zValues.length ; i++) {
      if (zValues[i] >= searchItemLength) {
        matches.push(i);
      }
    }
    return matches;
  }
  highlighting(): string {
    const matches = this.searchText();
    console.log('matches:',matches);
    let highlightedText = this.text;
    for (let i of matches) {
      const matchLength = this.searchItem.length;
      const replacement = highlightedText.slice(i, i + matchLength) 
        console.log('replacement:',replacement);
      highlightedText =
        highlightedText.slice(0, i)+
        "|"+
        replacement.toUpperCase() +
        "|"+
        highlightedText.slice(i + matchLength);
    }
    return highlightedText;
  }
}
new TextSearch(
  "The quick brown fox jumps over the lazy dog. The quick brown fox is a very clever animal.",
  "fox"
);
