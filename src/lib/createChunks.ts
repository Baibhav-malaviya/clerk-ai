import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

/**
 * Formats the input text for storage.
 *
 * @param text - The raw text to be formatted.
 * @returns The cleaned and formatted text.
 */
function formatTextForStorage(text: string): string {
	// Remove excessive whitespace
	let formattedText = text.replace(/\s+/g, " ").trim();

	// Replace new lines with spaces (optional, depending on your use case)
	formattedText = formattedText.replace(/\n+/g, " ");

	// Remove any unwanted characters or sequences (e.g., non-printable characters)
	formattedText = formattedText.replace(/[^\x20-\x7E]/g, "");

	// Optionally, handle punctuation or special character normalization if needed
	// Example: Ensure single space after punctuation
	formattedText = formattedText.replace(/([.,!?])\s*/g, "$1 ");

	return formattedText;
}

/**
 * Splits the formatted text into chunks for processing.
 *
 * @param text - The text to be split.
 * @returns An array of text chunks.
 */
export async function splitText(text: string): Promise<string[]> {
	// Initialize the text splitter with desired chunk size and overlap
	const splitter = new RecursiveCharacterTextSplitter({
		chunkSize: 800, // Adjust chunk size as needed
		chunkOverlap: 100, // Adjust overlap size if necessary
	});

	// Format the text before splitting
	const formattedText = formatTextForStorage(text);
	console.log("Formatted text:", formattedText);

	// Split the formatted text into chunks
	const chunks = await splitter.splitText(formattedText);
	return chunks;
}
