export class FrequentPhrases {
  // An array to store the identified frequent phrases.
  phrases: string[] = [];

  constructor(text: string, Z: number[], threshold: number) {
    // Iterate through each character index (i) in the text.
    for (let i = 0; i < text.length; i++) {
      if (Z[i] >= threshold) {
        let phrase = text.slice(i, i + Z[i]);
        if (!phrase.endsWith('.')) {
          let end = i + Z[i];
          while (end < text.length && text[end] !== '.') {
            end++;
          }
          phrase = text.slice(i, end);
        }
        this.phrases.push(phrase);
      }
    }
  }
}
