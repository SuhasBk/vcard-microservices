import { useEffect, useState } from 'react';
import { Alert } from "react-bootstrap";
import './Alert.css';

let Alerts = (props) => {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, 5000);
    });

    return (
        <div id="alert-banner">
            <Alert variant={props.variant} show={visible} dismissible={true}>
                {props.variant === 'danger' && <Alert.Heading>Oh snap!</Alert.Heading>}
                {props.variant === 'success' && <Alert.Heading>Success!</Alert.Heading>}
                <p>
                    {props.message}
                </p>
            </Alert>
        </div>
    );
}

export default Alerts;