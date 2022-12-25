import AuthService from '../auth/AuthService';
import UserService from '../auth/UserService';

let TriggerAPI = async (service, uri, method, content) => {
    let PORT = "9191"; // api-gateway PORT
    let SCHEME = window.location.protocol;
    let DOMAIN = window.location.hostname;
    let gatewayUri = "";
    let userId = UserService.isLoggedIn() ? JSON.parse(UserService.getUserDetails() || '{}')?.username : '';

    switch(service) {
        case "auth-service": gatewayUri = "/users-service/auth"; break;
        case "users-service": gatewayUri = "/users-service/api/v1"; break;
        case "giphy-service": gatewayUri = "/giphy-service/api/v1"; break;
        case "vcard-service": gatewayUri = "/vcard-service/api/v1"; break;
        default: gatewayUri = "";
    }

    let finalUrl = SCHEME + '//' + DOMAIN + ':' + PORT + gatewayUri + "/" + uri;
    console.log("Triggering ", finalUrl);

    try {
        const response = await fetch(finalUrl, {
            method: method,
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + AuthService.getToken(),
                'USER_ID': userId
            },
            body: JSON.stringify(content)
        })
        .catch(err => {
            console.error(err);
            alert("Something went wrong", "danger");
        });
        return response;
    } catch(error) {
        console.log("API Error ", error);
        if (error.includes("validateToken")) {
            UserService.logOutUser(true);
        } else {
            throw error;
        }
    }
}

export default TriggerAPI;