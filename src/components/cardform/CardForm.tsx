import { useForm, zodResolver } from '@mantine/form'
import { useLang } from '../../context/lang/useLang'
import { cardPost as cardPostSchema } from '../../schemas/card'
import { CardPost, isMongoRecord } from '../../types'
import ImageAddress from '../ImageAddress'
import { useFetch } from '../../hooks/useFetch'
import { Container, Group, Stack, Textarea, TextInput, Title } from '@mantine/core'
import SubmitReset from '../SubmitReset'

export type CardFormProps = {
    titleKey: string,
    handleSubmit: (values: CardPost, runFetch: (url: string, options?: RequestInit | null) => Promise<unknown>) => Promise<void>,
    initialValues: CardPost
}

const CardForm = ({ titleKey, handleSubmit, initialValues }: CardFormProps) => {
    const { t } = useLang()

    const isExistingRecord = isMongoRecord(initialValues)

    const form = useForm({
        mode: 'uncontrolled',
        initialValues,
        validate: zodResolver(cardPostSchema),
        validateInputOnChange: true,
        onValuesChange: () => clearError()
    })

    const { loading, error, runFetch, clearError } = useFetch()

    return (
        <Container size="md">
            <Title>{t(titleKey)}</Title>
            <form onSubmit={form.onSubmit(values => handleSubmit(values, runFetch))}>
                <Group align="stretch" gap={15}>
                    <Stack flex=".4">
                        <TextInput label={t('Title')} required key={form.key('title')}
                            {...form.getInputProps('title')}
                        />
                        <TextInput label={t('Subtitle')} key={form.key('subtitle')}
                            {...form.getInputProps('subtitle')}
                        />
                    </Stack>
                    <Textarea label={t('Description')} key={form.key('description')} flex="1" styles={{
                        root: {
                            display: 'flex',
                            flexDirection: 'column'
                        },
                        wrapper: {
                            flex: '1'
                        },
                        input: {
                            height: '100%'
                        }
                    }}
                        {...form.getInputProps('description')}
                    />
                </Group>
                <ImageAddress form={form} />
                {
                    // TODO if admin, assign/change user id
                }
                <SubmitReset loading={loading} error={error} form={form}
                    resetText={isExistingRecord ? 'Reset' : 'Clear'}
                    errorPrefix={`Unable to ${isExistingRecord ? 'update' : 'create'} card`} />
            </form>
        </Container>
    )
}

export default CardForm
