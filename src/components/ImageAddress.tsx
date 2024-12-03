import { Flex, NumberInput, Stack, TextInput } from '@mantine/core'
import ImageOrPlaceholder from './ImageOrPlaceholder'
import type * as types from '../types'
import type { UseFormReturnType } from '@mantine/form'
import { useLang } from '../context/lang/useLang'
import { flexProps } from '../shared'

type Props<FormValues extends types.ImageAddressValues> = {
    form: UseFormReturnType<FormValues>
}

const ImageAddress = <FormValues extends types.ImageAddressValues>({ form }: Props<FormValues>) => {
    const { t } = useLang()

    return (
        <>
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
        </>
    )
}

export default ImageAddress
