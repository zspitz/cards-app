import { Anchor, Group, Text } from '@mantine/core'
import { IconBaseProps } from 'react-icons'

type Props = {
    detail: string | undefined | number,
    Icon: React.ComponentType<IconBaseProps>,
    isAnchor: boolean,
    prefix: string,
    forceLtr: boolean
}

const ContactDetail = ({ detail, Icon, isAnchor, prefix, forceLtr }: Props) => {
    const href =
        !isAnchor ? '' :
            prefix ? `${prefix}:${detail}` :
                `${detail}`
    const textStyle =
        !forceLtr ? undefined : {
            direction: 'ltr' as const
        }

    return (
        <Group wrap="nowrap" gap={10} mt={5}>
            <Icon size="1rem" stroke="1.5" color="light-dark(var(--mantine-color-gray-6), var(--mantine-color-dark-2))" />
            {
                isAnchor ?
                    <Anchor fz="xs" c="dimmed" href={href} style={textStyle}>{detail}</Anchor> :
                    <Text fz="xs" c="dimmed" style={textStyle}>{detail}</Text>
            }
        </Group>
    )
}

export default ContactDetail
