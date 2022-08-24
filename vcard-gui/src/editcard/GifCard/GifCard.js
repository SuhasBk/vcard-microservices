import { Button, Card, Col, FloatingLabel, Form } from "react-bootstrap";
import "./GifCard.css";

function GifCard(props) {

    return ( 
        <Col key={props.index}>
            <Card>
                <Card.Header>
                    {props.gifCard.gif.url 
                    ?
                    <iframe 
                        id={`gif-card-${props.index}`} 
                        title={props.gifCard.gif.url} 
                        src={props.gifCard.gif.url}/>
                    :
                    <iframe 
                        id={`gif-card-${props.index}`} 
                        title={props.gifCard.gif.url} 
                        srcDoc={"click on 'Edit GIF' to add cover GIF here..."}
                        src=""/>
                    }
                </Card.Header>
                <Card.Body>
                    <FloatingLabel controlId="floatingTextarea2" label="Comments">
                        <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            defaultValue={props.gifCard.text || ""}
                            onChange={(e) => props.updateCardComment(props.index, e.target.value)}
                        />
                    </FloatingLabel>
                </Card.Body>
                <Card.Footer>
                    <Button variant="dark" size="sm" onClick={() => props.searchCardCovers(props.index)}>Edit GIF</Button>
                    <Button variant="danger" size="sm" onClick={() => props.deleteCard(props.index)}>Delete</Button>
                </Card.Footer>
            </Card>
        </Col>
    );
}

export default GifCard;