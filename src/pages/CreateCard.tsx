import * as types from '../types'
import * as cards from '../services/http/cards'
import { useNavigate } from 'react-router-dom'
import CardForm, { CardFormProps } from '../components/cardform/CardForm'

const CreateCard = () => {
    const navigate = useNavigate()

    const initialValues: types.CardPost = {
        title: '',
        subtitle: '',
        description: '',
        phone: '',
        email: '',
        web: '',
        address: {
            street: '',
            houseNumber: 0,
            city: '',
            state: '',
            country: '',
            zip: 0
        },
        image: {}
    }

    const handleSubmit = async (card: types.CardPost, runFetch: (url: string, options?: RequestInit | null) => Promise<unknown>) => {
        const { url, init } = cards.createCardFetchArgs(card)
        const response = (await runFetch(url, init)) as types.CardResponse | undefined
        if (typeof response !== 'object') { return }

        // TODO navigate to previous page, if we've come from favorites or my-cards
        navigate('/cards')
    }

    const cardformProps: CardFormProps = {
        titleKey: 'Create card',
        initialValues,
        handleSubmit
    }

    return <CardForm {...cardformProps} />
}

export default CreateCard
