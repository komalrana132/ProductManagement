import { put, call, takeEvery } from 'redux-saga/effects'

import Api from '../Services/api';
import {
    GET_DEALS_LIST_REQUEST,
    GET_DEALS_LIST_SUCCESS,
    GET_DEALS_LIST_FAILURE,
    GET_DISPUTES_LIST_REQUEST,
    GET_DISPUTES_LIST_SUCCESS,
    GET_DISPUTES_LIST_FAILURE,
    RESET_CART_REQUEST,
    RESET_CART,
    GET_SOLD_LIST_REQUEST,
    GET_SOLD_LIST_SUCCESS,
    GET_SOLD_LIST_FAILURE,
    ADD_CARD_REQUEST,
    ADD_CARD_SUCCESS,
    ADD_CARD_FAILED,
    GET_PROFILE_DETAILS_SUCCESS,
    GET_PROFILE_DETAILS_FAILURE,
    GET_PROFILE_DETAILS_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_DOCUMENTS_SUCCESS,
    UPDATE_DOCUMENTS_FAILURE,
    UPDATE_DOCUMENTS_REQUEST,
    GET_DEAL_COUNT_SUCCESS,
    GET_DEAL_COUNT_FAILURE,
    GET_DEAL_COUNT_REQUEST,
    GET_BUYER_PRODUCT_LIST_SUCCESS,
    GET_BUYER_PRODUCT_LIST_FAILED,
    GET_BUYER_PRODUCT_LIST_REQUEST,
    GET_BARCODE_PRODUCT_REQUEST,
    GET_BARCODE_PRODUCT_SUCCESS,
    GET_BARCODE_PRODUCT_FAILED,
    GET_SELLER_PRODUCT_LIST_SUCCESS,
    GET_SELLER_PRODUCT_LIST_FAILED,
    GET_SELLER_PRODUCT_LIST_REQUEST,
    ADD_ITEM_TO_SHOP_REQUEST,
    ADD_ITEM_TO_SHOP_FAILED,
    ADD_ITEM_TO_SHOP_SUCCESS,
    GET_CARD_REQUEST,
    GET_CARD_SUCCESS,
    GET_CARD_FAILED,
    PRODUCT_PURCHASE_REQUEST,
    PRODUCT_PURCHASE_SUCCESS,
    PRODUCT_PURCHASE_FAILED,
    GENERATE_REFRALCODE_SUCCESS,
    GENERATE_REFRALCODE_FAILURE,
    GENERATE_REFRALCODE_REQUEST,
    ADD_REFRALCODE_REQUEST,
    ADD_REFRALCODE_SUCCESS,
    ADD_REFRALCODE_FAILURE,
    GET_DEAL_DETAIL_SUCCESS,
    GET_DEAL_DETAIL_FAILURE,
    GET_DEAL_DETAIL_REQUEST,
    MANAGE_CART_SUCCESS,
    MANAGE_CART,
    MANAGE_CART_DETAILS,
    MANAGE_CART_DETAILS_SUCCESS,
    MANAGE_CART_FAILURE,
    MANAGE_CART_DETAILS_FAILURE,
    
} from '../Types';


// ======>>>>>>> ADD CARD SAGA <<<<<<<<==========
export const addCardSaga = function* addCardSaga({ params }) {
    try {
        const response = yield call(Api.addCard, params)
        yield put({ type: ADD_CARD_SUCCESS, payload: response });
    }
    catch (e) {
        console.log("***************ERROR******************* \n ", e)
        yield put({ type: ADD_CARD_FAILED, payload: e });
    }
}

// ======>>>>>>> ADD CARD SAGA <<<<<<<<==========
export const getCardSaga = function* getCardSaga({ params }) {
    try {
        const response = yield call(Api.getCard, params)
        yield put({ type: GET_CARD_SUCCESS, payload: response });
    }
    catch (e) {
        console.log("***************ERROR******************* \n ", e)
        yield put({ type: GET_CARD_FAILED, payload: e });
    }
}

export const getProfileDetailSaga = function* getProfileDetailSaga({params}){
    try{
        const responce = yield call(Api.getProfileDetails,params )
        yield put({type: GET_PROFILE_DETAILS_SUCCESS, payload: responce})
    }
    catch(e){
        console.log("***************ERROR******************* \n ", e)
        yield put({type: GET_PROFILE_DETAILS_FAILURE, payload: e})
    }
}

