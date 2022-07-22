import { Navigate } from "react-router-dom";

const Protected = ({ isLoggedIn, children }) => {
    
    if (!isLoggedIn) {
        return <Navigate to="/signin" replace state={{error: "Login First!"}}/>;
    }
    return children;
};
export default Protected;