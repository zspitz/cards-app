import * as types from '../types'
import * as cards from '../services/http/cards'
import { useFetcher, useNavigate } from 'react-router'
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

    const fetcher = useFetcher()

    const handleSubmit = async (card: types.CardPost, runFetch: (url: string, options?: RequestInit | null) => Promise<unknown>) => {
        const { url, init } = cards.createCardFetchArgs(card)
        const response = (await runFetch(url, init)) as types.CardResponse | undefined
        if (typeof response !== 'object') { return }

        fetcher.submit(response, {
            method: 'post',
            action: '/cards',
            encType: 'application/json'
        })

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
