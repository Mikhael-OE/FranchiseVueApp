import { ref, computed, onMounted, onBeforeUnmount, VueElement } from 'vue';

let isAuthenticated = true;
let UserInformation = {};

export function isLoggedIn() {
    // console.log("isLoggedIn");
    isAuthenticated = false;
    UserInformation = JSON.parse(sessionStorage.getItem("UserInformation"));

    if (UserInformation != null) { if (btoa(UserInformation.userPassword) == sessionStorage.getItem("SessionID")) { isAuthenticated = true } }



    return isAuthenticated;
}