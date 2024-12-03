import { Container, Flex, PasswordInput, Stack, Switch, TextInput, Title } from '@mantine/core'
import { useLang } from '../../context/lang/useLang'
import { useForm, zodResolver } from '@mantine/form'
import * as types from '../../types'
import SubmitReset from '../SubmitReset'
import type { PropsWithChildren } from 'react'
import type { z } from 'zod'
import { useFetch } from '../../hooks/useFetch'
import { flexProps } from '../../shared'
import ImageAddress from '../ImageAddress'

export type Props<
    FormValues extends types.UserPost | types.UserPut,
    Schema extends z.ZodTypeAny
> = {
    titleKey: string,
    handleSubmit: (values: FormValues, runFetch: (url: string, options?: RequestInit | null) => Promise<unknown>) => Promise<void>,
    initialValues: FormValues,
    schema: Schema
}

const UserForm = <
    FormValues extends types.UserPost | types.UserPut,
    Schema extends z.ZodTypeAny
>({ titleKey, handleSubmit, initialValues, children, schema }: PropsWithChildren<Props<FormValues, Schema>>) => {
    const { t } = useLang()

    const isExistingRecord = types.isMongoRecord(initialValues)

    const form = useForm({
        mode: 'uncontrolled',
        initialValues,
        validate: zodResolver(schema),
        validateInputOnChange: true,
        onValuesChange: () => clearError()
    })

    const { loading, error, runFetch, clearError } = useFetch()

    return (
        <Container size="md">
            <Title>{t(titleKey)}</Title>
            <form onSubmit={form.onSubmit(values => handleSubmit(values, runFetch))}>
                <Stack mb={20}>
                    <Flex {...flexProps}>
                        <TextInput label={t('First name')} required key={form.key('name.first')} flex="1"
                            {...form.getInputProps('name.first')}
                        />
                        <TextInput label={t('Middle name')} key={form.key('name.middle')} flex=".75"
                            {...form.getInputProps('name.middle')}
                        />
                        <TextInput label={t('Last name')} required key={form.key('name.last')} flex="1"
                            {...form.getInputProps('name.last')}
                        />
                        {
                            isExistingRecord &&
                            <TextInput label={t('Phone')} required key={form.key('phone')} flex="1"
                                {...form.getInputProps('phone')}
                            />
                        }
                    </Flex>
                    {
                        (!isExistingRecord) &&
                        <Flex {...flexProps}>
                            <TextInput label={t('Phone')} required key={form.key('phone')} flex="1"
                                {...form.getInputProps('phone')}
                            />
                            <TextInput label={t('Email')} required key={form.key('email')} flex="1"
                                {...form.getInputProps('email')}
                            />
                            <PasswordInput label={t('Password')} required key={form.key('password')} flex="1"
                                {...form.getInputProps('password')}
                            />
                        </Flex>
                    }
                    <ImageAddress form={form} />
                    {
                        (!isExistingRecord) &&
                        <>
                            <Switch label={t('Is business')} key={form.key('isBusiness')} {...form.getInputProps('isBusiness')} />
                            <Switch label={t('Is admin')} key={form.key('isAdmin')} {...form.getInputProps('isAdmin')} />
                        </>
                    }
                </Stack>
                <SubmitReset loading={loading} error={error} form={form}
                    resetText={isExistingRecord ? 'Reset' : 'Clear'}
                    errorPrefix={`Unable to ${isExistingRecord ? 'update' : 'register'}`} />
            </form>
            {children}
        </Container >
    )
}

export default UserForm
