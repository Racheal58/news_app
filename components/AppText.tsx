import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

type Props = {
    children: string;
    lineHeight?: number,
    size?: "xl" | "lg" | "md" | "sm"
    color?: 'primary' | 'secondary'
    bold?: boolean
}

const AppText = ({ children, lineHeight, size, color, bold }: Props) => {
    // generate size based on input size
    const generatedSize = !size ? 15 : size === 'xl' ? 24 : size === 'lg' ? 20 : size === 'md' ? 16 : 12;
    const generatedColor = !color ? "#333" : color === 'primary' ? "#333" : color === "secondary" ? "#666" : '#333'
    return (
        <Text style={{ lineHeight: lineHeight || 24, fontSize: generatedSize, color: generatedColor, fontWeight: bold ? "500" : 'normal' }}>{children}</Text>
    )
}

export default AppText