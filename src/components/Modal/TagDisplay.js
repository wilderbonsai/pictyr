import React from 'react'
import Masonry from 'components/Masonry'
import { Label, Modal } from 'semantic-ui-react'
const TagDisplay = ({tags, modalOpen, onClose, headerText}) => {
  return (
      <Modal basic size="tiny" open={modalOpen} onClose={onClose} closeIcon>
        <Modal.Header>
          {headerText}
        </Modal.Header>
        <Modal.Content>
          { tags.map(tag => <Label basic>
            {tag}
          </Label>)}
        </Modal.Content>

      </Modal>
  )
}

export default TagDisplay