import { Button } from "antd"

import NiceModal, { createNiceModal } from "./NiceModal"

import useNiceModal from './useNiceModal'

import { Provider } from "react-redux"

import store from './ModalStore'


const MyModal = createNiceModal("my-modal", () => {
  return (
    <NiceModal id="my-modal" title="Nice Modal">
      Hello NiceModal!!!
      {/* 这里就是children */}
    </NiceModal>
  )
})

function ModalExample() {
  const modal = useNiceModal("my-modal");
  return (
    <>
      <Button type="primary" onClick={() => modal.show('')}>
        Show Modal
      </Button>
      <MyModal />
    </>
  )
}

export default () => {
  return (
    <Provider store={ store }>
      <h1>Nice Modal</h1>
      <ModalExample />
    </Provider>
  )
}
