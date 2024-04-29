export class Z_Box {
    // The length of the input text.
    private textLength: number;
  
    // An array to store the Z-values for each index in the text.
    private zValues: number[];
  
    constructor(text: string) {
      this.textLength = text.length;
  
      // Initialize the Z-values array with zeros (placeholders before calculation).
      this.zValues = new Array(this.textLength).fill(0);
  
      // Calculate the Z-values for each index (i) in the text.
      for (let i = 1; i < this.textLength; i++) {
        let K = 0; // Variable to store the length of the longest prefix-suffix match starting at index i.
  
        // Inner loop to find the longest prefix-suffix match starting at i.
        for (let j = 1; j < i + 1; j++) {
          // Calculate the minimum of two values:
          // - Z-value of the character at index i - j (previous Z-values).
          // - Maximum possible length of a prefix-suffix match starting at i (considering remaining characters).
          K = Math.max(Math.min(this.zValues[i - j], this.textLength - i - 1));
        }
  
        // Store the calculated Z-value for index i.
        this.zValues[i] = K;
      }
    }
  }