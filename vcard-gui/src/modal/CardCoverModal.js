import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import TriggerAPI from "../api/Api";
import './CardCoverModal.css';

function CardCoverModal(props) {

    const [searchTerm, setSearchTerm] = useState();
    const [results, setResults] = useState([]);

    let searchGiphy = () => {
        if(searchTerm) {
            TriggerAPI("giphy-service", "search", "POST", searchTerm)
            .then(res => res.json())
            .then(data => {
                if(data.error) {return null;}
                else setResults(data);
            })
            .catch(err => console.log(err));
        }
    }

    return (
        <>
            <Modal
                show={props.show}
                onHide={() => {
                    setResults([]);
                    props.handleClose();
                }}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                fullscreen={true}>
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Search and Choose Card Cover:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Start Typing..."
                                onChange={(e) => { setSearchTerm(e.target.value) }}/>
                        </Form.Group>
                    </Form>
                    <Button className="mt-3" onClick={searchGiphy}>Search</Button>
                    <div id="search-results">
                        {results && results.map((res, i) => {
                            return (
                                <iframe key={i} title={res.title} src={res.url} onClick={(e) => {
                                    props.updateCardCover(res.url);
                                }}></iframe>
                            );
                        })}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CardCoverModal;