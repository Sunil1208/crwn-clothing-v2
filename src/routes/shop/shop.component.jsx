import React, { useContext, Fragment } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';

import { CategoriesContext } from '../../contexts/categories.context';

import './shop.styles.scss';

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map((title, idx) => {
                    const products = categoriesMap[title];
                    return(
                        <CategoryPreview key={`category-preview-${title}-${idx}`} title={title} products={products} />
                    )
                })
            }
        </Fragment>
    )
};

export default Shop;