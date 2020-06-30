import {
    GET_DEALS_LIST_REQUEST,
    GET_DISPUTES_LIST_REQUEST,
    GET_SOLD_LIST_REQUEST,
    RESET_CART_REQUEST,
    ADD_CARD_REQUEST,
    GET_PROFILE_DETAILS_REQUEST,
    UPDATE_PROFILE_REQUEST,
    UPDATE_DOCUMENTS_REQUEST,
    GET_DEAL_COUNT_REQUEST,
    GET_BUYER_PRODUCT_LIST_REQUEST,
    GET_BARCODE_PRODUCT_REQUEST,
    GET_SELLER_PRODUCT_LIST_REQUEST,
    ADD_ITEM_TO_SHOP_REQUEST,
    GET_CARD_REQUEST,
    PRODUCT_PURCHASE_REQUEST,
    GENERATE_REFRALCODE_REQUEST,
    ADD_REFRALCODE_REQUEST,
    GET_DEAL_DETAIL_REQUEST,
    MANAGE_CART,
    MANAGE_CART_DETAILS,

} from '../Types'


export const getSellerProductListRequest = (params) => {
    return {
        type: GET_SELLER_PRODUCT_LIST_REQUEST,
        params
    };
}

export const getBuyerProductListRequest = (params) => {
    return {
        type: GET_BUYER_PRODUCT_LIST_REQUEST,
        params
    };
}

export const getBarcodeProductRequest = (params) => {
    return {
        type: GET_BARCODE_PRODUCT_REQUEST,
        params
    };
}

export const addItemToShopRequest = (params) => {
    return {
        type: ADD_ITEM_TO_SHOP_REQUEST,
        params
    };
}

export const getSoldProductListRequest = (params) => {
    return {
        type: GET_SOLD_LIST_REQUEST,
        params
    };
}


export const addCardRequest = (params) => {
    return {
        type: ADD_CARD_REQUEST,
        params
    };
}

export const getCardRequest = (params) => {
    return {
        type: GET_CARD_REQUEST,
        params
    };
}

export const productPurchaseRequest = (params) => {
    return {
        type: PRODUCT_PURCHASE_REQUEST,
        params
    };
}

export const getProfileDetailRequest = (params) => {
    return{
        type: GET_PROFILE_DETAILS_REQUEST,
        params
    }
}

export const updateDocuments = (params) => {
    return{
        type: UPDATE_DOCUMENTS_REQUEST,
        params
    }
}

export const getDealCountRequest =(params) => {
    return{
        type: GET_DEAL_COUNT_REQUEST,
        params
    }
}

export const getDealDetailRequest = (params) => {
    return {
        type: GET_DEAL_DETAIL_REQUEST,
        params
    };
}

export const updateProfile = (params) => {
    return {
        type: UPDATE_PROFILE_REQUEST,
        params
    };
}

export const getDealsListRequest = (params) => {
    return {
        type: GET_DEALS_LIST_REQUEST,
        params
    };
}

export const generateRefralRequest = (params) => {
    return {
        type: GENERATE_REFRALCODE_REQUEST,
        params
    };
}

export const addRefralRequest = (params) => {
    return {
        type: ADD_REFRALCODE_REQUEST,
        params
    };
}

















export const getDisputeListRequest = (params) => {
    return {
        type: GET_DISPUTES_LIST_REQUEST,
        params
    };
}


export const manageCart = (params) => {
    return {
        type: MANAGE_CART,
        params
    };
}

export const manageCartDetails = (params) => {
    return {
        type: MANAGE_CART_DETAILS,
        params
    };
}


export const resetCartRequest = (params) => {
    return {
        type: RESET_CART_REQUEST,
    };
}

