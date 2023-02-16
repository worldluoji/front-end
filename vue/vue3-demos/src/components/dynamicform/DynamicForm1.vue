
<template>
  <form class="dynamic-form" @submit="onSubmit">
    <div class="dynamic-form-title">{{ schema.title }}</div>
    <div
      class="dynamic-form-field"
      v-for="(field, index) in schema.fieldList"
      v-bind:key="index"
    >
      <div class="dynamic-form-label">{{ field.label }}：</div>
      <div v-if="field.fieldType === 'input'" class="dynamic-form-item">
        <input v-model="model[field.name]" />
      </div>
      <div v-else-if="field.fieldType === 'radio'" class="dynamic-form-item">
        <span
          v-for="(option, index) in field.options"
          v-bind:key="index"
          class="dynamic-form-option"
        >
          <input
            type="radio"
            :id="option.value"
            :name="field.name"
            :value="option.value"
            :checked="model[field.name] === option.value"
            @change="
              onRadioChange({ fieldName: field.name, value: option.value })
            "
          />
          <label :for="option.value">{{ option.name }}</label>
        </span>
      </div>
      <div v-else class="dynamic-form-item"></div>
    </div>
    <div>
      <button class="dynamic-form-btn" type="submit">提交</button>
    </div>
  </form>
</template>
  
<script setup lang="ts">
  import { reactive } from 'vue';
  
  // 实际schema通过编排得到，或者通过后端实体得到
  const schema = {
    title: '普通用户信息',
    fieldList: [
      {
        label: '用户名称',
        name: 'usename',
        fieldType: 'input'
      },
      {
        label: '手机号码',
        name: 'phone',
        fieldType: 'input'
      },
      {
        label: '收货地址',
        name: 'address',
        fieldType: 'input'
      },
      { label: '优惠服务', name: 'service', fieldType: 'radio', options: [ { name: '免运费', value: 'service001' }, { name: '9折优惠', value: 'service002' }, { name: '满80减10', value: 'service003' } ] },
    ]
  };
  
  const model = reactive<{ [key: string]: unknown }>({});
  schema.fieldList.forEach((field) => {
    model[field.name] = '';
  });
  
  const onRadioChange = (data: { fieldName: string; value: string }) => {
    model[data.fieldName] = data.value;
  };
  
  const onSubmit = (e: Event) => {
    e.preventDefault();
    window.alert(JSON.stringify(model));
  };
</script>