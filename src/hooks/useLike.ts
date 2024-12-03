import { useRouteLoaderData } from 'react-router-dom'
import type { UserResponse } from '../types'

export const useLike = () => {
    const user = useRouteLoaderData('root') as UserResponse | null
    const isLiked = (likes: string[]) => user && likes.includes(user._id)
    return {
        isLiked
    }
}
