import { Container, Flex, FlexProps, MantineStyleProp, Stack, Text, Title } from '@mantine/core'
import { CardResponse, Address } from '../types'
import ImageOrPlaceholder from '../components/ImageOrPlaceholder'
import { useLoaderData } from 'react-router-dom'
import { FaAt, FaPhone, FaLink, FaHashtag } from 'react-icons/fa6'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IconType } from 'react-icons'
import ContactDetail from '../components/ContactDetail'

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
    const card = useLoaderData() as CardResponse

    const addressDetails: [string | number | undefined, IconType, boolean, string][] = [
        [card.web, FaLink, true, ''] as const,
        [card.email, FaAt, true, 'mailto'],
        [formatAddress(card.address), FaMapMarkerAlt, false, ''],
        [card.phone, FaPhone, true, 'tel'],
        [card.bizNumber, FaHashtag, false, '']
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
                            addressDetails.map(([detail, Icon, isAnchor, prefix], index) => (
                                <ContactDetail {...{ detail, Icon, isAnchor, prefix }} key={index} />
                            ))
                        }
                    </div>
                </Stack>
            </Flex>
        </Container>
    )
}

export default CardDetails
