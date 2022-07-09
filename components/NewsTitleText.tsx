import React from 'react'
import AppText from './AppText'

export const NewsTitleText = ({ children }: { children: string }) => {
    return (
        <AppText bold lineHeight={32} size="md">
            {children}
        </AppText>
    )
}
