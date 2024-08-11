import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import CodeBlock from "./CodeBlock"; // Ensure you import your custom CodeBlock component

interface MarkdownRendererProps {
	content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
	const isMarkdown = content.includes("\n") || content.includes("```");

	return (
		<ReactMarkdown
			remarkPlugins={[remarkGfm]}
			components={{
				code: CodeBlock,
				h1: ({ node, ...props }) => (
					<h1
						className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 mb-3 border-b-2 border-gray-300 pb-2 break-words"
						{...props}
					/>
				),
				h2: ({ node, ...props }) => (
					<h2
						className="text-xl sm:text-2xl md:text-3xl font-semibold mt-3 mb-2 border-b border-gray-200 pb-1 break-words"
						{...props}
					/>
				),
				h3: ({ node, ...props }) => (
					<h3
						className="text-lg sm:text-xl font-medium mt-2 mb-1 break-words"
						{...props}
					/>
				),
				p: ({ node, ...props }) => (
					<p className="mb-3 text-gray-700 break-words" {...props} />
				),
				ul: ({ node, ...props }) => (
					<ul
						className="list-disc ml-5 mb-3 text-gray-700 break-words"
						{...props}
					/>
				),
				ol: ({ node, ...props }) => (
					<ol
						className="list-decimal ml-5 mb-3 text-gray-700 break-words"
						{...props}
					/>
				),
				li: ({ node, ...props }) => (
					<li className="mb-1 break-words" {...props} />
				),
				a: ({ node, ...props }) => (
					<a className="text-blue-500 hover:underline break-words" {...props} />
				),
				img: ({ node, ...props }) => (
					<div className="relative max-w-full h-auto mb-4">
						<Image
							src={props.src as string}
							alt={props.alt as string}
							layout="fill"
							objectFit="contain"
							className="rounded-md"
						/>
					</div>
				),
			}}
		>
			{content}
		</ReactMarkdown>
	);
};

export default MarkdownRenderer;
