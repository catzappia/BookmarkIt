import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface MyVerticallyCenteredModalProps {
    show: boolean;
    title: string;
    description: string;
    link: string;
    onHide: () => void;
}

function MyVerticallyCenteredModal(props: MyVerticallyCenteredModalProps) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    BookmarkIt for Later!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Book Description:</h4>
                <p>{props.description}</p>
                <h4>Where to Buy:</h4>
                <a href={props.link} target="_blank" rel="noopener noreferrer">{props.link}</a>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyVerticallyCenteredModal;