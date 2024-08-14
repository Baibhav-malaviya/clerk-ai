import { NextRequest, NextResponse } from "next/server";
import { queryIndex } from "@/lib/pineconeClient";
import { model } from "../chat/route";

import { conversationManager } from "@/lib/conversationHistory";

export async function POST(request: NextRequest): Promise<NextResponse> {
	try {
		const { query }: { query: string } = await request.json();

		if (!query) {
			return NextResponse.json(
				{ message: "Query is required", success: false },
				{ status: 400 }
			);
		}

		conversationManager.clearHistory();

		// Retrieve the conversation history
		const history = conversationManager.getHistory();

		//  adding query to the history class
		conversationManager.addUserQuery(query);

		// Query the Pinecone index with optional namespace and filter
		const context = await queryIndex(query, "ns1");

		const prompt = `
			Based on the following context and query, provide a relevant and concise response. If the query is not related to the context, handle the query appropriately by either providing a general response or indicating that the context does not match the query. And also act like you are clerk-ai chatbot/assistance.

				Context:
				"""
				${context}
				"""

				Query:
				"""
				${query}
				"""

				Response:
		`;

		// Start a new chat with the existing history
		const chat = model.startChat({ history });

		// Send the message and get the result
		const { response } = await chat.sendMessage(prompt);

		const text = await response.text(); // use await to get the text

		// Update the history with the AI response
		conversationManager.addAIQuery(text);

		const updatedHistory = conversationManager.getHistory();

		return NextResponse.json(
			{ message: "Query successful", success: true, text },
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("Error in query route:", error);
		return NextResponse.json(
			{ message: "Error in query route", success: false, error: error.message },
			{ status: 500 }
		);
	}
}
