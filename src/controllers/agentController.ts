import { Request, Response, NextFunction } from 'express';
import { AgentService } from '../agent/agentService';
import { ContextGenerator } from '../context/contextGenerator';
import { ChatRepository } from '../repositories/draftRepository';
import { chatSchema } from '../validators';

const agentService = new AgentService();
const contextGenerator = new ContextGenerator();
const chatRepository = new ChatRepository();

export class AgentController {
  async chat(req: Request, res: Response, next: NextFunction) {
    try {
      const { patientId, message } = chatSchema.parse(req.body);

      // Save user message
      await chatRepository.create({
        patientId,
        role: 'user',
        content: message,
      });

      // Get context
      const context = await contextGenerator.generateContext(patientId);
      if (!context) {
        return res.status(404).json({ error: 'Patient not found' });
      }

      // Process via Agent
      const response = await agentService.processChat(context, message);

      // Save agent response
      const savedResponse = await chatRepository.create({
        patientId,
        role: 'agent',
        content: response,
      });

      res.json({ data: savedResponse });
    } catch (error) {
      next(error);
    }
  }
}
