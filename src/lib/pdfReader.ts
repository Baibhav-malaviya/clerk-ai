import fs from "fs";
import path from "path";
import { PdfReader } from "pdfreader";

export async function extractTextFromPDF(): Promise<string> {
	try {
		const filePath = path.resolve("public", "Proposal.pdf");
		const dataBuffer = fs.readFileSync(filePath);

		const text = await new Promise<string>((resolve, reject) => {
			let extractedText = "";
			new PdfReader().parseBuffer(dataBuffer, (err, item) => {
				if (err) {
					console.error("error:", err);
					reject(err);
				} else if (!item) {
					console.warn("end of buffer");
					resolve(extractedText);
				} else if (item.text) {
					extractedText += item.text + " ";
				}
			});
		});

		return text;
	} catch (error) {
		console.log("Error in pdfReader:", error);
		return "";
	}
}
