import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export async function generateEmbeddings(text: string): Promise<number[]> {
	const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
	const result = await model.embedContent(text);
	return result.embedding.values;
}
