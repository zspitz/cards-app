import { useFetcher, useLoaderData } from 'react-router-dom'
import * as users from '../services/http/users'
import { isMongoRecord, UserResponse } from '../types'
import { useLang } from '../context/lang/useLang'
import * as types from '../types'
import { useForm, zodResolver } from '@mantine/form'
import { useFetch } from '../hooks/useFetch'
import { userPost as userPostSchema, userPut as userPutSchema } from '../schemas/user'
import { Button, Checkbox, Container, Flex, InputError, PasswordInput, Stack, TextInput, Title, FlexProps, NumberInput } from '@mantine/core'
import ImageOrPlaceholder from '../components/ImageOrPlaceholder'
import { ProfileLoaderReturnData } from '../loadersActions'

const Profile = () => {
    const { t } = useLang()
    const { loading, error, runFetch, clearError } = useFetch()

    const currentUserData = useLoaderData() as ProfileLoaderReturnData | undefined
    const initialValues: types.UserPut | types.UserPost = currentUserData ?? {
        name: {
            first: '',
            last: ''
        },
        address: {
            street: '',
            houseNumber: 0,
            city: '',
            state: '',
            country: '',
            zip: 0
        },
        email: '',
        password: '',
        phone: '',
        image: {},
        isBusiness: false
    }

    const schema =
        currentUserData ?
            userPutSchema :
            userPostSchema

    const form = useForm<types.UserPost | types.UserPut>({
        mode: 'uncontrolled',
        initialValues,
        validate: zodResolver(schema),
        validateInputOnChange: true,
        onValuesChange: () => clearError()
    })

    const fetcher = useFetcher()

    const handleSubmit = async (user: typeof form.values) => {
        if (isMongoRecord(user)) {
            const { url, init } = users.profileUpdateFetchArgs(user._id, user)
            const response = await runFetch(url, init)
            if (typeof response !== 'object') { return }
            fetcher.submit(null, {
                method: 'post',
                action: '/profile'
            })
            return
        }

        const user1 = user as types.UserPost
        let { url, init } = users.registerFetchArgs(user1)
        const response = await runFetch(url, init)
        if (typeof response !== 'object') { return }
        ({ url, init } = users.loginFetchArgs({
            email: (response as UserResponse).email,
            password: user1.password
        }))
        const token = (await runFetch(url, init)) as string
        fetcher.submit(null, {
            method: 'post',
            action: `/login/${token}`
        })
    }

    const disabled = !(form.isValid() && !error)
    const flexProps: FlexProps = {
        direction: { base: 'column', sm: 'row' },
        gap: 15
    }

    return (
        <Container size="md">
            <Title>{
                isMongoRecord(form.values) ?
                    t('Edit profile') :
                    t('Register')
            }</Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack mb={20}>
                    <Flex {...flexProps}>
                        <TextInput label={t('First name')} required key={form.key('name.first')} flex="1"
                            {...form.getInputProps('name.first')}
                        />
                        <TextInput label={t('Middle name')} key={form.key('name.middle')} flex=".75"
                            {...form.getInputProps('name.middle')}
                        />
                        <TextInput label={t('Last name')} required key={form.key('name.last')} flex="1"
                            {...form.getInputProps('name.last')}
                        />
                    </Flex>
                    <Flex {...flexProps}>
                        <TextInput label={t('Phone')} required key={form.key('phone')} flex="1"
                            {...form.getInputProps('phone')}
                        />
                        <TextInput label={t('Email')} required key={form.key('email')} flex="1"
                            {...form.getInputProps('email')}
                        />
                        <PasswordInput label={t('Password')} required key={form.key('password')} flex="1"
                            {...form.getInputProps('password')}
                        />
                    </Flex>
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
                    <Checkbox label={t('Business')} key={form.key('isBusiness')} {...form.getInputProps('isBusiness')} />
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

export default Profile

/*
firstname	middle name	last name
phone	email 	password

profile image:
url	preview
alt

address:
street	housenumber
city	state	country	zip

isbusiness

        */
