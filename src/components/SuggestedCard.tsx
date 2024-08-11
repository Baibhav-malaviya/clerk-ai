import { Card } from "@/components/ui/card"; // Adjust import according to your setup

const SuggestedCard = ({ text, onClick }: { text: string; onClick: any }) => (
	<Card
		className="cursor-pointer p-3 mb-4 bg-blue-100 hover:bg-blue-200 rounded-md text-center"
		onClick={() => onClick(text)}
	>
		<p className="text-blue-700">{text}</p>
	</Card>
);

export default SuggestedCard;
