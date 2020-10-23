import {LIST_CONTACT, INDEX_LIST, ITEM } from '../constants';

export function changeContact(value) {
    return {
        type: LIST_CONTACT,
        payload: value
   }
}

export function changeIndexList(value) {
    return {
        type: INDEX_LIST,
        payload: value
   }
}

export function changeItem(value) {
    return {
        type: ITEM,
        payload: value
   }
}