import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import { getCurrentUser } from '../services/http/users'
import { redirectToLogin } from '../shared'
import { User } from '../services/http/types'

export const profileLoader = async (args: LoaderFunctionArgs) => {
    const user = await getCurrentUser()
    if (user) { return user }
    return redirectToLogin(args)
}

export const registrationLoader = () => {
    return {}
}

const Profile = () => {
    const data = useLoaderData() as User
    console.log(data)
    return (
        <>{
            data._id ?
                'Profile' :
                'Registration'
        }</>
    )
}

export default Profile