// ===========>>>>>>>>>>>UPDATE PROFILE SAGA <<<<<<<<<<===========
export const updateProfileSaga = function* updateProfileSaga({params}){
    try{

        const responce = yield call(Api.updateProfile,params )
        yield put({type: UPDATE_PROFILE_SUCCESS, payload: responce})
    }
    catch(e){
        console.log("***************ERROR******************* \n ", e)
        yield put({type: UPDATE_PROFILE_FAILURE, payload: e})
    }
}

// ======>>>>>>> ADD CARD SAGA <<<<<<<<==========
export const addItemToShopSaga = function* addItemToShopSaga({ params }) {
    try {
        const response = yield call(Api.addItemToShop, params)
        yield put({ type: ADD_ITEM_TO_SHOP_SUCCESS, payload: response });
    }
    catch (e) {
        console.log("***************ERROR******************* \n ", e)
        yield put({ type: ADD_ITEM_TO_SHOP_FAILED, payload: e });
    }
}

// ======>>>>>>> UPDATE DOCUMENTS SAGA <<<<<<<<==========
export const updateDocumentsSaga = function* updateDocumentsSaga({ params }) {
    try {
        const response = yield call(Api.updateDocuments, params)
        yield put({ type: UPDATE_DOCUMENTS_SUCCESS, payload: response });
    }
    catch (e) {
        yield put({ type: UPDATE_DOCUMENTS_FAILURE, payload: e });
    }
}

// ======>>>>>>> DEAL COUNT SAGA <<<<<<<<==========
export const dealcountSaga = function* dealcountSaga({ params }) {
    try {
        const response = yield call(Api.dealCount, params)
        yield put({ type: GET_DEAL_COUNT_SUCCESS, payload: response });
    }
    catch (e) {
        yield put({ type: GET_DEAL_COUNT_FAILURE, payload: e });
    }
}

// ======>>>>>>> DEAL DETAIL SAGA <<<<<<<<==========
export const dealDetailSaga = function* dealDetailSaga({ params }) {
    try {
        const response = yield call(Api.dealDetail, params)
        yield put({ type: GET_DEAL_DETAIL_SUCCESS, payload: response });
    }
    catch (e) {
        yield put({ type: GET_DEAL_DETAIL_FAILURE, payload: e });
    }
}

// ======>>>>>>> PRODUCT PURCHASE SAGA <<<<<<<<==========
export const productPurchaseSaga = function* productPurchaseSaga({ params }) {
    try {
        const response = yield call(Api.productPurchase, params)
        yield put({ type: PRODUCT_PURCHASE_SUCCESS, payload: response });
    }
    catch (e) {
        yield put({ type: PRODUCT_PURCHASE_FAILED, payload: e });
    }
}


// ======>>>>>>> DEAL LIST SAGA <<<<<<<<==========
export const getDealsListSaga = function* getDealsListSaga({ params }) {
    try {
        const response = yield call(Api.getDealsList, params)
        yield put({ type: GET_DEALS_LIST_SUCCESS, payload: response });
    }
    catch (e) {
        yield put({ type: GET_DEALS_LIST_FAILURE, payload: e });
    }
}

// ======>>>>>>> REFRAL CODE SAGA <<<<<<<<==========
export const generateRefralCodeSaga = function* generateRefralCodeSaga({ params }) {
    try {
        const response = yield call(Api.generateRefral, params)
        yield put({ type: GENERATE_REFRALCODE_SUCCESS, payload: response });
    }
    catch (e) {
        yield put({ type: GENERATE_REFRALCODE_FAILURE, payload: e });
    }
}

// ======>>>>>>> ADD REFRAL CODE SAGA <<<<<<<<==========
export const addRefralSaga = function* addRefralSaga({ params }) {
    try {
        const response = yield call(Api.addRefral, params)
        yield put({ type: ADD_REFRALCODE_SUCCESS, payload: response });
    }
    catch (e) {
        yield put({ type: ADD_REFRALCODE_FAILURE, payload: e });
    }
}



// ======>>>>>>> Sold LIST SAGA <<<<<<<<==========
export const getSoldProductListSaga = function* getSoldProductListSaga({ params }) {
    try {
        // const response = yield call(Api.getDealsList, params)
        yield put({ type: GET_SOLD_LIST_SUCCESS, payload: params });
    }
    catch (e) {
        yield put({ type: GET_SOLD_LIST_FAILURE, payload: e });
    }
}

