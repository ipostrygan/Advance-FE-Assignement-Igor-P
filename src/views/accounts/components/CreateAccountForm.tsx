import React from 'react';
import {Button, Stack, Typography} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import FlexxTextField from '@/components/FlexxCustomTextInputs/FlexxTextField';

interface CreateAccountFormProps {
  onClose: () => void
}

const CreateAccountForm = ({ onClose }: CreateAccountFormProps) => {
  const { control, handleSubmit, formState: { isDirty} } = useForm({
    defaultValues: {
      name: "",
      bank_name: "",
      routing_number: "",
      account_number: "",
    }
  })

  const onSubmit = (data: any) => {
    onClose()
  }

  return (
    <Stack
      flexGrow={1}
      gap={'1rem'}
    > 
      <Typography variant="h2">Create Account</Typography>
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
            />
          )}
        />
        <Button type="submit" variant='contained' disabled={!isDirty}>Add account</Button>
      </form>
    </Stack>
  );
};

export default CreateAccountForm;
