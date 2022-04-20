import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';

import './category-preview.styles.scss';

const CategoryPreview = ({ title, products }) => {
    const { pathname } = useLocation();
    return(
        <div className='category-preview-container'>
            <h2>
                <Link to={`${pathname}/${title}`}>
                    <span className='title'>{title.toUpperCase()}</span>
                </Link>
            </h2>
            <div className='preview'>
                {
                    products.filter((_, idx) => idx < 4)
                        .map((product, index) => {
                            return(<ProductCard key={`${product.id}-${index}`} product={product} />)
                        })
                }
            </div>
        </div>
    )
};

export default CategoryPreview;