import { View, StyleSheet } from "react-native";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#25292e',
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    /*
     flex: 1 / 3：这里的 flex-grow 1 / 3 实际上会被计算为 0.3333...。这意味着 footerContainer 将占据其父容器高度的约1/3。
     在React Native中，View 组件的默认 flexDirection 是 column
    */
    flex: 1 / 3,
    alignItems: 'center',
  }
})

const PlaceHolderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={ styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceHolderImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" theme="primary" onPress={ pickImageAsync }/>
        <Button label="Use this photo" />
      </View>
    </View>
  );
}
