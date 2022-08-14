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

    let giphyLookup = (search_term) => {
        setSearchTerm(search_term);
        if (search_term.length >= 3) {
            searchGiphy();
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
                                onChange={(e) => { giphyLookup(e.target.value) }}/>
                        </Form.Group>
                    </Form>
                    <Button className="mt-3" onClick={searchGiphy}>Search</Button>
                    <div id="search-results">
                        {results && results.map((gifObj, i) => {
                            return (
                                <span key={i}>
                                    <iframe title={gifObj.title} src={gifObj.url}></iframe>
                                    <Button onClick={() => props.updateCardCover(gifObj)} variant="secondary">Pick</Button>
                                </span>
                            );
                        })}
                    </div>
                </Modal.Body>
                <Modal.Footer>Powered by Giphy©</Modal.Footer>
            </Modal>
        </>
    );
}

export default CardCoverModal;