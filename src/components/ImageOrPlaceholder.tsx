import { Box, Image, MantineStyleProps, Text } from '@mantine/core'
import placeholder from '/noun-image-broken-2279654 edited.svg'

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
            <Image src={placeholder} alt="Placeholder" h={height} w="auto" style={{
                filter: 'invert(50%)'
            }} />
            <Text pos="absolute" bottom={8} w="100%" c="gray" fz="8px" ta="center">
                image broken by shashank singh from <a href="https://thenounproject.com/icon/image-broken-2279654/" target="_blank" rel="noreferrer" title="image broken shashank singh" tabIndex={-1}>Noun Project</a> (CC BY 3.0)
            </Text>
        </Box>
    )
}

export default ImageOrPlaceholder
