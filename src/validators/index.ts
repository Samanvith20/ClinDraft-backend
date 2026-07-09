import { z } from 'zod';

export const patientSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required'),
  lastName: z.string().trim().min(1, 'Last name is required'),
  dateOfBirth: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime()) && date <= new Date();
  }, {
    message: 'Date of birth must be a valid date and cannot be in the future',
  }),
  gender: z.string().trim().min(1, 'Gender is required'),
  mrn: z.string().trim().min(1, 'MRN is required'),
});

export const draftSchema = z.object({
  patientId: z.string().uuid('Invalid patient ID'),
  content: z.string().min(1, 'Content is required'),
  draftType: z.string().min(1, 'Draft type is required'),
});

export const chatSchema = z.object({
  patientId: z.string().uuid('Invalid patient ID'),
  message: z.string().min(1, 'Message is required'),
});

