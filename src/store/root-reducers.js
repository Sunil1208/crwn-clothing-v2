import { combineReducers } from 'redux';
import { categoriesReducer } from './categories/category.reducers';
import { userReducer } from './user/user.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
});