import { Form, View, Switch, Button, CommonEventFunction } from '@tarojs/components'
import './form.scss'

const formSubmit: CommonEventFunction = (e) => {
  console.log('submit', e)
}

const formReset: CommonEventFunction = (e) => {
  console.log('reset', e)
}

export default function FormDemo() {
  return (
    <Form onSubmit={formSubmit} onReset={formReset} >
      <View className='example-body'>
        <Switch name='switch' className='form-switch'></Switch>
      </View>
      <Button className='btn-max-w' plain type='primary' formType='submit'>提交</Button>
      <Button className='btn-max-w' type='primary' formType='reset'>重置</Button>
    </Form>
  )
}
