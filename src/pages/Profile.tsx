import { useFetcher, useRouteLoaderData } from 'react-router-dom'
import * as types from '../types'
import { userPut as userPutSchema } from '../schemas/user'
import * as users from '../services/http/users'
import UserForm, { Props as UserFormProps } from '../components/userform/UserForm'
import { Group, Space } from '@mantine/core'
import ToggleIsBusiness from '../components/userform/ToggleIsBusiness'
import DeleteUser from '../components/userform/DeleteUser'

const Profile = () => {
    // TODO modify to use for editing another user
    // take user as a prop, and only use the router-stored current user if the prop is undeinfed

    const user = useRouteLoaderData('root') as types.UserResponse
    const fetcher = useFetcher()

    const userformProps: UserFormProps<types.UserResponse, typeof userPutSchema> = {
        initialValues: user,
        schema: userPutSchema,
        titleKey: 'Edit profile',

        handleSubmit: async (user, runFetch) => {
            const parsed = userPutSchema.parse(user)
            const { url, init } = users.profileUpdateFetchArgs(user._id, parsed)
            const response = (await runFetch(url, init)) as types.UserResponse | undefined
            if (typeof response !== 'object') { return }
            fetcher.submit(response, {
                method: 'put',
                action: '/',
                encType: 'application/json'
            })
        }
    }

    return (
        <UserForm {...userformProps}>
            <>
                <Space h="md" />
                <hr />
                <Space h="md" />
                <Group align="flex-start" gap={20}>
                    <ToggleIsBusiness user={user} />
                    <DeleteUser user={user} />
                </Group>
            </>
        </UserForm>
    )
}

export default Profile
