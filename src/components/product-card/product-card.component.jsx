import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { ProductCardContainer, ProductFooter, ProductName, ProductPrice } from './product-card.styles';
const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);

    const { name, imageUrl, price } = product;

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
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