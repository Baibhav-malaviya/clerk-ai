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

export const metadata: Metadata = {
	title: "clerk-ai",
	description:
		"Application for the learning purpose of clerk and gemini ai so that we can use both the technology in a new project",
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
