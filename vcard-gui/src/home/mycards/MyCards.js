import { useEffect, useState } from "react";
import { Badge, Button, Card, CardGroup, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAlert from "../../alert/useAlert";
import TriggerAPI from "../../api/Api";
import UserService from "../../auth/UserService";
import './MyCards.css';
import CardDeleteModal from "../../modal/CardDeleteModal";

export default function MyCards(props) {

    const navigator = useNavigate();
    const [confirmDeleteModalShow, setConfirmDeleteModalShow] = useState(false);
    const [currentCardId, setCurrentCardId] = useState(-1);
    const [mycards, setMyCards] = useState([]); 
    const { setAlert } = useAlert();

    useEffect(() => {
        let user = props.user ? props.user : JSON.parse(UserService.getUserDetails());
        fetchMyCards(user);
    }, [props.user]);

    let fetchMyCards = (user) => {
        TriggerAPI("vcard-service", "getMyCards", "POST", user)
            .then(response => response.json())
            .then(data => {
                setMyCards(data);
            });
    }

    let editCard = (cardId) => {
        navigator("/editcard", { state: { cardId: cardId } });
    }

    let deleteCard = (cardId) => {
        TriggerAPI("vcard-service", "deleteCard", "DELETE", { cardId: cardId })
        .then(_ => {
            setAlert("Card deleted successfully!", "success");
            setMyCards(mycards.filter(card => card.cardId !== cardId));
        });
    }

    return (
        <div id="mycards">
            {mycards.length > 0 
            ?
            <CardGroup>
                <Row>
                    {mycards.map((cardDetails, index) =>
                    <Col key={index}>
                        <Card style={{ color: "black"}}>
                            <Card.Header>
                                <iframe title={cardDetails.cards[0]?.gif.title} src={cardDetails.cards[0]?.gif.url} />
                            </Card.Header>                        
                            <Card.Body>
                                <Card.Title>{cardDetails.title}</Card.Title>
                                <Card.Text>
                                    {cardDetails.cards[0]?.text || <Badge style={{textAlign: "center", width: "max-content"}} pill bg="dark">no comments</Badge>}
                                </Card.Text>
                                <Card.Footer className="card-footer">
                                        <Button onClick={() => editCard(cardDetails.cardId)} variant="primary"><small>Edit</small> ✍️</Button>
                                        <Button onClick={() => {
                                            setCurrentCardId(cardDetails.cardId); 
                                            setConfirmDeleteModalShow(true);}}variant="danger">
                                            <small>Delete</small>🗑
                                        </Button>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>)}
                </Row>
            </CardGroup>
            : 
            <Badge style={{textAlign: "center", width: "max-content"}} pill bg="info">You dont have any cards</Badge>}
            
            <CardDeleteModal 
            confirmDeleteModalShow={confirmDeleteModalShow} 
            handleClose={() => setConfirmDeleteModalShow(false)} 
            handleDelete={() => { deleteCard(currentCardId); setConfirmDeleteModalShow(false); }} />
        </div>
    );
}