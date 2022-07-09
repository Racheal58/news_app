import React from 'react'
import AppText from './AppText'

export const HeaderText = ({ children }: { children: string }) => {
    return (
        <AppText bold size="md">
            {children}
        </AppText>
    )
}
