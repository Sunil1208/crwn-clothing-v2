import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { ProductCardContainer, ProductFooter, ProductName, ProductPrice } from './product-card.styles';

const ProductCard = ({ product }) => {
    const { addItemToCart } = useContext(CartContext);
    const { name, imageUrl, price } = product;

    const addProductToCart = () => addItemToCart(product);
    return (
        <ProductCardContainer >
            <img src={imageUrl} alt={`${name}`}/>
            <ProductFooter className='footer'>
                <ProductName >{name}</ProductName>
                <ProductPrice>{price}</ProductPrice>
            </ProductFooter>
            <Button 
                buttonType={BUTTON_TYPE_CLASSES.inverted}
                onClick={addProductToCart}
            >Add to cart</Button>
        </ProductCardContainer>
    )
};

export default ProductCard;