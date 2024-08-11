import React, { FC, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface InputAreaProps {
	input: string;
	setInput: (input: string) => void;
	isLoading: boolean;
	sendMessage: () => void;
}

const InputArea: FC<InputAreaProps> = ({
	input,
	setInput,
	isLoading,
	sendMessage,
}) => {
	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	return (
		<div className="flex space-x-2">
			<Textarea
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder="Ask a question..."
				disabled={isLoading}
				className="w-full border rounded-md"
				rows={1} // Adjust the number of rows as needed
			/>
			<Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
				{isLoading ? "Sending..." : "Send"}
			</Button>
		</div>
	);
};

export default InputArea;
