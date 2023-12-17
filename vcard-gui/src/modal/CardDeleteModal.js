import { Button, Modal } from "react-bootstrap";

function CardDeleteModal(props) {
    return (
        <Modal show={props.confirmDeleteModalShow} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Woah!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this card? Forever?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Nope
                </Button>
                <Button variant="danger" onClick={props.handleDelete}>
                    Yep
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CardDeleteModal;