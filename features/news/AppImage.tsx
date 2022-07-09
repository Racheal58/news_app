import { View, Image, Dimensions, StyleSheet } from 'react-native';
import React from 'react';
import { settings } from '../../misc/settings';
export const fullWidth = Dimensions.get('window').width;

const AppImage = ({ image }: { image: string }) => {
  const processedImageString = image && /^blob/.test(image) ? image.split(":")[1] : image
  return (
    <View style={styles.imageView}>
      <Image source={{ uri: processedImageString }} style={[styles.image, styles.notFocused]} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: 'cover',
    width: (fullWidth - (settings.paddingHorizontal * 2)),
  },
  imageView: {},
  focused: {
    height: 260,
  },
  notFocused: {
    height: 200,
  }
});

export default AppImage;
