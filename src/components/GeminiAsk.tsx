"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MarkdownRenderer from "./MarkdownRenderer";
import InputArea from "./InputArea"; // Import the new ChatInput component

export default function GeminiAsk() {
	const [messages, setMessages] = useState<{ role: string; content: string }[]>(
		[]
	);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const sendMessage = async () => {
		if (!input.trim()) return;

		setIsLoading(true);
		setMessages((prev) => [...prev, { role: "user", content: input }]);
		setInput("");

		try {
			const response = await fetch(
				`/api/ask?question=${encodeURIComponent(input)}`
			);
			const data = await response.json();
			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: data.text },
			]);
		} catch (error) {
			console.error("Error:", error);
			setMessages((prev) => [
				...prev,
				{ role: "assistant", content: "Sorry, an error occurred." },
			]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<Card>
				<CardHeader>
					<CardTitle>Gemini AI Chat</CardTitle>
				</CardHeader>
				<CardContent className=" overflow-x-scroll">
					<ScrollArea className="h-[400px] mb-4 p-4 border rounded-md">
						{messages.map((message, index) => (
							<div
								key={index}
								className={`mb-4 ${
									message.role === "user" ? "text-right" : "text-left"
								}`}
							>
								<div
									className={`inline-block p-3 rounded-lg ${
										message.role === "user"
											? "bg-blue-500 text-white"
											: "bg-gray-200 text-black"
									}`}
								>
									{message.role === "user" ? (
										<p>{message.content}</p>
									) : (
										<MarkdownRenderer content={message.content} />
									)}
								</div>
							</div>
						))}
					</ScrollArea>
					<InputArea
						input={input}
						setInput={setInput}
						isLoading={isLoading}
						sendMessage={sendMessage}
					/>
				</CardContent>
			</Card>
		</div>
	);
}
