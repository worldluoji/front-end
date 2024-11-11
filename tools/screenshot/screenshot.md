# screenshot
To capture a screenshot on the web and save it as an image, we'll use a third-party library called dom-to-image. It takes a screenshot of any DOM node and turns it into a vector (SVG) or raster (PNG or JPEG) image.

demo: 将imageRef.current对应的dom元素转为jpeg图片，并进行下载。
```js
try {
    const dataUrl = await domtoimage.toJpeg(imageRef.current, {
        quality: 0.95,
        width: 320,
        height: 440
    })
    let link = document.createElement('a');
    link.download = 'sticker-smash.jpeg';
    link.href = dataUrl;
    link.click();
} catch (e) {
    console.log(e);
}
```

imageRef.current就是对应dom节点:
```tsx
const imageRef = useRef<View>(null);

<View style={styles.imageContainer}>
    {/* the collapsable prop is set to false. This allows the <View> component to screenshot only of the background image and emoji sticker. */}
    <View ref={imageRef} collapsable={false}>
        <ImageViewer imgSource={PlaceHolderImage} selectedImage={selectedImage} />
        { pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> }
    </View>
</View>
```

https://github.com/tsayen/dom-to-image#readme