import axios from 'axios'


const Api = axios.create({
    withCredentials: true,
    // baseURL: "http://localhost:54806/",
    baseURL: "https://sie.atrbpn.go.id/api/",

    //set header axios
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    mode: 'no-cors'
});

export default Api