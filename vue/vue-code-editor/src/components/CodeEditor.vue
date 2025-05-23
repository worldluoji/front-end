<template>
  <div :class="`magic-code-editor`">
    <Teleport to="body" :disabled="!fullScreen">
      <div
        :class="`magic-code-editor-wrapper${fullScreen ? ' full-screen' : ''}`"
        :style="!fullScreen && height ? `height: ${height}` : '100%'"
      >
        <button class="magic-code-editor-full-screen-icon" @click="fullScreenHandler">
          full
        </button>
        <div ref="codeEditor" class="magic-code-editor-content"></div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue';
import { throttle } from 'lodash-es';

import monaco from './monaco-editor.ts';

defineOptions({
  name: 'MEditorCodeEditor',
});

const props = withDefaults(
  defineProps<{
    initValues?: any;
    modifiedValues?: any;
    type?: 'diff';
    language?: string;
    options?: {
      [key: string]: any;
    };
    height?: string;
    autoSave?: boolean;
    parse?: boolean;
  }>(),
  {
    initValues: '',
    autoSave: true,
    language: 'javascript',
    options: () => ({
      tabSize: 2,
    }),
    parse: false,
  },
);

const emit = defineEmits(['initd', 'save']);

const toString = (v: string | any, language: string): string => {
  let value = '';
  if (typeof v !== 'string') {
    if (language === 'json') {
      value = JSON.stringify(v, null, 2);
    } else {
      // value = serialize(v, {
      //   space: 2,
      //   unsafe: true,
      // }).replace(/"(\w+)":\s/g, '$1: ');
      console.log('???', typeof v, v);
    }
  } else {
    value = v;
  }
  if (language === 'javascript' && value.startsWith('{') && value.endsWith('}')) {
    value = `(${value})`;
  }
  return value;
};

const parseCode = (v: string | any, language: string): any => {
  if (typeof v !== 'string') {
    return v;
  }

  if (language === 'json') {
    return JSON.parse(v);
  }

  // 这里可以处理其它语言

  return null;
};

let vsEditor: monaco.editor.IStandaloneCodeEditor | null = null;
let vsDiffEditor: monaco.editor.IStandaloneDiffEditor | null = null;

const values = ref('');
const loading = ref(false);
const codeEditor = useTemplateRef<HTMLDivElement>('codeEditor');

const resizeObserver = new globalThis.ResizeObserver(
  throttle((): void => {
    vsEditor?.layout();
    vsDiffEditor?.layout();
  }, 300),
);

const setEditorValue = (v: string | any, m: string | any) => {
  values.value = toString(v, props.language.toLocaleLowerCase());

  if (props.type === 'diff') {
    const originalModel = monaco.editor.createModel(values.value, 'text/javascript');
    const modifiedModel = monaco.editor.createModel(toString(m, props.language), 'text/javascript');

    return vsDiffEditor?.setModel({
      original: originalModel,
      modified: modifiedModel,
    });
  }

  return vsEditor?.setValue(values.value);
};

const getEditorValue = () =>
  (props.type === 'diff' ? vsDiffEditor?.getModifiedEditor().getValue() : vsEditor?.getValue()) || '';

const init = async () => {
  if (!codeEditor.value) return;

  const options = {
    value: values.value,
    language: props.language,
    theme: 'vs-dark',
    ...props.options,
  };

  if (props.type === 'diff') {
    vsDiffEditor = monaco.editor.createDiffEditor(codeEditor.value, options);
  } else {
    vsEditor = monaco.editor.create(codeEditor.value, options);
  }

  setEditorValue(props.initValues, props.modifiedValues);

  loading.value = false;

  emit('initd', vsEditor);

  codeEditor.value.addEventListener('keydown', (e) => {
    if (e.keyCode === 83 && (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
      e.stopPropagation();
      const newValue = getEditorValue();
      values.value = newValue;
      emit('save', props.parse ? parseCode(newValue, props.language) : newValue);
    }
  });

  if (props.type !== 'diff' && props.autoSave) {
    vsEditor?.onDidBlurEditorWidget(() => {
      const newValue = getEditorValue();
      if (values.value !== newValue) {
        values.value = newValue;
        emit('save', props.parse ? parseCode(newValue, props.language) : newValue);
      }
    });
  }

  resizeObserver.observe(codeEditor.value);
};

watch(
  () => props.initValues,
  (v, preV) => {
    if (v !== preV) {
      setEditorValue(props.initValues, props.modifiedValues);
    }
  },
  {
    deep: true,
    immediate: true,
  },
);

onMounted(async () => {
  loading.value = true;

  init();
});

onBeforeUnmount(() => {
  resizeObserver.disconnect();
});

const fullScreen = ref(false);
const fullScreenHandler = () => {
  fullScreen.value = !fullScreen.value;
  setTimeout(() => {
    vsEditor?.focus();
    vsEditor?.layout();
    vsDiffEditor?.focus();
    vsDiffEditor?.layout();
  });
};

defineExpose({
  values,

  getEditor() {
    return vsEditor || vsDiffEditor;
  },

  getVsEditor() {
    return vsEditor;
  },

  getVsDiffEditor() {
    return vsDiffEditor;
  },

  setEditorValue,
  getEditorValue,

  focus() {
    vsEditor?.focus();
    vsDiffEditor?.focus();
  },
});
</script>

<style scoped>
.magic-code-editor {
  width: 100%;
  height: 100%;
}

.magic-code-editor-wrapper {
  width: 100%;
  height: 100%;
  position: relative;

  &.full-screen {
    position: fixed;
    z-index: 10000;
    top: 0;
    left: 0;
  }

  .magic-code-editor-content {
    width: 100%;
    height: 100%;

    .margin {
      margin: 0;
    }
  }

  .magic-code-editor-full-screen-icon {
    position: absolute;
    top: 5px;
    right: 0;
    z-index: 11;
  }
}

.m-container-vs-code {
  .el-form-item {
    margin-bottom: 0;
  }
}
</style>