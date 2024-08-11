"use client";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import MarkdownRenderer from "./MarkdownRenderer";
import SuggestedCard from "./SuggestedCard";
import InputArea from "./InputArea"; // Import the ChatInput component

export default function GeminiChat() {
	const [input, setInput] = useState("");
	const [history, setHistory] = useState([
		{ role: "user", parts: [{ text: "Hello" }] },
		{
			role: "model",
			parts: [{ text: "Great to meet you. What would you like to know?" }],
		},
	]);
	const [isLoading, setIsLoading] = useState(false);

	const sendMessage = async () => {
		if (!input.trim() || isLoading) return;

		setIsLoading(true);
		const updatedHistory = [
			...history,
			{ role: "user", parts: [{ text: input }] },
		];
		setHistory(updatedHistory);
		setInput("");

		try {
			const res = await axios.post("/api/chat", { history: updatedHistory });

			if (res.data.success) {
				setHistory((prevHistory) => [
					...prevHistory,
					{ role: "model", parts: [{ text: res.data.text }] },
				]);
			} else {
				console.error("Error:", res.data.message);
			}
		} catch (error: any) {
			console.error("Error:", error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSuggestedTextClick = (text: string) => {
		setInput(text);
		sendMessage();
	};

	const startNewChat = () => {
		setHistory([]);
		setInput(""); // Clear input field when starting a new chat
	};

	return (
		<div className="container mx-auto p-4">
			<Card>
				<CardHeader className="flex flex-row justify-between items-center">
					<CardTitle>Gemini AI Chat</CardTitle>
					<Button onClick={startNewChat}>New Chat</Button>
				</CardHeader>
				<CardContent>
					<ScrollArea className="h-[400px] mb-4 p-4 border rounded-md">
						{history.length === 0 ? (
							<div className="text-center">
								<SuggestedCard
									text="What are the latest trends in AI?"
									onClick={handleSuggestedTextClick}
								/>
								<SuggestedCard
									text="Explain the benefits of exercise."
									onClick={handleSuggestedTextClick}
								/>
							</div>
						) : (
							history.map((message, index) => (
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
										<strong>
											{message.role === "user" ? "You: " : "Model: "}
										</strong>
										<MarkdownRenderer content={message.parts[0].text} />
									</div>
								</div>
							))
						)}
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
