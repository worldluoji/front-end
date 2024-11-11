# ImagePicker

### 图片选择

1. **react-native-image-picker**：
   - 这是一个非常流行的库，用于从相机或相册中选择图片。
   - 安装：
     ```bash
     npm install react-native-image-picker
     ```
   - 示例代码：
     ```jsx
     import React, { useState } from 'react';
     import { Button, Image, View } from 'react-native';
     import * as ImagePicker from 'react-native-image-picker';

     const App = () => {
         const [image, setImage] = useState(null);

         const pickImage = () => {
             ImagePicker.launchImageLibrary({}, (response) => {
                 if (response.didCancel) {
                     console.log('User cancelled image picker');
                 } else if (response.error) {
                     console.log('ImagePicker Error: ', response.error);
                 } else if (response.customButton) {
                     console.log('User tapped custom button: ', response.customButton);
                 } else {
                     setImage(response.uri);
                 }
             });
         };

         return (
             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                 <Button title="Pick an image" onPress={pickImage} />
                 {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
             </View>
         );
     };

     export default App;
     ```


