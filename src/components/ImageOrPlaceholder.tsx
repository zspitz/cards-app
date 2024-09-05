import { Box, Image, MantineStyleProps, Text } from '@mantine/core'

// Note that the 50% filter and the gray text works for both the dark and light themes.

type Props = {
    url: string | undefined,
    alt: string | undefined,
    height: MantineStyleProps['h']
}

const ImageOrPlaceholder = ({ url, alt, height }: Props) => {
    if (url) {
        return <Image src={url} alt={alt ?? ''} h={height} w="auto" />
    }

    return (
        <Box h={height} w="auto" pos="relative">
            <Image src="/noun-image-broken-2279654 edited.svg" alt="Placeholder" h={height} w="auto" style={{
                filter: 'invert(50%)'
            }} />
            <Text pos="absolute" bottom={8} w="100%" c="gray" fz="8px" ta="center">
                image broken by shashank singh from <a href="https://thenounproject.com/browse/icons/term/image-broken/" target="_blank" rel="noreferrer" title="image broken Icons">Noun Project</a> (CC BY 3.0)
            </Text>
        </Box>
    )
}

export default ImageOrPlaceholder
