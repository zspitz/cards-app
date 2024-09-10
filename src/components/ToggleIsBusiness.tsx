import { Stack, Switch, Title } from '@mantine/core'
import { useLang } from '../context/lang/useLang'
import { useFetch } from '../hooks/useFetch'
import { ProfileLoaderReturnData } from '../loadersActions'
import { useFetcher } from 'react-router-dom'
import { useForm } from '@mantine/form'
import { toggleIsBusinessArgs } from '../services/http/users'
import SubmitReset from './SubmitReset'

type Props = {
    user: ProfileLoaderReturnData
}

const ToggleIsBusiness = ({ user }: Props) => {
    const { t } = useLang()
    const { loading, error, runFetch, clearError } = useFetch()

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            isBusiness: user.isBusiness
        },
        onValuesChange: () => clearError()
    })

    const fetcher = useFetcher()

    const handleSubmit = async () => {
        const { url, init } = toggleIsBusinessArgs(user._id)
        const response = (await runFetch(url, init)) as ProfileLoaderReturnData | undefined
        if (!response) { return }
        fetcher.submit(null, {
            method: 'post',
            action: '/profile'
        })
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="1rem" mt={20}>
                <Title>Toggle IsBusiness</Title>
                <Switch label={t('Is business')} key={form.key('isBusiness')} {...form.getInputProps('isBusiness', { type: 'checkbox' })} />
                <SubmitReset loading={loading} error={error} form={form} errorPrefix="Can't toggle isBusiness" />
            </Stack>
        </form>
    )
}

export default ToggleIsBusiness
