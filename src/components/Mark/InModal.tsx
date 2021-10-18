import * as React from "react"
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  FocusOnce,
} from "baseui/modal"
import Mark from "./index"

export default function MarkInModal({ mark, onClose }) {
  const [isOpen, setIsOpen] = React.useState(!!mark)
  return (
    <Modal
      size="auto"
      onClose={() => {
        onClose()
        setIsOpen(false)
      }}
      isOpen={isOpen}
      unstable_ModalBackdropScroll
      overrides={{
        Dialog: {
          style: ({ $theme }) => ({
            height: "auto",
          }),
        },
      }}
    >
      <ModalHeader></ModalHeader>
      <ModalBody>
        <Mark mark={mark} isInModal />
      </ModalBody>
      <ModalFooter></ModalFooter>
    </Modal>
  )
}
