import type { FlexProps, MantineStyleProp } from '@mantine/core'
import { Container, Flex, Stack, Text, Title } from '@mantine/core'
import type { CardResponse, Address } from '../types'
import ImageOrPlaceholder from '../components/ImageOrPlaceholder'
import { useLoaderData } from 'react-router'
import { FaAt, FaPhone, FaLink, FaHashtag } from 'react-icons/fa6'
import { FaMapMarkerAlt } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import ContactDetail from '../components/ContactDetail'
import ActionsSection from '../components/ActionsSection'
import LikeActionButton from '../components/carddetails/LikeActionButton'
import OwnerActions from '../components/carddetails/OwnerActions'

const flexProps1: FlexProps = {
    direction: { base: 'column', sm: 'row-reverse' },
    gap: 15
}

const textStyle: MantineStyleProp = {
    textWrap: 'nowrap',
    whiteSpace: 'pre-line'
}

const formatAddress = ({ street, houseNumber, city, state, country, zip }: Address) => {
    const parts: string[] = []
    if (street !== 'n/a') { parts.push(`${street} ${houseNumber}`) }
    // TODO use filter and a type guard function - https://stackoverflow.com/a/70927747/111794
    for (const x of [city, state, country]) {
        if (!x || x === 'n/a/') { continue }
        parts.push(x)
    }
    if (zip !== 0) { parts.push(`${zip}`) }
    return parts.join(', ')
}

const CardDetails = () => {
    const card = useLoaderData<CardResponse>()

    const addressDetails: [string | number | undefined, IconType, boolean, string, boolean][] = [
        [card.web, FaLink, true, '', true] as const,
        [card.email, FaAt, true, 'mailto', true],
        [formatAddress(card.address), FaMapMarkerAlt, false, '', false],
        [card.phone, FaPhone, true, 'tel', true],
        [card.bizNumber, FaHashtag, false, '', false]
    ]

    return (
        <Container size="md">
            <Flex {...flexProps1}>
                <ImageOrPlaceholder {...card.image} height={400} />
                <Stack flex="1" gap={10} h="100%">
                    <Title tt="uppercase" style={textStyle}>{card.title}</Title>
                    {
                        card.subtitle !== card.title &&
                        <Text fz="md" tt="uppercase" fw={500} c="dimmed" style={textStyle}>{card.subtitle}</Text>
                    }
                    <Text fs="italic" flex="1" style={textStyle}>{card.description}</Text>
                    <div>
                        {
                            addressDetails.map(([detail, Icon, isAnchor, prefix, forceLtr], index) => (
                                <ContactDetail {...{ detail, Icon, isAnchor, prefix, forceLtr }} key={index} />
                            ))
                        }
                    </div>
                </Stack>
            </Flex>
            <ActionsSection>
                <LikeActionButton likes={card.likes} cardId={card._id} />
                <OwnerActions cardId={card._id} ownerId={card.user_id} />
            </ActionsSection>
        </Container>
    )
}

export default CardDetails
