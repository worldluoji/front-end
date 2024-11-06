import { View, StyleSheet } from "react-native";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";

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
  return (
    <View style={ styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={ PlaceHolderImage } />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" theme="primary" />
        <Button label="Use this photo" />
      </View>
    </View>
  );
}
