import { Button, Container, InputError, PasswordInput, Stack, TextInput } from '@mantine/core'
import { hasLength, isEmail, useForm } from '@mantine/form'
import { useFetcher } from 'react-router-dom'
import { loginFetchArgs } from '../services/http/users'
import { useLang } from '../context/lang/useLang'
import * as types from '../types'
import { useFetch } from '../hooks/useFetch'

const Login = () => {
    const { t } = useLang()

    const { loading, error, runFetch, clearError } = useFetch()

    // TODO use zod for validations - https://mantine.dev/form/schema-validation/
    // revalidate within users.login

    const form = useForm<types.Login>({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: ''
        },
        validate: {
            email: isEmail(t('Invalid email')),
            password: hasLength({ min: 1 })
        },
        validateInputOnChange: true,
        onValuesChange: () => clearError()
    })

    const fetcher = useFetcher()

    const handleSubmit = async (login: typeof form.values) => {
        const { url, init } = loginFetchArgs(login)
        const token = await runFetch(url, init ?? null)
        if (typeof token !== 'string') { return }

        // TODO when redirected here from a protected page, navigate back to that page
        // if successful, result contains a string with the new token
        fetcher.submit(null, {
            method: 'post',
            action: `/login/${token}`
        })
    }

    const disabled = !(form.isValid() && !error)

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
                <Button type="submit" mb="xs" disabled={disabled} loading={loading}>{t('Submit')}</Button>
                {
                    error &&
                    <InputError>
                        Unable to login.<br />
                        {error.message}
                    </InputError>
                }

            </form>
        </Container>
    )
}

export default Login
