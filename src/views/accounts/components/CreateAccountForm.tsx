import { Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import FlexxTextField from '@/components/FlexxCustomTextInputs/FlexxTextField';
import { CreateAccountPayload } from '@/domain/Account';
import useCreateAccount from '@/hooks/accounts/useCreateAccount';
import { FormProps } from './types';
import { z } from 'zod'
import { accountNumberRegex } from '@/components/FlexxCustomTextInputs/domain/FlexxTextFieldValidators';
import { MAX_NAME_LENGTH } from '@/constants/fieldValidation';
import { zodResolver } from "@hookform/resolvers/zod"

const CreateAccountFormSchema = z.object({
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

type CreateAccountFormType = z.infer<typeof CreateAccountFormSchema>

const CreateAccountForm = ({ actionOnSubmit }: FormProps) => {
  const { control, handleSubmit, formState: { isDirty, isValid } } = useForm<CreateAccountFormType>({
    resolver: zodResolver(CreateAccountFormSchema),
    defaultValues: {
      name: "",
      bank_name: "",
      routing_number: "",
      account_number: "",
    }
  })
  const { mutateAsync, isLoading } = useCreateAccount()

  const onSubmit = async (data: CreateAccountPayload) => {
    await mutateAsync(data)
    actionOnSubmit()
  }

  return (
    <div className='flex flex-col gap-4'> 
      <h2 className='text-2xl font-semibold'>Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <Controller 
          name="name" 
          control={control} 
          render={({ field }) => (
            <FlexxTextField
              {...field}
              label='Account Name'
              placeholder='Enter account name'
              fullWidth
              required
              accountName
            />
          )}
        />
        <Controller 
          name="bank_name" 
          control={control} 
          render={({ field }) => (
            <FlexxTextField
              {...field}
              label='Bank Name'
              placeholder='Enter bank name'
              fullWidth
              required
            />
          )}
        />
        <Controller 
          name="routing_number" 
          control={control} 
          render={({ field }) => (
            <FlexxTextField
              {...field}
              label='Routing Number'
              placeholder='Enter routing number'
              fullWidth
              required
              routingNumber
            />
          )}
        />
        <Controller 
          name="account_number" 
          control={control} 
          render={({ field }) => (
            <FlexxTextField
              {...field}
              label='Account Number'
              placeholder='Enter account number'
              fullWidth
              required
              routingNumber
            />
          )}
        />
        <Button 
          type="submit"
          variant='contained' 
          disabled={!isDirty || !isValid || isLoading}
        >
          Add account
        </Button>
      </form>
    </div>
  );
};

export default CreateAccountForm;
