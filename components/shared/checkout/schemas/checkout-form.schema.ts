import { z } from 'zod';

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: 'First Name must contain at least 2 characters' }),
  lastName: z.string().min(2, { message: 'Last Name must contain at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email' }),
  phone: z.string().min(10, { message: 'Invalid Phone' }),
  address: z.string().min(2, { message: 'Invalid Address' }),
  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;