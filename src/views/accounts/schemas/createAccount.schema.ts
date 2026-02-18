import { accountNumberRegex } from "@/components/FlexxCustomTextInputs/domain/FlexxTextFieldValidators";
import { MAX_NAME_LENGTH } from "@/constants/fieldValidation";
import { z } from "zod";

export const CreateAccountFormSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(MAX_NAME_LENGTH),
  bank_name: z
    .string()
    .min(1),
  routing_number: z
    .string()
    .min(1)
    .regex(accountNumberRegex),
  account_number: z
    .string()
    .min(1)
    .regex(accountNumberRegex)
  });
  
export type CreateAccountFormType = z.infer<typeof CreateAccountFormSchema>
