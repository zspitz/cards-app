import { Container, Flex, FlexProps, MantineStyleProp, Stack, Text, Title } from '@mantine/core'
import { CardResponse } from '../types'
import ImageOrPlaceholder from '../components/ImageOrPlaceholder'
import { useLoaderData } from 'react-router-dom'

const flexProps1: FlexProps = {
    direction: { base: 'column', sm: 'row-reverse' },
    gap: 15
}

const textStyle: MantineStyleProp = {
    textWrap: 'nowrap',
    whiteSpace: 'pre-line'
}

const CardDetails = () => {
    const card = useLoaderData() as CardResponse
    return (
        <Container size="md">
            <Flex {...flexProps1}>
                <ImageOrPlaceholder {...card.image} height={400} />
                <Stack flex="1" gap={25} h="100%">
                    <Title style={textStyle}>{card.title}</Title>
                    <Title order={2} style={textStyle}>{card.subtitle}</Title>
                    <Text flex="1" style={textStyle}>{card.description}</Text>
                </Stack>
            </Flex>
        </Container>
    )
}

export default CardDetails
