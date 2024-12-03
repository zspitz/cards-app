import { Button, Group, InputError } from '@mantine/core'
import { useLang } from '../context/lang/useLang'
import type { UseFormReturnType } from '@mantine/form'

type Props<FormValues> = {
    loading: boolean,
    error: Error | null,
    errorPrefix: string,
    form: UseFormReturnType<FormValues>,
    resetText: 'Reset' | 'Clear'
}

const SubmitReset = <FormValues,>({ loading, error, errorPrefix, form, resetText }: Props<FormValues>) => {
    const { t } = useLang()
    const disabled = !(form.isDirty() && form.isValid() && !error)
    return (
        <>
            <Group gap={20} mt={20}>
                <Button type="submit" disabled={disabled} loading={loading}>{t('Submit')}</Button>
                <Button onClick={() => form.reset()}>{t(resetText)}</Button>
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
