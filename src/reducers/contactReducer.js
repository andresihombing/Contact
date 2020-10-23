import { LIST_CONTACT, INDEX_LIST, ITEM } from '../constants';

const initialState = {    
    listContact: [],
    indexList: null,
    item: {}
};
const contactReducer = (state = initialState, action) => {
    switch(action.type) {
        case LIST_CONTACT:            
            return {
                ...state,
                listContact:action.payload
            };
        case INDEX_LIST:
            return {
                ...state,
                indexList:action.payload
            };
        case ITEM:            
            return {
                ...state,
                item:action.payload
            };
        default:
            return state;
    }
}
export default contactReducer;
