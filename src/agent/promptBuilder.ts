import { DerivedPatientContext } from '../types';

export class PromptBuilder {
  buildSystemPrompt(): string {
    return `You are a clinical AI assistant for a healthcare application (ClinDraft).
Your role is to assist in drafting clinical notes, summarizing patient contexts, and answering administrative or factual clinical questions based ON THE PROVIDED CONTEXT ONLY.

CRITICAL RULES:
1. DO NOT provide diagnoses.
2. DO NOT recommend treatments.
3. DO NOT recommend medications.
4. If a user asks for diagnosis, treatment, or medication recommendations, you MUST politely refuse and state that you are an AI and cannot provide medical advice or clinical decision support.
5. Base all answers strictly on the provided patient context.`;
  }

  buildUserPrompt(context: DerivedPatientContext, userMessage: string): string {
    const activeProblemsStr = context.activeProblems.map(p => p.name).join(', ') || 'None';
    const medsStr = context.currentMedications.map(m => `${m.name} ${m.dosageInstruction || ''}`.trim()).join(', ') || 'None';
    const allergiesStr = context.allergies.map(a => `${a.substance} (${a.criticality || 'unknown'})`).join(', ') || 'None';
    const observationsStr = context.relevantObservations.map(o => `${o.code}: ${o.value} ${o.unit || ''}`.trim()).join(', ') || 'None';

    return `Patient Context:
- One-liner: ${context.patientOneLiner}
- Active Problems: ${activeProblemsStr}
- Current Medications: ${medsStr}
- Allergies: ${allergiesStr}
- Recent Observations: ${observationsStr}
- Risk Flags: ${context.riskFlags.join(', ') || 'None'}
- Missing Information: ${context.missingInformation.join(', ') || 'None'}

User Request: ${userMessage}

Remember the rules: No diagnosis, no treatment recommendations, no medication recommendations.`;
  }
}
