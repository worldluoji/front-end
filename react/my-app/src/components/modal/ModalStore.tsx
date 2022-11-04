import { Action } from './types'
import { configureStore } from '@reduxjs/toolkit'

export interface ModalStateType {
    [key: string]: any,
    hiding: {
        [key: string]: any
    }
}

let defaultState: ModalStateType = { hiding: {} }

/*
这段代码的主要思路就是通过 Redux 的 store 去存储每个对话框状态和参数。
在这里，我们设计了两个 action ，分别用来显示和隐藏对话框。
特别要注意的是，这里我们加入了 hiding 这样一个状态，用来处理对话框关闭过程的动画，确保用户体验。
*/
const modalReducer = (state = defaultState, action: Action) => {
    const { modalId, args, force } = action.payload
    switch (action.type) {
      case "nice-modal/show":
        return {
          ...state,
          // 如果存在 modalId 对应的状态，就显示这个对话框
          [modalId]: args || true,
          // 定义一个 hiding 状态用于处理对话框关闭动画
          hiding: {
            ...state.hiding,
            [modalId]: false,
          },
        }
      case "nice-modal/hide":
        // 只有 force 时才真正移除对话框
        return action.payload.force
          ? {
              ...state,
              [modalId]: false,
              hiding: { [modalId]: false },
            }
          : { ...state, hiding: { [modalId]: true } }
      default:
        return state
    }
}

const modalStore = configureStore({
    reducer: modalReducer
})

export type ModalDispatchType = typeof modalStore.dispatch

export default modalStore