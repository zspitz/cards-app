import { useFetcher, useLoaderData, useNavigate } from 'react-router'
import type { CardResponse } from '../types'
import CardForm, { type CardFormProps } from '../components/cardform/CardForm'
import { updateCardFetchArgs } from '../services/http/cards'

const EditCard = () => {
    const navigate = useNavigate()
    const card = useLoaderData<CardResponse>()
    const fetcher = useFetcher()

    const handleSubmit: CardFormProps['handleSubmit'] = async (cardData, runFetch) => {
        const { url, init } = updateCardFetchArgs(card._id, cardData)
        const response = (await runFetch(url, init)) as CardResponse | undefined
        if (typeof response !== 'object') { return }

        fetcher.submit(response, {
            method: 'put',
            action: '/cards',
            encType: 'application/json'
        })

        navigate('/cards')
    }

    const cardFormProps: CardFormProps = {
        titleKey: 'Edit card',
        initialValues: card,
        handleSubmit
    }

    return <CardForm {...cardFormProps} />
}

export default EditCard
