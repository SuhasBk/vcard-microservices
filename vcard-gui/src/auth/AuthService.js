let AuthService = {
    getToken: () => { return sessionStorage.getItem("vcard-jwt-token"); },
    setToken: (token) => { sessionStorage.setItem("vcard-jwt-token", token); },
    clearToken: () => { sessionStorage.removeItem("vcard-jwt-token"); }
};

export default AuthService;