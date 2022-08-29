import axios from "axios";

let api_key = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OGJjMDM5YTZiMDAyOTdiMDNkMDdmNWY0Njc3MmNjMCIsInN1YiI6IjYzMGI2ZjYwNmU5MzhhMDA3YmYyN2YyMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LEAQFyiDZlRCuyLJM3gO2U1L0Ehr830k9jaIMQU1kZY"

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';

axios.defaults.baseURL = "https://api.themoviedb.org/3/movie";

axios.interceptors.request.use(config => { 	
  	config.headers['Authorization'] = "Bearer " + api_key;
	return config;
});

window.$axios = axios;