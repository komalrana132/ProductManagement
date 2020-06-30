import {
    GET_DEALS_LIST_SUCCESS,
    GET_DEALS_LIST_FAILURE,

    GET_DISPUTES_LIST_SUCCESS,
    GET_DISPUTES_LIST_FAILURE,
    
    RESET_CART,
    
    GET_SOLD_LIST_SUCCESS,
    GET_SOLD_LIST_FAILURE,

    ADD_CARD_SUCCESS,
    ADD_CARD_FAILED,
    
    GET_PROFILE_DETAILS_FAILURE,
    GET_PROFILE_DETAILS_SUCCESS,
    
    RESET_AUTH,
    
    UPDATE_DOCUMENTS_SUCCESS,
    UPDATE_DOCUMENTS_FAILURE,
    
    GET_DEAL_COUNT_SUCCESS,
    GET_DEAL_COUNT_FAILURE,
    
    GET_BUYER_PRODUCT_LIST_SUCCESS,
    GET_BUYER_PRODUCT_LIST_FAILED,
    
    GET_BARCODE_PRODUCT_SUCCESS,
    GET_BARCODE_PRODUCT_FAILED,
    
    ADD_ITEM_TO_SHOP_SUCCESS,
    ADD_ITEM_TO_SHOP_FAILED,
    
    GET_SELLER_PRODUCT_LIST_SUCCESS,
    GET_SELLER_PRODUCT_LIST_FAILED,
    
    GET_CARD_SUCCESS,
    GET_CARD_FAILED,
    
    PRODUCT_PURCHASE_SUCCESS,
    PRODUCT_PURCHASE_FAILED,
    
    GENERATE_REFRALCODE_SUCCESS,
    GENERATE_REFRALCODE_FAILURE,
    
    ADD_REFRALCODE_SUCCESS,
    ADD_REFRALCODE_FAILURE,
    
    GET_DEAL_DETAIL_SUCCESS,
    GET_DEAL_DETAIL_FAILURE,

    MANAGE_CART_SUCCESS,
    MANAGE_CART_DETAILS_SUCCESS
} from '../Types';
import _ from 'lodash';

const INITIAL_STATE = {
    addedItems: [],
    total: 0,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_BUYER_PRODUCT_LIST_SUCCESS:
            return { ...state, buyerProductListSuccess: true, buyerProductListResponce: action.payload }

        case GET_BUYER_PRODUCT_LIST_FAILED:
            return { ...state, buyerProductListSuccess: false, error: action.payload }

        case GET_BARCODE_PRODUCT_SUCCESS:
            return { ...state, barcodeSuccess: true, barcodeResponce: action.payload }

        case GET_BARCODE_PRODUCT_FAILED:
            return { ...state, barcodeSuccess: false, error: action.payload }

        case UPDATE_DOCUMENTS_SUCCESS:
            return { ...state, updateDocSuccess: true, updateDocsResponce: action.payload }

        case UPDATE_DOCUMENTS_FAILURE:
            return { ...state, updateDocSuccess: false, error: action.payload }

        case ADD_CARD_SUCCESS:
            return { ...state, addCardSuccess: true, addCardResponce: action.payload }

        case ADD_CARD_FAILED:
            
            return { ...state, addCardSuccess: false, error: action.payload }

        case GET_CARD_SUCCESS:
            return { ...state, getCardSuccess: true, getCardResponce: action.payload }

        case GET_CARD_FAILED:
            return { ...state, getCardSuccess: false, error: action.payload }

        case ADD_ITEM_TO_SHOP_SUCCESS:
            return { ...state, addItemSuccess: true, addItemResponce: action.payload }

        case ADD_ITEM_TO_SHOP_FAILED:
            return { ...state, addItemSuccess: false, error: action.payload }

        case GET_DEAL_COUNT_FAILURE:
            return { ...state, dealCountSuccess: false, error: action.payload }

        case GET_DEAL_COUNT_SUCCESS:
            return { ...state, dealCountSuccess: true, dealCountResponce: action.payload }

        case GET_PROFILE_DETAILS_SUCCESS:
            return { ...state, getProfileSuccess: true, getProfileResponce: action.payload }

        case GET_PROFILE_DETAILS_FAILURE:
            return { ...state, getProfileSuccess: false, error: action.payload }

        case PRODUCT_PURCHASE_SUCCESS:
            return { ...state, productPurchaseSuccess: true, productPurchaseResponce : action.payload }

        case PRODUCT_PURCHASE_FAILED:
            return { ...state, productPurchaseSuccess: false, error: action.payload }

        case GENERATE_REFRALCODE_SUCCESS:
            return { ...state, generateRefralSuccess: true , generateRefralResponce : action.payload}

        case GENERATE_REFRALCODE_FAILURE:
            return { ...state, generateRefralSuccess: false, error: action.payload }

        case ADD_REFRALCODE_SUCCESS:
            return { ...state, addRefralSuccess: true, addRefralResponce: action.payload }

        case ADD_REFRALCODE_FAILURE:
            return { ...state, addRefralSuccess: false, error: action.payload }

        case GET_SOLD_LIST_SUCCESS:
            return { ...state, soldproductListSuccess: true, soldproductList: action.payload }

        case GET_SOLD_LIST_FAILURE:
            return { ...state, soldproductListSuccess: false, error: action.payload }

        case GET_DEALS_LIST_SUCCESS:
            return { ...state, dealsListSuccess: true, dealsList: action.payload }

        case GET_DEALS_LIST_FAILURE:
            return { ...state, dealsListSuccess: false, error: action.payload }

        case GET_DEAL_DETAIL_SUCCESS:
            return { ...state, dealsDetailSuccess: true, dealsDetailResponce: action.payload }

        case GET_DEAL_DETAIL_FAILURE:
            return { ...state, dealsDetailSuccess: false, error: action.payload }

        case GET_SELLER_PRODUCT_LIST_SUCCESS:
            return { ...state, sellerProductListSuccess: true, sellerProductListresponce: action.payload}

        case GET_SELLER_PRODUCT_LIST_FAILED:
            return { ...state, sellerProductListSuccess: false, error: action.payload }

        case GET_DISPUTES_LIST_SUCCESS:
            return { ...state, disputeListSuccess: true, disputeList: action.payload }

        case GET_DISPUTES_LIST_FAILURE:
            return { ...state, disputeListSuccess: false, error: action.payload }

        case RESET_CART:
            return { ...state, addedItems: [], total: 0 }

        case RESET_AUTH:
            return { ...INITIAL_STATE }

        case MANAGE_CART_SUCCESS:
            // managing cart array addition
            return {...state, addedItems : _.uniqBy([...state.addedItems, action.payload.addedItem]) , total: action.payload.total}

        case MANAGE_CART_DETAILS_SUCCESS:
            // managing cart array subtraction,removing from cart and increment in cart
            return {...state, addedItems : action.payload.addedItem , total: action.payload.total}

        default:
            return state;

    }
}