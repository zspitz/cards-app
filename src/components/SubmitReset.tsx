import { Button, Group, InputError } from '@mantine/core'
import { useLang } from '../context/lang/useLang'
import { UseFormReturnType } from '@mantine/form'

type Props<FormValues> = {
    loading: boolean,
    error: Error | null,
    errorPrefix: string,
    form: UseFormReturnType<FormValues>
}

const SubmitReset = <FormValues,>({ loading, error, errorPrefix, form }: Props<FormValues>) => {
    const { t } = useLang()
    const disabled = !(form.isDirty() && form.isValid() && !error)
    return (
        <>
            <Group gap={5}>
                <Button type="submit" disabled={disabled} loading={loading}>{t('Submit')}</Button>
                <Button onClick={() => form.reset()}>{t('Reset')}</Button>
            </Group>
            {
                error &&
                <InputError>
                    {t(errorPrefix)}<br />
                    {error.message}
                </InputError>
            }
        </>
    )
}

export default SubmitReset
