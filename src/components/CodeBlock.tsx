import { useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

const CodeBlock = ({ node, inline, className, children, ...props }: any) => {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	}, [children]);

	if (inline) {
		return (
			<code className={`bg-gray-200 rounded px-2 py-1 ${className}`} {...props}>
				{children}
			</code>
		);
	}

	return (
		<div className="relative group">
			<pre
				className={`bg-gray-800 text-white rounded p-4 mb-4 overflow-x-auto ${className}`}
				{...props}
			>
				<code>{children}</code>
			</pre>
			<Button
				variant="outline"
				size="icon"
				className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-px"
				onClick={handleCopy}
				aria-label={isCopied ? "Copied" : "Copy"}
			>
				{isCopied ? (
					<Check className="h-4 w-4 text-green-400" />
				) : (
					<Copy className="h-4 w-4 text-gray-400" />
				)}
			</Button>
		</div>
	);
};

export default CodeBlock;
