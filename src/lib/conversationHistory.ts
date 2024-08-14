type Message = {
	role: "user" | "model";
	parts: { text: string }[];
};

class ConversationHistoryManager {
	private history: Message[];

	constructor() {
		this.history = [];
	}

	getHistory(): Message[] {
		return this.history;
	}

	addUserQuery(query: string): void {
		this.history.push({ role: "user", parts: [{ text: query }] });
	}

	addAIQuery(response: string): void {
		this.history.push({ role: "model", parts: [{ text: response }] });
	}

	clearHistory(): void {
		this.history = [];
	}
}

export const conversationManager = new ConversationHistoryManager();
