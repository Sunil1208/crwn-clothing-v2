import React from 'react';
import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/category-preview.component';
import Spinner from '../../components/spinner/spinner.component';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/category.selector';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return(
        <div>
            {
                isLoading ? 
                    (<Spinner />)
                    :
                    (Object.keys(categoriesMap).map((title, idx) => {
                        const products = categoriesMap[title];
                        return(
                            <CategoryPreview key={`category-preview-${title}-${idx}`} title={title} products={products} />
                        )
                    }))
            }
        </div>
    )
};

export default CategoriesPreview;