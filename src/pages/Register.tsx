import { useFetcher } from 'react-router'
import * as types from '../types'
import { userPost as userPostSchema } from '../schemas/user'
import * as users from '../services/http/users'
import UserForm, { Props as UserFormProps } from '../components/userform/UserForm'

const Register = () => {
    const initialValues: types.UserPost = {
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
        isBusiness: false,
        isAdmin: false
    }

    const fetcher = useFetcher()

    const handleSubmit = async (user: types.UserPost, runFetch: (url: string, options?: RequestInit | null) => Promise<unknown>) => {
        let { url, init } = users.registerFetchArgs(user)
        const response = (await runFetch(url, init)) as types.RegisterResponse | undefined
        if (typeof response !== 'object') { return }
        ({ url, init } = users.loginFetchArgs({
            email: user.email,
            password: user.password
        }))
        const token = (await runFetch(url, init)) as string
        fetcher.submit(null, {
            method: 'put',
            action: `/login/${token}`
        })
    }

    const userformProps: UserFormProps<types.UserPost, typeof userPostSchema> = {
        handleSubmit,
        titleKey: 'Register',
        initialValues,
        schema: userPostSchema
    }

    return <UserForm {...userformProps} />
}

export default Register
