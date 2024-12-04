import { useForm, zodResolver } from '@mantine/form'
import { useLang } from '../../context/lang/useLang'
import { cardPost as cardPostSchema } from '../../schemas/card'
import { type CardPost, isMongoRecord } from '../../types'
import ImageAddress from '../ImageAddress'
import { useFetch } from '../../hooks/useFetch'
import { Container, Flex, Stack, Textarea, TextInput, Title } from '@mantine/core'
import SubmitReset from '../SubmitReset'
import { flexProps } from '../../shared'

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
                <Stack>
                    <Flex align="stretch" {...flexProps}>
                        <Stack flex=".4">
                            <TextInput label={t('Title')} required key={form.key('title')}
                                {...form.getInputProps('title')}
                            />
                            <TextInput label={t('Subtitle')} required key={form.key('subtitle')}
                                {...form.getInputProps('subtitle')}
                            />
                        </Stack>
                        <Textarea label={t('Description')} required key={form.key('description')} flex="1" styles={{
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
                    </Flex>
                    <Flex {...flexProps}>
                        <TextInput label={t('Phone')} required key={form.key('phone')} flex=".5"
                            {...form.getInputProps('phone')}
                        />
                        <TextInput label={t('Email')} required key={form.key('email')} flex=".5"
                            {...form.getInputProps('email')}
                        />
                        <TextInput label={t('Web')} required key={form.key('web')} flex="1"
                            {...form.getInputProps('web')}
                        />
                    </Flex>

                    <ImageAddress form={form} />
                    {
                        // TODO if admin, assign/change user id
                    }
                    <SubmitReset loading={loading} error={error} form={form}
                        resetText={isExistingRecord ? 'Reset' : 'Clear'}
                        errorPrefix={`Unable to ${isExistingRecord ? 'update' : 'create'} card`} />
                </Stack>
            </form>
        </Container>
    )
}

export default CardForm
