import { NextRequest, NextResponse } from "next/server";
import { queryIndex } from "@/lib/pineconeClient";
import { model } from "../ask/route";

export async function POST(request: NextRequest) {
	try {
		const { query } = await request.json();
		console.log("query: ", query);
		if (!query) {
			return NextResponse.json(
				{ message: "Query is required", success: false },
				{ status: 400 }
			);
		}

		// Query the Pinecone index with optional namespace and filter
		const results = await queryIndex(query, "ns1");

		const result = await model.generateContent(
			`Summarize the following text in a concise manner: ${results}`
		);
		const response = await result.response;
		const text = response.text();

		console.log("READABLE TEXT: ", text);

		return NextResponse.json(
			{ message: "Query successful", success: true, results },
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
