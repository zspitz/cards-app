import { Anchor, Container, Flex, FlexProps, Group, MantineStyleProp, Stack, Text, Title } from '@mantine/core'
import { CardResponse, HasAddress } from '../types'
import ImageOrPlaceholder from '../components/ImageOrPlaceholder'
import { useLoaderData } from 'react-router-dom'
import { FaAt, FaPhone, FaLink, FaHashtag } from 'react-icons/fa6'
import { FaMapMarkerAlt } from 'react-icons/fa'

const flexProps1: FlexProps = {
    direction: { base: 'column', sm: 'row-reverse' },
    gap: 15
}

const textStyle: MantineStyleProp = {
    textWrap: 'nowrap',
    whiteSpace: 'pre-line'
}

const formatAddress = ({ address: { street, houseNumber, city, state, country, zip } }: HasAddress) => {
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
                        {/* TODO - replace with an array of objects instead of repetitive code. consider also making a separate component */}
                        <Group wrap="nowrap" gap={10} mt={5}>
                            <FaLink size="1rem" />
                            <Anchor fz="xs" c="dimmed" href={card.web}>{card.web}</Anchor>
                        </Group>

                        <Group wrap="nowrap" gap={10} mt={5}>
                            <FaAt size="1rem" />
                            <Anchor fz="xs" c="dimmed" href={`mailto:${card.email}`}>{card.email}</Anchor>
                        </Group>

                        <Group wrap="nowrap" gap={10} mt={5}>
                            <FaMapMarkerAlt size="1rem" />
                            <Text fz="xs" c="dimmed" tt="lowercase">{formatAddress(card)}</Text>
                        </Group>

                        <Group wrap="nowrap" gap={10} mt={5}>
                            <FaPhone size="1rem" />
                            <Anchor fz="xs" c="dimmed" href={`tel:${card.phone}`}>{card.phone}</Anchor>
                        </Group>

                        <Group wrap="nowrap" gap={10} mt={5}>
                            <FaHashtag size="1rem" />
                            <Text fz="xs" c="dimmed">{card.bizNumber}</Text>
                        </Group>

                    </div>
                </Stack>
            </Flex>
        </Container>
    )
}

export default CardDetails
