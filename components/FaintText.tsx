import React from 'react'
import AppText from './AppText'

export const FaintText = ({ children }: { children: string }) => {
    return (
        <AppText color="secondary" size="sm">
            {children}
        </AppText>
    )
}
