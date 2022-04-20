import React, { useContext, Fragement } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import { CategoriesContext } from '../../contexts/categories.context';


const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    return(
        <Fragement>
            {
                Object.keys(categoriesMap).map((title, idx) => {
                    const products = categoriesMap[title];
                    return(
                        <CategoryPreview key={`category-preview-${title}-${idx}`} title={title} products={products} />
                    )
                })
            }
        </Fragement>
    )
};

export default CategoriesPreview;