import { Container, Flex, FlexProps, NumberInput, PasswordInput, Stack, Switch, TextInput, Title } from '@mantine/core'
import { useLang } from '../../context/lang/useLang'
import { useForm, zodResolver } from '@mantine/form'
import ImageOrPlaceholder from '../ImageOrPlaceholder'
import * as types from '../../types'
import SubmitReset from '../SubmitReset'
import { PropsWithChildren } from 'react'
import { z } from 'zod'
import { useFetch } from '../../hooks/useFetch'

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

    const flexProps: FlexProps = {
        direction: { base: 'column', sm: 'row' },
        gap: 15
    }

    const { loading, error, runFetch, clearError } = useFetch()

    return (
        <Container size="md">
            <Title>{titleKey}</Title>
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
                    <Flex gap={15} mt={14} align="stretch">
                        <ImageOrPlaceholder url={form.getValues().image.url} alt={form.values.image.alt} height="150px" />
                        <Stack flex="1">
                            <TextInput label={t('Image url')} key={form.key('image.url')} {...form.getInputProps('image.url')} />
                            <TextInput label={t('Image alt text')} key={form.key('image.alt')} {...form.getInputProps('image.alt')} />
                        </Stack>
                    </Flex>
                    <Flex {...flexProps}>
                        <TextInput label={t('Street')} required key={form.key('address.street')}
                            {...form.getInputProps('address.street')} flex="1"
                        />
                        <NumberInput label={t('House')} required key={form.key('address.houseNumber')}
                            {...form.getInputProps('address.houseNumber')} maw={{ base: '100%', sm: '100px' }}
                        />
                        <TextInput label={t('City')} required key={form.key('address.city')}
                            {...form.getInputProps('address.city')} flex="1"
                        />
                    </Flex>
                    <Flex {...flexProps}>
                        <TextInput label={t('State')} key={form.key('address.state')}
                            {...form.getInputProps('address.state')} flex="1"
                        />
                        <NumberInput label={t('Postal code')} required key={form.key('address.zip')}
                            {...form.getInputProps('address.zip')} flex="1"
                        />
                        <TextInput label={t('Country')} required key={form.key('address.country')}
                            {...form.getInputProps('address.country')} flex="1"
                        />
                    </Flex>
                    {
                        (!isExistingRecord) &&
                        <Switch label={t('Is business')} key={form.key('isBusiness')} {...form.getInputProps('isBusiness')} />
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
