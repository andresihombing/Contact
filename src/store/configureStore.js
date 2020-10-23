import { createStore, combineReducers } from 'redux';
import contactReducer from '../reducers/contactReducer';

const rootReducer = combineReducers(
    { contact: contactReducer }
);

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;