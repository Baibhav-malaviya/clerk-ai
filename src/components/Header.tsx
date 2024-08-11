"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const navItems = [
	{ href: "/home", label: "Home" },
	{ href: "/ask", label: "Ask" },
	{ href: "/chat", label: "Chat" },
];

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	return (
		<header className="bg-gradient-to-r from-blue-900 to-blue-950 text-white shadow-md">
			<div className="container mx-auto px-4 py-3">
				<div className="flex justify-between items-center">
					<Link href="/home" className="text-2xl font-bold">
						GeminiAI
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex space-x-6">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`hover:text-teal-300 transition-colors ${
									pathname === item.href ? "text-teal-400 font-semibold" : ""
								}`}
							>
								{item.label}
							</Link>
						))}
					</nav>

					<div className="hidden md:block">
						<SignedOut>
							<SignInButton>
								<Button
									variant="outline"
									className="bg-teal-500 hover:bg-teal-600 text-white border-none"
								>
									Sign in
								</Button>
							</SignInButton>
						</SignedOut>
						<SignedIn>
							<UserButton
								appearance={{
									elements: {
										avatarBox: "w-10 h-10",
									},
								}}
							/>
						</SignedIn>
					</div>

					{/* Mobile menu button */}
					<button
						className="md:hidden text-white"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<nav className="md:hidden mt-4 pb-4">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`block py-2 hover:text-teal-300 transition-colors ${
									pathname === item.href ? "text-teal-400 font-semibold" : ""
								}`}
								onClick={() => setIsMenuOpen(false)}
							>
								{item.label}
							</Link>
						))}
						<div className="mt-4">
							<SignedOut>
								<SignInButton>
									<Button
										variant="outline"
										className="w-full bg-teal-500 hover:bg-teal-600 text-white border-none"
									>
										Sign in
									</Button>
								</SignInButton>
							</SignedOut>
							<SignedIn>
								<UserButton
									appearance={{
										elements: {
											avatarBox: "w-10 h-10",
										},
									}}
								/>
							</SignedIn>
						</div>
					</nav>
				)}
			</div>
		</header>
	);
}
