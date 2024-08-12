import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Clerk-AI | Advanced Query and Chat Platform",
	description:
		"A sophisticated AI-driven platform utilizing Clerk for authentication and Gemini as the language model. Provides seamless query and chat functionalities for users.",
	icons: {
		icon: `/Clerk-AI_logo_black.ico`, // Placeholder for your icon
		apple: "/Clerk-AI_logo_black.ico", // Placeholder for the apple icon
	},
	keywords: [
		"AI queries",
		"chat platform",
		"Clerk authentication",
		"Gemini LLM",
		"interactive chat",
		"AI-driven platform",
		"user authentication",
		"natural language processing",
		"query system",
	],
	openGraph: {
		title: "Seamless AI Queries and Chat | Clerk-AI Platform",
		description:
			"Experience advanced AI-driven query and chat functionalities with Clerk-AI. Secure authentication and intelligent responses powered by Clerk and Gemini.",
		type: "website",
		locale: "en_IN",
		url: "https://clerk-ai.vercel.app/",
		site_name: "Clerk-AI",
		images: [
			{
				// Placeholder for the image path
				url: "https://www.yourwebsite.com/path-to-homepage-image.jpg",
				width: 1200,
				height: 630,
				alt: "Clerk-AI Platform Showcase",
			},
		],
	},
	robots: {
		index: true,
		follow: true,
	},
	geo: {
		region: "IN",
		placename: "India",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={inter.className}>
					<Header />
					<main>{children}</main>
				</body>
			</html>
		</ClerkProvider>
	);
}
