import { Group, Space } from '@mantine/core'
import type { PropsWithChildren } from 'react'

const ActionsSection = ({ children }: PropsWithChildren) => {

    return (
        <>
            <Space h="md" />
            <hr />
            <Space h="md" />
            <Group align="flex-start" gap={20}>
                {children}
            </Group>
        </>
    )
}

export default ActionsSection
