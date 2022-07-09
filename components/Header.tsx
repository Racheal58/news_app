import { Text } from '@rneui/base';
import React from 'react'
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { INavigationProps } from '../features/home/Home';
import { HeaderText } from './HeaderText';

type Props = {
    title: string;
    disableBackButton?: boolean;
} & INavigationProps

export const Header = ({ navigation, title, disableBackButton }: Props) => {
    return (
        <View style={styles.header}>
            {!disableBackButton && <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="chevron-back-outline" size={24} color="#f83297" />
                    <Text style={{ color: '#f83297' }}>Back</Text>
                </View>
            </TouchableWithoutFeedback>}
            <View style={styles.headerMain}>
                <HeaderText>{title}</HeaderText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    headerMain: {
        marginLeft: 20,
        justifyContent: 'center'
    },
    header: {
        marginVertical: 10,
        flexDirection: 'row',
    },
})