import { Pinecone } from "@pinecone-database/pinecone";
import { generateEmbeddings } from "./generateEmbeddings";

// Ensure to replace 'YOUR_API_KEY' with your actual Pinecone API key.
const pc = new Pinecone({
	apiKey: process.env.PINECONE_API_KEY!,
});

const index = pc.index("clerk-ai");

export async function indexText(
	chunk: string,
	embedding: number[]
): Promise<void> {
	const vector = {
		id: `chunk-${Date.now()}`, // Unique ID for each chunk
		values: embedding,
		metadata: { text: chunk },
	};

	await index.namespace("ns1").upsert([vector]);
}

export async function queryIndex(
	query: string,
	namespace?: string
): Promise<string[]> {
	// Generate embeddings for the user query
	const queryEmbedding = await generateEmbeddings(query);

	// Query Pinecone index with optional namespace and filter
	const results = await index.namespace(namespace || "ns1").query({
		topK: 3, // Number of top results to retrieve
		vector: queryEmbedding,
		includeValues: false, // Adjust based on your needs
		includeMetadata: true, // Include metadata to get original text
	});

	// Extract and return the text from the results
	return results.matches.map((match: any) => match.metadata.text);
}
