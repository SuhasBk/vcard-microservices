let AuthService = {
    getToken: () => { return localStorage.getItem("vcard-jwt-token"); },
    setToken: (token) => { localStorage.setItem("vcard-jwt-token", token); },
    clearToken: () => { localStorage.removeItem("vcard-jwt-token"); }
};

export default AuthService;