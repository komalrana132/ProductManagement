const Platform = "react-native"
const STAGING = "http://dummy.restapiexample.com/api/v1/employees";
const ENVIRONMENT = STAGING;
// const SERVER_URL = "http://192.168.1.155/ChatDemoAPI/ChatApp.php?Service="
// const SERVER_URL = "http://clientapp.narola.online/pg/RidyApp/RidyAppService.php?Service="
const SERVER_URL = "http://localhost/ProductManagement/ProductManagementServices.php?Service="

module.exports = {

    // =======>>>>>>>> RefreshToken <<<<<<<<=======
    refreshToken(params) {
        return fetch(`${SERVER_URL + 'RefreshToken'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: JSON.stringify(params)
        })
        .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },

    // =======>>>>>>>> Login <<<<<<<<=======
    login(params) {
        return fetch(`${SERVER_URL + 'Login'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: JSON.stringify(params)
        })
        .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },

    // =======>>>>>>>> Login <<<<<<<<=======
    register(params) {
        console.log("apis param", params);
        
        return fetch(`${SERVER_URL + 'Register'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: params
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },


    // ===========>>>>>>>>>> SEND OTP API <<<<<<<<<<<<===========
    sendOtp(params) {
        return fetch(`${SERVER_URL + 'SendOTP'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: JSON.stringify(params)
        })
            .then(response =>
                response.json()
                    .then(data => {
                        return data;
                    }))
    },


    // =======>>>>>>>> TestEncryption <<<<<<<<=======
    testEncryption(params) {
        return fetch(`${SERVER_URL + 'TestEncryption'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS',
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },

    // =======>>>>>>>> SendOTP <<<<<<<<=======
    userVerification(params) {
        return fetch(`${SERVER_URL + 'UserVerification'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },

    // =======>>>>>>>> Seller Verification <<<<<<<<=======
    signUp(params) {
        return fetch(`${SERVER_URL + 'signUp'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: params
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },

    // =======>>>>>>>> Add Card detail <<<<<<<<=======
    addCard(params) {
        return fetch(`${SERVER_URL + 'AddEditCardDetail'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },

    // =======>>>>>>>> get Card detail <<<<<<<<=======
    getCard(params) {
        return fetch(`${SERVER_URL + 'GetCardDetails'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },

    // =======>>>>>>>> get Profile  detail <<<<<<<<=======
    getProfileDetails(params) {
        return fetch(`${SERVER_URL + 'GetProfileDetails'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },


    // =======>>>>>>>> update Profile  detail <<<<<<<<=======
    updateProfile(params) {
        return fetch(`${SERVER_URL + 'UpdateProfile'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: params
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },

    // =======>>>>>>>> update Profile  detail <<<<<<<<=======
    updateDocuments(params) {
        return fetch(`${SERVER_URL + 'UpdateDocuments'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: params
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },

    // =======>>>>>>>> get deal count <<<<<<<<=======
    dealCount(params) {
        return fetch(`${SERVER_URL + 'GetDealCount'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },

    getBuyerProducts(params) {
        return fetch(`${SERVER_URL + 'GetAllSellerProductByShop'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },

    getBarcodeProduct(params) {
        return fetch(`${SERVER_URL + 'GetProductByBarcode'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },

    getSellerProductList(params) {
        return fetch(`${SERVER_URL + 'GetAllSellerProduct'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },

    addItemToShop(params) {
        return fetch(`${SERVER_URL + 'AddEditUserProduct'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },

    productPurchase(params) {
        return fetch(`${SERVER_URL + 'ProductPurchase'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },

    getDealsList(params) {
        return fetch(`${SERVER_URL + 'GetDealList'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },
    

    generateRefral(params){
        return fetch(`${SERVER_URL + 'GenerateReferalCode'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },

    addRefral(params){
        return fetch(`${SERVER_URL + 'AddReferalCode'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },

    dealDetail(params) {
        return fetch(`${SERVER_URL + 'GetDealDetails'}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "User-Agent": Platform.OS === 'android' ? "Android" : 'iOS'
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json()
                .then(data => {
                    return data;
                }))
    },
    















    registerUser(params) {
        // return fetch(`${SERVER_URL + 'Register'}`, {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(params)
        // })
        //     .then(response => response.json()
        //         .then(data => {
        //             return data;
        //         }))
    },

    getAlbumList(params) {
        // return fetch(`${'https://jsonplaceholder.typicode.com/posts'}`, {
        //     method: 'GET',
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        //     .then(response => response.json()
        //         .then(data => {
        //             return data;
        //         }))
    },
    
   
}