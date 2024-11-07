import { StyleSheet } from "react-native";
import { Image, type ImageSource } from "expo-image";

type Props = {
    imgSource: ImageSource;
    selectedImage: string | undefined;
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    }
});

export default function ImageViewer({ imgSource, selectedImage } : Props) {
    const imageSource = selectedImage ? { uri : selectedImage } : imgSource 
    return <Image source={imageSource} style={styles.image}/>
}