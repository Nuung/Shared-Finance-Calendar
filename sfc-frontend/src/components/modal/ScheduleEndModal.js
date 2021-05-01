import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

const exampleReducer = (state, action) => {
    switch (action.type) {
        case 'close':
            return { open: false }
        case 'open':
            return { open: true, size: action.size }
        default:
            throw new Error('Unsupported action...')
    }
}

const ScheduleEndModal = () => {
    const [state, dispatch] = React.useReducer(exampleReducer, {
        open: false
    });
    const { open } = state;

    return (
        <div>
            <Button onClick={() => dispatch({ type: 'open' })}>
                Mini
          </Button>

            <Modal
                size='mini'
                open={open}
                onClose={() => dispatch({ type: 'close' })}
            >
                <Modal.Header>Delete Your Account</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete your account</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => dispatch({ type: 'close' })}>
                        No
              </Button>
                    <Button positive onClick={() => dispatch({ type: 'close' })}>
                        Yes
              </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default ScheduleEndModal