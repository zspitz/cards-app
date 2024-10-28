import { Anchor, Group, Text } from '@mantine/core'
import { IconBaseProps } from 'react-icons'

type Props = {
    detail: string | undefined | number,
    Icon: React.ComponentType<IconBaseProps>,
    isAnchor: boolean,
    prefix: string
}

const ContactDetail = ({ detail, Icon, isAnchor, prefix }: Props) => {
    const href =
        !isAnchor ? '' :
            prefix ? `${prefix}:${detail}` :
                `${detail}`

    return (
        <Group wrap="nowrap" gap={10} mt={5}>
            <Icon size="1rem" stroke="1.5" color="light-dark(var(--mantine-color-gray-6), var(--mantine-color-dark-2))" />
            {
                isAnchor ?
                    <Anchor fz="xs" c="dimmed" href={href}>{detail}</Anchor> :
                    <Text fz="xs" c="dimmed">{detail}</Text>
            }
        </Group>
    )
}

export default ContactDetail
