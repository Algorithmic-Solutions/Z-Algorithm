import { FrequentPhrases } from "./Frequent-Phrase";
import { GenerateSummary } from "./GenerateSummary";
import { Preprocess } from "./Preprocess-text";
import { RankPhrases } from "./Rank-Phrases";
import { Z_Box } from "./Z-Box";

// Example text
const text =
  "The quick brown fox jumps over the lazy dog. The quick brown fox is a very clever animal.";

// Summarization function
function summarizeText(text: string): string {
  // Preprocessing (optional)
  const preprocessedText = new Preprocess(text).text;
    
  // Z-Box calculation
  const zBox = new Z_Box(preprocessedText);

  // Frequent phrase identification (adjust threshold as needed)
  const frequentPhrases = new FrequentPhrases(
    preprocessedText,
    zBox.zValues,
    3
  );
  console.log('frequentPhrases:',frequentPhrases);
  
  // Ranked phrases (optional)
  const rankedPhrases = new RankPhrases(frequentPhrases.phrases, zBox.zValues);
  // Summary generation (select top 2 phrases)
  let summary = new GenerateSummary(rankedPhrases.phrases, 2).summary;

  return summary;
}

// Call the function and print the summary
const generatedSummary = summarizeText(text);
console.log("Summary:", generatedSummary);
