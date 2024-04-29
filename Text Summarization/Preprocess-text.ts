export class Preprocess {
  // The original text to be preprocessed.
  text: string;

  // An array of words after preprocessing.
  words: string[];

  // Regular expression to match non-alphanumeric characters.
  regexp = /[^\w]/;

  // A list of stop words to be removed during preprocessing.
  stopwords: Array<string> = ["the", "a", "an"];

  constructor(text: string) {
    // Step 1: Convert text to lowercase and replace non-alphanumeric characters with spaces.
    this.text = text.toLowerCase().replace(this.regexp, " ");

    // Step 2: Split the preprocessed text into individual words, handling multiple spaces and Step 3: Remove stop words from the list of words.
    this.words = this.text.split(/\s+/).filter(word => !this.stopwords.includes(word));

    // Step 4: Join the filtered words back into a single string.
    this.text = this.words.join(" ");
  }
}