import { Button, Container, InputError, PasswordInput, Stack, TextInput } from '@mantine/core'
import { hasLength, isEmail, useForm } from '@mantine/form'
import { useState } from 'react'
import { useFetcher } from 'react-router-dom'
import { login } from '../services/http/users'
import { useLang } from '../context/lang/useLang'

const Login = () => {
    const { t } = useLang()

    const fetcher = useFetcher()

    const [submitError, setSubmitError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    // TODO use zod for validations - https://mantine.dev/form/schema-validation/
    // revalidate within users.login

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: isEmail(t('Invalid email')),
            password: hasLength({ min: 7 })
        },
        validateInputOnChange: true,
        onValuesChange: () => setSubmitError('')
    })

    const handleSubmit = async ({ email, password }: typeof form.values) => {
        setSubmitting(true)
        const result = await login(email, password)
        if (typeof result !== 'string') {
            setSubmitError(result.message)
            setSubmitting(false)
            return
        }

        // TODO when redirected here from a protected page, navigate back to that page
        // if successful, result contains a string with the new token
        fetcher.submit(null, {
            method: 'post',
            action: `/login/${result}`
        })
        setSubmitting(false)
    }

    const disabled = !(form.isValid() && !submitError)

    // TODO Consider using inputs that contain the label - https://ui.mantine.dev/category/inputs/#contained-inputs
    // Or floating labels: https://ui.mantine.dev/category/inputs/#floating-label-input

    return (
        <Container size="xs">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack mb={25}>
                    <TextInput label={t('Email')} required placeholder="abc@gmail.com" key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput label={t('Password')} required key={form.key('password')}
                        {...form.getInputProps('password')}
                    />
                </Stack>
                <Button type="submit" mb="xs" disabled={disabled} loading={submitting}>{t('Submit')}</Button>
                {
                    submitError &&
                    <InputError>
                        Unable to login.<br />
                        {submitError}
                    </InputError>
                }

            </form>
        </Container>
    )
}

export default Login