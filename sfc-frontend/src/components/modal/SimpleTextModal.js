import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const SimpleTextModal = ({ }) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
            trigger={<Button>Basic Modal</Button>}
        >
            <Header icon>
                <Icon name='archive' />
                Archive Old Messages
            </Header>
            <Modal.Content>
                <p>
                    Your inbox is getting full, would you like us to enable automatic
                    archiving of old messages?
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' inverted onClick={() => setOpen(false)}>
                    <Icon name='checkmark' /> OK
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default SimpleTextModal
