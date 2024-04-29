export class RankPhrases {
  phrases : string[]=[]
  constructor(phrases: string[], Z: number[]) {
    // Combine phrases and their corresponding Z-values into tuples for ranking.
    const rankedPhrases = phrases.map((phrase, index) => ({ phrase, Z: Z[index] }));

    // Sort phrases by their Z-values in descending order (highest Z-value first).
    rankedPhrases.sort((a, b) => b.Z - a.Z);

    // Update the 'phrases' property with the ranked tuples.
    this.phrases = rankedPhrases.map(rankedPhrase => rankedPhrase.phrase);
  }
}
