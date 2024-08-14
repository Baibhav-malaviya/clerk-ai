import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);

export const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: NextRequest) {
	try {
		const { history } = await request.json();
		const chat = model.startChat({
			history,
		});

		let result = await chat.sendMessage(
			history[history.length - 1].parts[0].text
		);
		const text = await result.response.text();
		return NextResponse.json(
			{ success: true, message: "Successfully responded", text },
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: "Error in chat api route" },
			{ status: 500 }
		);
	}
}
