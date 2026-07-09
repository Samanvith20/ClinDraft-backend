import { Router } from 'express';
import { patientRoutes } from './patientRoutes';
import { agentRoutes } from './agentRoutes';
import { draftRoutes } from './draftRoutes';

export const apiRouter = Router();

apiRouter.use('/patients', patientRoutes);
apiRouter.use('/agent', agentRoutes);
apiRouter.use('/drafts', draftRoutes);
