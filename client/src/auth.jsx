const Auth = {
    isAuthenticated: false,
    userDataTempStorage: null,
    userToken:null,
    authenticate() {
        this.isAuthenticated = true;
    },
    userTokenGet() {
        if (localStorage.getItem('usertoken') !== null && localStorage.getItem('usertoken') !== undefined && localStorage.getItem('usertoken') !== "") {
            this.userToken= localStorage.getItem('usertoken');
            return localStorage.getItem('usertoken');
        } else {
            return this.userToken;
        }
    },
    haveToken() {
        if (localStorage.getItem('usertoken') !== null && localStorage.getItem('usertoken') !== undefined && localStorage.getItem('usertoken') !== "") {
            return true;
        } else {
            return false;
        }
    },
    signout() {
    this.isAuthenticated = false;
    },
    getAuth() {
        return this.isAuthenticated;
    }
};

export default Auth;