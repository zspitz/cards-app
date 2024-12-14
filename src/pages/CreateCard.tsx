import type * as types from '../types'
import { useFetcher, useNavigate } from 'react-router'
import CardForm, { type CardFormProps } from '../components/cardform/CardForm'
import { createCardFetchArgs } from '../services/http/cards'

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

    const handleSubmit: CardFormProps['handleSubmit'] = async (card, runFetch) => {
        const { url, init } = createCardFetchArgs(card)
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
