import Tesseract from "tesseract.js";
Tesseract.recognize(
    './image_with_words.awebp',
    'eng' // 识别英文
).then(({data: text}) => {
    console.log(text);
}).catch(e => {
    console.error(e);
})