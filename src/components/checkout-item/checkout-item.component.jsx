import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearItemFromCart, addItemToCart, removeItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { Arrow, Value, CheckoutInfo, CheckoutItemContainer, ImageContainer, Quantity, RemoveButton } from './checkout-item.styles';


const CheckoutItem = ({ cartItem }) => {
    const dispatch = useDispatch();

    const { name, imageUrl, price, quantity } = cartItem;

    const cartItems = useSelector(selectCartItems);

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`}/>
            </ImageContainer>
            <CheckoutInfo as='span' >{name}</CheckoutInfo>
            <Quantity>
                <Arrow onClick={removeItemHandler}>
                    &#10094;
                </Arrow>
                <Value as='span'>{quantity}</Value>
                <Arrow onClick={addItemHandler}>
                    &#10095;
                </Arrow>
            </Quantity>
            <CheckoutInfo as='span'>{price}</CheckoutInfo>
            <RemoveButton
                onClick={clearItemHandler}
            >&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
};

export default CheckoutItem;