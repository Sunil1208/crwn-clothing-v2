import { useEffect } from 'react';
import {
    Route,
    Routes
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Category from '../category/category.component';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import { fetchCategoriesStart } from '../../store/categories/category.action';


const Shop = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesStart());
        //eslint-disable-next-line
    }, [])
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    )
};

export default Shop;