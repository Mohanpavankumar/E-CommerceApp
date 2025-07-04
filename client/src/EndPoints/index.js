const backendDomain = "http://localhost:8080"

const SummaryApi = {
    signUp: {
        url : `${backendDomain}/api/signup`,
        method : "post"
    },
    signIn: {
        url : `${backendDomain}/api/signin`,
        method : "post"
    },
    current_user: {
        url : `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout_user: {
        url : `${backendDomain}/api/userLogout`,
        method : "get"
    },
    allUser: {
        url : `${backendDomain}/api/all-users`,
        method : "get"
    },
    updateUser : {
        url : `${backendDomain}/api/update-user`,
        method : "post"
    },
    UploadProduct : {
        url : `${backendDomain}/api/uploadProduct`,
        method : "post"
    },
    allProduct : {
        url : `${backendDomain}/api/get-product`,
        method : 'get'
    }
}

export default SummaryApi;