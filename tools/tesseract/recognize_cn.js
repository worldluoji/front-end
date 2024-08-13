import Tesseract from "tesseract.js";
Tesseract.recognize(
    './image_cn.png',
    'chi_sim' // 识别英文
).then(({data: text}) => {
    console.log(text);
}).catch(e => {
    console.error(e);
})