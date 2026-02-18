import { z } from "zod";

export const MoveMoneyFormSchema = z.object({
  source_account_id: z.string().min(1),
  destination_account_id: z.string().min(1),
  amount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0),
});
  
export type MoveMoneyFormType = z.infer<typeof MoveMoneyFormSchema>
