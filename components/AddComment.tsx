import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import AppText from './AppText';
import { settings } from '../misc/settings';
import { fullWidth } from '../features/news/AppImage';

type Props = {
    show: boolean;
    setShow: Function;
    title: string;
    children?: React.ReactElement<any, any> | React.ReactElement<any, any>[];
}

export const OverlayExample = ({ show, setShow, title, children }: Props) => {
    return (
        <Overlay isVisible={show} onBackdropPress={(() => { setShow(false) })}>
            <View style={styles.overlay}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <AppText bold size='lg'>{title}</AppText>
                    </View>
                    {children}
                </ScrollView>
            </View>
        </Overlay>
    );
};

const styles = StyleSheet.create({
    overlay: {
        padding: 14,
        position: 'relative',
        height: 0.5 * Dimensions.get('window').height,
        width: fullWidth - (4 * settings.paddingHorizontal),
    },
    scrollView: {
        flex: 1
    },
    header: {
        position: 'absolute'
    }
})


