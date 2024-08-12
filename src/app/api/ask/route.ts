import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function GET(request: NextRequest) {
	try {
		// collecting data
		const url = new URL(request.url);
		const question = url.searchParams.get("question");
		const result = await model.generateContent(question!);
		const response = await result.response;
		const text = response.text();
		return NextResponse.json(
			{ message: "Question answered successfully", success: true, text },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Error in ask gemini api",
				success: false,
				error: error,
			},
			{ status: 500 }
		);
	}
}
