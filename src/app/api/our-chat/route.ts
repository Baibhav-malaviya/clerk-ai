import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPDF } from "@/lib/pdfReader";
import { generateEmbeddings } from "@/lib/generateEmbeddings";
import { splitText } from "@/lib/createChunks";
import { indexText } from "@/lib/pineconeClient";

export async function GET(request: NextRequest) {
	try {
		// Extract text from PDF
		const text = await extractTextFromPDF();

		// Split text into chunks
		const chunks = await splitText(text);

		// Loop through chunks and index each one
		for (const chunk of chunks) {
			// getting the embeddings
			const embeddedContent = await generateEmbeddings(chunk);

			// saving to the pinecone database
			await indexText(chunk, embeddedContent);
		}

		return NextResponse.json(
			{
				message: "Successfully indexed PDF content",
				success: true,
				length: chunks.length,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("Error in our-chat api route:", error);
		return NextResponse.json(
			{
				message: "Error in our-chat api route",
				success: false,
				error: error.message,
			},
			{ status: 500 }
		);
	}
}
