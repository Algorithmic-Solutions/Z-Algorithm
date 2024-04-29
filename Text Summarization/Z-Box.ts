export class Z_Box {
  private readonly textLength: number;
  public readonly zValues: number[];
  public readonly text: string;
  constructor(text: string) {
    this.text = text;
    this.textLength = text.length;
    this.zValues = new Array(this.textLength).fill(0);
    this.calculateZValues();
  }

  private calculateZValues(): void {
    let l = 0;
    let r = 0;

    for (let i = 1; i < this.textLength; i++) {
      // If i is inside the box (defined by l and r)
      if (i <= r) {
        // Check if remaining characters inside the box can extend the current Z value
        const k = i - l;
        if (this.zValues[k] <= r - i) {
          this.zValues[i] = this.zValues[k];
        } else {
          // this.zValues[i] will be at least as much as remaining characters in the box
          this.zValues[i] = r - i + 1;
        }
      } else {
        // i is outside the box
        l = i;
        r = 0;
        // Search for the longest prefix that matches a suffix starting at i
        while (
          i + this.zValues[i] < this.textLength &&
          this.text[i + this.zValues[i]] === this.text[this.zValues[i]]
        ) {
          this.zValues[i]++;
        }
        r = i + this.zValues[i] - 1;
      }
    }
  }
}
