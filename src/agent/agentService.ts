import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "../config/env";
import { PromptBuilder } from "./promptBuilder";
import { DerivedPatientContext } from "../types";

export class AgentService {
  private ai: GoogleGenerativeAI | null = null;
  private promptBuilder: PromptBuilder;

  constructor() {
    this.promptBuilder = new PromptBuilder();
    if (env.GEMINI_API_KEY) {
      this.ai = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    }
  }

  // Pre-filter unsupported requests
  private isUnsupportedTask(message: string): boolean {
    const lowerMessage = message.toLowerCase();
    const unsupportedKeywords = [
      "diagnose",
      "diagnosis",
      "treat",
      "treatment",
      "prescribe",
      "medication recommendation",
      "what disease",
    ];

    return unsupportedKeywords.some((keyword) =>
      lowerMessage.includes(keyword),
    );
  }

  async processChat(
    context: DerivedPatientContext,
    message: string,
  ): Promise<string> {
    if (this.isUnsupportedTask(message)) {
      return "I'm sorry, but as an AI assistant, I cannot provide diagnoses, recommend treatments, or suggest medications. Please consult a licensed healthcare professional.";
    }

    const systemPrompt = this.promptBuilder.buildSystemPrompt();
    const userPrompt = this.promptBuilder.buildUserPrompt(context, message);

    if (!this.ai) {
      // Mock Mode
      console.log("Running in MOCK mode (No GEMINI_API_KEY provided)");
      return `[Mock Response] I understand you are asking about: "${message}". Based on the patient context, they are a ${context.patientOneLiner}. (Set GEMINI_API_KEY for real AI responses).`;
    }

    try {
      const model = this.ai.getGenerativeModel({
            model: "gemini-2.5-flash" 
    });
      const combinedPrompt = `${systemPrompt}\n\n${userPrompt}`;
      const result = await model.generateContent(combinedPrompt);
      const response = await result.response;
      return response.text() || "No response generated.";
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw new Error("Failed to generate AI response");
    }
  }
}