// ======>>>>>>> DISPUTE LIST SAGA <<<<<<<<==========
export const getDisputeListSaga = function* getDisputeListSaga({ params }) {
    try {
        // const response = yield call(Api.getDealsList, params)
        yield put({ type: GET_DISPUTES_LIST_SUCCESS, payload: params });
    }
    catch (e) {
        yield put({ type: GET_DISPUTES_LIST_FAILURE, payload: e });
    }
}

// ======>>>>>>> PRODUCT LIST SAGA <<<<<<<<==========
export const getBuyerProductListSaga = function* getBuyerProductListSaga({ params }) {
    try {
        const response = yield call(Api.getBuyerProducts, params)
        yield put({ type: GET_BUYER_PRODUCT_LIST_SUCCESS, payload: response });
    }
    catch (e) {
        yield put({ type: GET_BUYER_PRODUCT_LIST_FAILED, payload: e });
    }
}

// ======>>>>>>> SELLER PRODUCT LIST SAGA <<<<<<<<==========
export const getSellerProductListSaga = function* getSellerProductListSaga({ params }) {
    try {
        const response = yield call(Api.getSellerProductList, params)
        yield put({ type: GET_SELLER_PRODUCT_LIST_SUCCESS, payload: response });
    }
    catch (e) {
        yield put({ type: GET_SELLER_PRODUCT_LIST_FAILED, payload: e });
    }
}

// ======>>>>>>> BARCODE PRODUCT SAGA <<<<<<<<==========
export const getBarcodeProductSaga = function* getBarcodeProductSaga({ params }) {
    try {
        const response = yield call(Api.getBarcodeProduct, params)
        yield put({ type: GET_BARCODE_PRODUCT_SUCCESS, payload: response });
    }
    catch (e) {
        yield put({ type: GET_BARCODE_PRODUCT_FAILED, payload: e });
    }
}

// ======>>>>>>> CART ADD SAGA <<<<<<<<==========
export const manageCartSaga = function* manageCartSaga({ params }) {
    try {
        yield put({type: MANAGE_CART_SUCCESS, payload: params})
    }
    catch (e) {
        yield put({ type: MANAGE_CART_FAILURE, payload: e });
    }
}

export const manageCartDetailsSaga = function* manageCartDetailsSaga({ params }) {
    try {
        yield put({type: MANAGE_CART_DETAILS_SUCCESS, payload: params})
    }
    catch (e) {
        yield put({ type: MANAGE_CART_DETAILS_FAILURE, payload: e });
    }
}

// ======>>>>>>> RESET CART RESET SAGA <<<<<<<<==========
export const resetCartSaga = function* resetCartSaga({ }) {
    yield put({type: RESET_CART})
}


export function* homeSaga() {
    yield takeEvery(ADD_CARD_REQUEST, addCardSaga)
    yield takeEvery(GET_DEALS_LIST_REQUEST, getDealsListSaga)
    yield takeEvery(GET_DEAL_DETAIL_REQUEST, dealDetailSaga)
    yield takeEvery(GET_DISPUTES_LIST_REQUEST, getDisputeListSaga)
    yield takeEvery(RESET_CART_REQUEST, resetCartSaga)
    yield takeEvery(GET_SOLD_LIST_REQUEST, getSoldProductListSaga )
    yield takeEvery(GET_PROFILE_DETAILS_REQUEST, getProfileDetailSaga)
    yield takeEvery(UPDATE_PROFILE_REQUEST, updateProfileSaga)
    yield takeEvery(UPDATE_DOCUMENTS_REQUEST, updateDocumentsSaga)
    yield takeEvery(GET_DEAL_COUNT_REQUEST, dealcountSaga)
    yield takeEvery(GET_BUYER_PRODUCT_LIST_REQUEST, getBuyerProductListSaga)
    yield takeEvery(GET_BARCODE_PRODUCT_REQUEST, getBarcodeProductSaga)
    yield takeEvery(GET_SELLER_PRODUCT_LIST_REQUEST, getSellerProductListSaga)
    yield takeEvery(ADD_ITEM_TO_SHOP_REQUEST, addItemToShopSaga)
    yield takeEvery(GET_CARD_REQUEST, getCardSaga)
    yield takeEvery(PRODUCT_PURCHASE_REQUEST, productPurchaseSaga)
    yield takeEvery(GENERATE_REFRALCODE_REQUEST, generateRefralCodeSaga)
    yield takeEvery(ADD_REFRALCODE_REQUEST, addRefralSaga)
    yield takeEvery(MANAGE_CART, manageCartSaga)
    yield takeEvery(MANAGE_CART_DETAILS, manageCartDetailsSaga)
}
export default homeSaga;