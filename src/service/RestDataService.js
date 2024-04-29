import axios from 'axios';

let centralUrl = "http://192.168.69.5:8810/qbftecn/rest/" //"https://vpn.woermannbrock.com:8841/PDTLicn/rest/";
let branchUrl = "http://192.168.69.5:8810/qbftebr/rest/" //"https://vpn.woermannbrock.com:8811/PDTLibr/rest/";
let Url = "";

let systemUrl = "sys/";
let acrUrl = "acr/";

//expose a public enum for value for central and branch
export const Server = {
    CENTRAL: "central",
    BRANCH: "branch"
}


let useSource = "";
let dataRes = [];
let errorMessage = "";
const headers = {
    "Authorization": 'Basic cmVzdHVzZXI6cGFzc3dvcmQ=',
    "Accept": 'application/json',
    "Content-Type": 'application/json'
};

export const restCentral = axios.create({
    baseURL: centralUrl,
    headers: headers

})

export const restBranch = axios.create({
    baseURL: branchUrl,
    headers: headers

})



export const restSystem = axios.create({
    baseURL: systemUrl,
    headers: headers

})

export let restService = "";

export default class RestService {


    getData(server, source, api) {
        switch (server) {
            case "central":
                Url = centralUrl;
                break;
            case "branch":
                Url = branchUrl;
                break;
            default:
                Url = centralUrl;
        }

        Url = Url + source;

        restService = new axios.create({ baseURL: Url, headers: headers })

        return restService.get(api).then((d) => d.data);

    }
    //deleteData
    postData(server, source, api, formData, customConfig) {


        switch (server) {
            case "central":
                Url = centralUrl;
                break;
            case "branch":
                Url = branchUrl;
                break;
            default:
                Url = centralUrl;
        }

        Url = Url + source;

        restService = new axios.create({ baseURL: Url, headers: headers })

        return restService.post(api, formData, customConfig).then((d) => d.data).catch(error => {
            //console.log(error);
            //errorMessage = error.response.data;
            //console.log(errorMessage);
            throw new Error(error);

        })


        /*  if(source == "central") 
         {
             return restCentral.post(api, formData, customConfig).then((d) => d.data);
         } else 
         {
             return restBranch.post(api, formData, customConfig).then((d) => d.data);
         }     */
    }

    putData(server, source, api, formData, customConfig) {

        switch (server) {
            case "central":
                Url = centralUrl;
                break;
            case "branch":
                Url = branchUrl;
                break;
            default:
                Url = centralUrl;
        }

        Url = Url + source;

        restService = new axios.create({ baseURL: Url, headers: headers })

        return restService.put(api, formData, customConfig).then((d) => d.data).catch(error => {

            throw new Error(error);

        })



    }

    getNextNum() {




    }

}