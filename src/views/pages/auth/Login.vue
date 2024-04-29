<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed, onErrorCaptured } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import router from '../../../router';
import RestService from "@/service/RestDataService";
import { useToast } from 'primevue/usetoast';

const restService = new RestService();

const toast = useToast();
const { layoutConfig } = useLayout();
const userId = ref('');
const password = ref('');
const checked = ref(false);
const loginSuccess = ref(true);
const messages = ref([]);
let count = ref(0);
const errorMessage = ref('');

let restData = ref([]);

const userInformation = ref({
    "userID": "",
    "Name": "",
    "Surname": "",
    "Email": ""
})

const onLoginClick = () => {

    loginUser();
}

const loginUser = () => {



    const formData = '{"request": {"userLogin": {"userLogin": [{"userID": "' + userId.value + '","userPassword": "' + btoa(password.value) + '"}]}}}';
    const headers = {};



    restService.postData("central", "CentralServerService", "user/loginUser", formData, headers).then((res) => {
        //console.log(res);
        try {
            restData = res.response.userLogin.userLogin;
            if (restData[0].responseStatus == true) {
                addSuccessMessage();
                getUserData();
                sessionStorage.setItem("SessionID", btoa(restData[0].userPassword));
                sessionStorage.setItem("UserInformation", JSON.stringify(restData[0]));
                //navigate to the dashboard page         

                router.push({ name: 'dashboard' });


            } else {
                addErrorMessage('Incorrect login details supplied');
                sessionStorage.removeItem("SessionID");
            }

        } catch (error) {
            throw new Error(error);
        }






    }
    ).catch((error) => {
        messages.value = [];
        messages.value = [{ severity: 'error', content: error.message, id: count.value++ }];
    })
        ;



}

const onEnter = (event) => {
    if (event.key === 'Enter') {
        loginUser();
    }
}


const addErrorMessage = (value) => {
    messages.value = [];
    messages.value = [
        { severity: 'error', content: value, id: count.value++ }
    ];
};


const addSuccessMessage = () => {
    messages.value = [];
    messages.value = [
        { severity: 'success', content: 'Login Successful', id: count.value++ }

    ];
};



const onForgotPasswordClick = () => {
    //navigate to the forgot password page
    router.push({ name: 'forgotpassword' });
}

const getUserData = () => {
    restService.getData("central", "CentralServerService", "user/getUserData?ipUserId=" + userId.value)
        .then((res) => {
            sessionStorage.setItem("User", JSON.stringify(res.response.phds['ds-sys-user']['tt-sys-user'][0]));
        })
        .catch((error) => { addErrorMessage(error); });;
}

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

onErrorCaptured((err) => {


    messages.value = [];
    messages.value = [
        { severity: 'error', content: err.message, id: count.value++ }

    ];

    return false;
});

</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Woermann Brock Logo" class="mb-5 w-6rem flex-shrink-0" />
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, red 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/layout/images/avatar.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Welcome!</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>

                    <div>

                        <div class="grid p-fluid">
                            <div class="col-12 md:col-12">
                                <div class="p-inputgroup">
                                    <span class="p-inputgroup-addon">
                                        <i class="pi pi-user"></i>
                                    </span>
                                    <InputText id="userid1" type="text" placeholder="Username" v-model="userId"
                                        @keyup.enter="onEnter" />

                                </div>
                            </div>
                            <div class="col-12 md:col-12">
                                <div class="p-inputgroup">
                                    <span class="p-inputgroup-addon">
                                        <i class="pi pi-key"></i>
                                    </span>
                                    <Password id="password1" v-model="password" placeholder="Password" :feedback="false"
                                        inputClass="w-full" @keyup.enter="onEnter"></Password>

                                </div>
                            </div>

                        </div>

                        <!--   <label for="userid1" class="block text-900 text-xl font-medium mb-2">Username</label>
                        <InputText id="userid1" type="text" placeholder="Username" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="userId" @keyup.enter="onEnter"/>

                        <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :feedback="false" class="w-full mb-3" inputClass="w-full" @keyup.enter="onEnter"></Password>
 -->
                        <div class="flex align-items-center justify-content-between mb-5 gap-5">
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer"
                                style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button label="Sign In" class="w-full p-3 text-xl" @click="onLoginClick()"
                            @keyup.enter="onEnter"></Button>
                        <transition-group name="p-message" tag="div">
                            <Message v-for="msg of messages" :key="msg.id" :severity="msg.severity">{{ msg.content }}
                            </Message>
                        </transition-group>


                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>