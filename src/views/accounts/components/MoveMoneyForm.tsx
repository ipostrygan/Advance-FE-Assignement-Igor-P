import React, { useMemo, useState } from 'react';
import { Button, Checkbox, Divider, FormControlLabel } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import FlexxTextField from '@/components/FlexxCustomTextInputs/FlexxTextField';
import useFetchAccounts from '@/hooks/useFetchAccounts';
import FlexxAutocomplete from '@/components/FlexxCustomTextInputs/FlexxAutocomplete';
import { prepareSelectOptions } from '@/utils/prepareSelectOptions';
import useMoveMoney from '@/hooks/useMoveMoney';
import { MoveMoneyPayload } from '@/domain/Transaction';
import { FormProps } from './types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const MoveMoneyFormSchema = z.object({
  source_account_id: z.string().min(1),
  destination_account_id: z.string().min(1),
  amount: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0),
});

type MoveMoneyFormFormType = z.infer<typeof MoveMoneyFormSchema>

const MoveMoneyForm = ({ actionOnSubmit }: FormProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [sourceAccountInput, setSourceAccountInput] = useState<string | undefined>("")
  const [destinationAccountInput, setDestinationAccountInput] = useState<string | undefined>("")

  const { data: sourceAccountsRaw } = useFetchAccounts({ searchQuery: sourceAccountInput });
  const { data: destinationAccountsRaw } = useFetchAccounts({ searchQuery: destinationAccountInput });

  const { control, handleSubmit, formState: { isDirty, isValid }, watch } = useForm({
    resolver: zodResolver(MoveMoneyFormSchema),
    defaultValues: {
      source_account_id: "",
      destination_account_id: "",
      amount: "",
    }
  })
  const { mutateAsync, isLoading } = useMoveMoney()
  const selectedSourceAccount = watch("source_account_id")

  const sourceAccounts = useMemo(() => 
    prepareSelectOptions(sourceAccountsRaw), 
    [sourceAccountsRaw]
  )
  const destinationAccounts = useMemo(() => 
    prepareSelectOptions(destinationAccountsRaw?.filter((account) => account.account_id !== selectedSourceAccount)), 
    [destinationAccountsRaw, selectedSourceAccount]
  )

  const onSubmit = async (data: MoveMoneyPayload) => {
    await mutateAsync({...data, amount: Number(data.amount) })
    actionOnSubmit()
  }

  const isReadyToSubmit = isDirty && isValid && isConfirmed

  return (
    <div className='flex flex-col gap-4'> 
      <h2 className='text-2xl font-semibold'>Move money</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
        <Controller 
          name="source_account_id" 
          control={control} 
          render={({ field }) => (
            <FlexxAutocomplete 
              {...field} 
              options={sourceAccounts} 
              size="small"
              label="Source account"
              placeholder='Select source account'
              error={null} 
              onOptionChange={(_, option) => { if (option) { field.onChange(option.id) }}}
              onInputChange={(_, value) => setSourceAccountInput(value)}
              required  
            />
          )}
        />
        <Controller 
          name="destination_account_id" 
          control={control} 
          render={({ field }) => (
            <FlexxAutocomplete 
              {...field} 
              options={destinationAccounts} 
              size="small" 
              label='Destination account'
              placeholder="Select destination account"
              error={null} 
              onOptionChange={(_, option) => { if (option) { field.onChange(option.id) }}}
              onInputChange={(_, value) => setDestinationAccountInput(value)}
              required  
            />
          )}
        />
        <Divider />
        <Controller 
          name="amount" 
          control={control} 
          render={({ field }) => (
            <FlexxTextField
              {...field}
              label='Amount'
              placeholder='Enter amount'
              fullWidth
              required
              size="small"
              min={1}
            />
          )}
        />
        <FormControlLabel
          control={<Checkbox onChange={(e) => setIsConfirmed(e.target.checked)} />}
          label="I confirm this transfer"
        />
        <Button type="submit" variant='contained' disabled={!isReadyToSubmit || isLoading}>Move Money</Button>
      </form>
    </div>
  );
};

export default MoveMoneyForm;
