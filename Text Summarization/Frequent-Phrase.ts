export class FrequentPhrases {
  // An array to store the identified frequent phrases.
  phrases: string[] = [];

  constructor(text: string, Z: number[], threshold: number) {
    // Iterate through each character index (i) in the text.
    for (let i = 0; i < text.length; i++) {
      // Check if the Z-value at index i meets the minimum threshold.
      if (Z[i] >= threshold) {
        // Extract the phrase starting at index i with length equal to Z[i] (potential frequent phrase).
        const currentPhrase = text.substring(i, i + Z[i]);
        // Add the extracted phrase to the list of frequent phrases.
        this.phrases.push(currentPhrase);
      }
    }
  }
}
