export class Z_Box {
  // The length of the input text.
  textLength: number;

  // An array to store the Z-values for each index in the text.
  zValues: number[];
  text: string;
  constructor(text: string) {
    this.text = text;
    this.textLength = text.length;

    // Initialize the Z-values array with zeros (placeholders before calculation).
    this.zValues = new Array(this.textLength).fill(0);
    // Calculate Z-values for remaining characters.
    this.calculateZValues();
  }
  private calculateZValues(): void {
    for (let i = 1; i < this.textLength; i++) {
      let k = Math.min(i, this.zValues[i - 1] + 1); 
  
      for (let j = 1; j < k; j++) {
        if (this.text.charAt(i - j) !== this.text.charAt(i)) {
          break; // No match found, exit inner loop.
        }
        k++;
      }
      const kPrime = Math.min(k, i); // Limit k by the current index (i) to avoid negative indices.
      this.zValues[i] = kPrime;
    }
  }
}
