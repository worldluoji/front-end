
import { Button } from "antd"

import NiceModal, { createNiceModal } from "./NiceModal"

import useNiceModal from './useNiceModal'


const MyModal = createNiceModal("my-modal", () => {
  return (
    <NiceModal id="my-modal" rest={{title: "Nice Modal"}}>
      Hello NiceModal!
    </NiceModal>
  )
})

function ModalExample() {
  const modal = useNiceModal("my-modal");
  return (
    <>
      <Button type="primary" onClick={() => modal.show("")}>
        Show Modal
      </Button>
      <MyModal />
    </>
  )
}

export default ModalExample