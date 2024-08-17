import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom'
import * as users from '../services/http/users'
import { redirectToLogin } from '../shared'
import { isMongoRecord, MongoRecord, User } from '../types'

export const profileLoader = async (args: LoaderFunctionArgs) => {
    const user = await users.getCurrent()
    if (user) { return user }
    return redirectToLogin(args)
}

export const registrationLoader = () => {
    return {}
}

const Profile = () => {
    const data = useLoaderData() as MongoRecord<User>
    console.log(data)
    return (
        <>{
            isMongoRecord(data) ?
                'Profile' :
                'Registration'
        }</>
    )
}

export default Profile
