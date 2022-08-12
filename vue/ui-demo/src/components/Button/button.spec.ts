import Button from './Button.vue'
import { mount } from '@vue/test-utils'
// Vue 官方推荐的@vue/test-utils 库来测试组件的渲染
describe('按钮测试', () => {
  it('按钮能够显示文本', () => {
    const content = 'click me'
    const wrapper = mount(Button, {
      slots: {
        default: content
      }
    })
    expect(wrapper.text()).toBe(content)
  })
  it('通过size属性控制大小', () => {
    const size = 'small'
    const wrapper = mount(Button, {
      props: {
        size
      }
    })
    // size内部通过class控制
    expect(wrapper.classes()).toContain('el-button--small')
  })  

})