// import { createApp } from 'vue'
import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';

const monacoEditor = monaco.editor.create(document.getElementById('monaco'),{
    value:`console.log("hello,world")`,
    language:"javascript",
    theme: 'vs-dark'
})

// // 初始化编辑器的值 
// monacoEditor.setValue(`{"key":"value"}`) 

// 获取件编辑器的值 
monacoEditor.getValue(); 

// 销毁
// monacoEditor.dispose();