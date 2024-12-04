import { Container, PasswordInput, Stack, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { useFetcher } from 'react-router'
import { loginFetchArgs } from '../services/http/users'
import { useLang } from '../context/lang/useLang'
import type * as types from '../types'
import { useFetch } from '../hooks/useFetch'
import { login as loginSchema } from '../schemas/login'
import SubmitReset from '../components/SubmitReset'

const Login = () => {
    const { t } = useLang()

    const { loading, error, runFetch, clearError } = useFetch()

    const form = useForm<types.Login>({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: ''
        },
        validate: zodResolver(loginSchema),
        validateInputOnChange: true,
        onValuesChange: () => clearError()
    })

    const fetcher = useFetcher()

    const handleSubmit = async (login: typeof form.values) => {
        const { url, init } = loginFetchArgs(login)
        const token = await runFetch(url, init)
        if (typeof token !== 'string') { return }

        // if successful, result contains a string with the new token
        // TODO when redirected here from a protected page, navigate back to that page
        fetcher.submit(null, {
            method: 'put',
            action: `/login/${token}`
        })
    }

    return (
        <Container size="xs">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack mb={20}>
                    <TextInput label={t('Email')} required placeholder="abc@gmail.com" key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput label={t('Password')} required key={form.key('password')}
                        {...form.getInputProps('password')}
                    />
                </Stack>
                <SubmitReset error={error} errorPrefix='Unable to login' form={form} loading={loading} resetText='Clear' />
            </form>
        </Container>
    )
}

export default Login
