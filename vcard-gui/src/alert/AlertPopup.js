import { Alert } from 'react-bootstrap';
import useAlert from './useAlert';
import './Alert.css';

function AlertPopup() {
    const { text, type } = useAlert();

    if( type && text ) {
        return (
            <div id="alert-banner">
                <Alert variant={type}>
                    {type === 'danger' && <Alert.Heading>Oh snap!</Alert.Heading>}
                    {type === 'success' && <Alert.Heading>Success!</Alert.Heading>}
                    <p>
                        {text}
                    </p>
                </Alert>
            </div>
        );
    }
}

export default AlertPopup;