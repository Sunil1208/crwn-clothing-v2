import React, { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { Arrow, Value, CheckoutInfo, CheckoutItemContainer, ImageContainer, Quantity, RemoveButton } from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
    const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

    const { name, imageUrl, price, quantity } = cartItem;

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);

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