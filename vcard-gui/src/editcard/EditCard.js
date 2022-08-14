import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../auth/UserService";

export default function EditCard() {

    let user = null;
    const location = useLocation();
    let navigator = useNavigate();

    if (UserService.getUserDetails() != null) {
        user = JSON.parse(UserService.getUserDetails());
    }

    useEffect(() => {
        if(location.state?.cardId) {
            let cardId = location.state.cardId;
            console.log(user, cardId);
        } else {
            navigator("/dashboard");
        }
    });

    return (
        <>
            <h1>Edit card</h1>
        </>
    );
}