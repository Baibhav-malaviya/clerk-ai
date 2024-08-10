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
					<header className="p-3 bg-blue-950 flex justify-between items-center">
						<div>
							<ul className="flex items-center justify-center gap-3 text-sm">
								<li>
									<Link href={"/home"}>Home</Link>
								</li>
								<li>
									<Link href={"/ask"}>Ask</Link>
								</li>
								<li>
									<Link href={"/chat"}>Chat</Link>
								</li>
							</ul>
						</div>
						<SignedOut>
							<SignInButton>
								<button className="bg-teal-400  py-2 px-3 text-sm rounded">
									Sign in
								</button>
							</SignInButton>
						</SignedOut>
						<SignedIn>
							<UserButton />
						</SignedIn>
					</header>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
