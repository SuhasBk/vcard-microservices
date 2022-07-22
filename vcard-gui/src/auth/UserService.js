import TriggerAPI from "../api/Api";
import AuthService from "./AuthService";

let UserService = {
    loginUser: (username, token, callbackFn) => {
        UserService.logOutUser();
        AuthService.setToken(token);
        TriggerAPI("users-service", "getUser", "POST",
        {
            username: username
        })
        .then(response => response.json())
        .then(data => {
            console.log("user logged in:", data);
            sessionStorage.setItem(AuthService.getToken(), JSON.stringify({
                id: data.id,
                username: data.username,
                name: data.name,
                email: data.email
            }));
            if(callbackFn) {
                callbackFn();
            }
        })
    },
    logOutUser: (redirect=false) => {
        if (UserService.isLoggedIn()) {
            sessionStorage.removeItem(AuthService.getToken());
            AuthService.clearToken();
            if(redirect) {
                window.location.href = "/signin";
            }
        }
    },
    getUserDetails: () => {
        if(UserService.isLoggedIn()) {
            return sessionStorage.getItem(AuthService.getToken());
        } else {
            return null;
        }
    },
    isLoggedIn: () => {
        return AuthService.getToken() != null;
    },
    updateUser: () => {
        
    }
};

export default UserService;