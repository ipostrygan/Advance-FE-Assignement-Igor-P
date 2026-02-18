import { Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import FlexxTextField from '@/components/FlexxCustomTextInputs/FlexxTextField';
import { CreateAccountPayload } from '@/domain/Account';
import useCreateAccount from '@/views/accounts/hooks/useCreateAccount';
import { FormProps } from '../types';
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateAccountFormSchema, type CreateAccountFormType } from '../schemas/createAccount.schema';

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
