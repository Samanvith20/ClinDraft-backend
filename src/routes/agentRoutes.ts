import { Router } from 'express';
import { AgentController } from '../controllers/agentController';

export const agentRoutes = Router();
const agentController = new AgentController();

agentRoutes.post('/chat', agentController.chat.bind(agentController));
