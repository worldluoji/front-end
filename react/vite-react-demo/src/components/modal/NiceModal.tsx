import { Modal } from 'antd'
import { NidcelModalInParamType } from './types';
import useNiceModal from './useNiceModal'


// 实现 NiceModal 这样一个组件，去封装通用的对话框操作逻辑。比如关闭按钮，确定按钮的事件处理，等等
function NiceModal({ id, children, ...rest }: NidcelModalInParamType) {
  const modal = useNiceModal(id)
  return (
    <Modal
      onCancel={() => modal.hide(false)} // 默认点击 cancel 时关闭对话框
      onOk={() => modal.hide(false)} // 默认点击确定关闭对话框
      afterClose={() => modal.hide(true)} // 动画完成后真正关闭
      open={ !modal.hiding }
      { ...rest } // 允许在使用 NiceModal 时透传参数给实际的 Modal
    >
      { children }
    </Modal>
  )
}


export default NiceModal