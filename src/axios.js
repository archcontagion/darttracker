import Axios from 'axios';
import Cookies from 'js-cookie';

let packagejson = require("../package.json");


const axiosInstance = Axios.create({
	baseURL: packagejson.api_url,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
        "X-CSRF-TOKEN" : Cookies.get('XSRF-TOKEN')
	},
});

// Request interceptor. Runs before your request reaches the server
const onRequest = (config) => {
    // If http method is `post | put | delete` and XSRF-TOKEN cookie is 
    // not present, call '/sanctum/csrf-cookie' to set CSRF token, then 
    // proceed with the initial response
    if (config.method !== 'get' && !Cookies.get('XSRF-TOKEN')) {
        return setCSRFToken()
            .then(response => config);
    }
    return config;
}

// A function that calls '/api/csrf-cookie' to set the CSRF cookies. The 
// default is 'sanctum/csrf-cookie' but you can configure it to be anything.
const setCSRFToken = () => {
    return axiosInstance.get('sanctum/csrf-cookie'); // resolves to '/api/csrf-cookie'.
}

// attach your interceptor
axiosInstance.interceptors.request.use(onRequest, null);

export default axiosInstance;