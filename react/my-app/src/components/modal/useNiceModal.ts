import { useSelector, useDispatch } from 'react-redux'
import { useCallback } from 'react'
import { ModalStateType, ModalDispatchType } from './ModalStore'

// 使用 action creator 来创建显示和隐藏对话框的 action
function showModal(modalId: string, args: any) {
    return {
      type: "nice-modal/show",
      payload: {
        modalId,
        args,
      },
    }
}
  
function hideModal(modalId: string, force: boolean) {
    return {
        type: "nice-modal/hide",
        payload: {
        modalId,
        force,
        },
    }
}
  
// 创建自定义 Hook 用于处理对话框逻辑
const useNiceModal = (modalId: string) => {
    const dispatch: ModalDispatchType = useDispatch()

    // 封装 Redux action 用于显示对话框
    const show = useCallback((args: any) => {
      dispatch(showModal(modalId, args))
    }, [
      dispatch,
      modalId,
    ])

    // 封装 Redux action 用于隐藏对话框
    const hide = useCallback((force: boolean) => {
      dispatch(hideModal(modalId, force))
    }, [
      dispatch,
      modalId,
    ])
  
    const args = useSelector((s: ModalStateType) => s[modalId])
    const hiding = useSelector((s: ModalStateType) => s.hiding[modalId])
  
    // 只要有参数就认为对话框应该显示，如果没有传递 args，在reducer 中会使用, 默认值 true
    return { args, hiding, visible: !!args, show, hide }
}

export default useNiceModal