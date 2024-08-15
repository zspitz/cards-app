import { Button, Container, InputError, PasswordInput, Stack, TextInput } from '@mantine/core'
import { hasLength, isEmail, useForm } from '@mantine/form'
import { useState } from 'react'
import { redirect } from 'react-router-dom'
import { login } from '../services/http/users'

type Props = {
    reloadStoredUser: (token?: string) => Promise<void>
}

const Login = ({ reloadStoredUser }: Props) => {
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
            email: isEmail('Invalid email.'),
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

        // TODO verify that successful login works and reloads user
        // if successful, result contains a string with the new token
        reloadStoredUser(result)
        redirect('/')
    }

    const disabled = !(form.isValid() && !submitError)

    return (
        <Container size="xs">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack mb={25}>
                    <TextInput label="Email" required placeholder="abc@gmail.com" key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput label="Password" required key={form.key('password')}
                        {...form.getInputProps('password')}
                    />
                </Stack>
                <Button type="submit" mb="xs" disabled={disabled} loading={submitting}>Submit</Button>
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
