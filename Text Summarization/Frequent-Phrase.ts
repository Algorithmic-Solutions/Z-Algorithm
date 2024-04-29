export class FrequentPhrases {
  // An array to store the identified frequent phrases.
  phrases: string[] = [];

  constructor(text: string, Z: number[], threshold: number) {
    // Iterate through each character index (i) in the text.
    for (let i = 0; i < text.length; i++) {
      // Check if the Z-value at index i meets the minimum threshold.
      if (Z[i] >= threshold) {
        // Extract the phrase starting at i with length Z[i] using slicing.
        const phrase = text.slice(i, i + Z[i]);
        // Push the extracted phrase to the phrases array.
        this.phrases.push(phrase);
      }
    }
  }
}
