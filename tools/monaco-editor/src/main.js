// import { createApp } from 'vue'
import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')

// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.main.js';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

// Add additional d.ts files to the JavaScript language service and change.
// Also change the default compilation options.
// The sample below shows how a class Facts is declared and introduced
// to the system and how the compiler is told to use ES6 (target=2).

// validation settings
monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
	noSemanticValidation: false,
	noSyntaxValidation: false
});

// compiler options
monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
	target: monaco.languages.typescript.ScriptTarget.ES6,
	allowNonTsExtensions: true
});

// When resolving definitions and references, the editor will try to use created models.
// Creating a model for the library allows "peek definition/references" commands to work with the library.

var jsCode = [
	'"use strict";',
	'',
	'class Chuck {',
	'    greet() {',
    '        const a = 3;',
	'        return a;',
	'    }',
	'}'
].join('\n');

const JSModel = monaco.editor.createModel(jsCode, 'javascript', monaco.Uri.parse('ts:filename/facts.d.ts'));


monaco.editor.create(document.getElementById('monaco'), {
	model: JSModel,
	tabSize: 2,
	automaticLayout: true,
	scrollBeyondLastLine: true,
	formatOnType: true,
	formatOnPaste: true,
});


// // 初始化编辑器的值 
// monacoEditor.setValue(`{"key":"value"}`) 

// 获取件编辑器的值 
// monacoEditor.getValue(); 

// 销毁
// monacoEditor.dispose();