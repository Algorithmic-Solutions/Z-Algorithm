export class RankPhrases {
  constructor(phrases: any[], Z: number[]) {
    // Loop through each phrase and its corresponding Z-value.
    for (let i = 0; i < phrases.length; i++) {
      // Find the index of the first character within the current phrase.
      const charIndex = phrases[i].indexOf(phrases[i][0]);

      // Create a tuple to store the phrase and its Z-value for ranking.
      phrases[i] = (phrases[i], Z[charIndex]);
    }

    // Sort phrases by their Z-values in descending order (highest Z-value first).
    phrases.sort((a, b) => b[1] - a[1]);
  }
}
