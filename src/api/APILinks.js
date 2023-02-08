export const getAPIs = {
    login: {
        name: "login",
        path: "/auth/login",
        method: "POST",
    },
    register: {
        name: "register",
        path: "/auth/register",
        method: "POST",
    },
    updateUser: {
        name: "updateUser",
        path: "/auth/updateUser/",
        method: "POST",
    },
    getUser: {
        name: "getUser",
        path: "/auth/getUser/",
        method: "GET",
    },
    changePassword: {
        name: "changePassword",
        path: "/auth/changePassword/",
        method: "POST",
    },
    createService: {
        name: "createService",
        path: "/report/createService/",
        method: "POST",
    },
    getAllService: {
        name: "getAllService",
        path: "/report/getAllService/",
        method: "GET",
    },
    searchProfile: {
        name: "searchProfile",
        path: "/auth/searchProfile/",
        method: "POST",
    },
};