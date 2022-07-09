import React from 'react'
import AppText from './AppText'

export const NewsTopicText = ({ children }: { children: string }) => {
    return (
        <AppText bold lineHeight={32} size="lg">
            {children}
        </AppText>
    )
}
