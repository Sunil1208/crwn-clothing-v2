import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import ProductCard from '../product-card/product-card.component';
import { CategoryPreviewContainer, Title, Preview } from './category-preview.styles';


const CategoryPreview = ({ title, products }) => {
    const { pathname } = useLocation();
    return(
        <CategoryPreviewContainer>
            <h2>
                <Link to={`${pathname}/${title}`}>
                    <Title>{title.toUpperCase()}</Title>
                </Link>
            </h2>
            <Preview>
                {
                    products.filter((_, idx) => idx < 4)
                        .map((product, index) => {
                            return(<ProductCard key={`${product.id}-${index}`} product={product} />)
                        })
                }
            </Preview>
        </CategoryPreviewContainer>
    )
};

export default CategoryPreview;