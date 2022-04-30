import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCartItems } from '../../store/cart/cart.selector';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';

import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';



const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {navigate('/checkout')}

    return(
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length 
                    ? (cartItems.map((cartItem, index) => {
                        return(
                            <CartItem key={`${cartItem.id}-${index}`} cartItem={cartItem} />
                        )
                    }))
                    : (
                        <EmptyMessage as='span'>Your cart is empty</EmptyMessage>
                    )
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>checkout</Button>
        </CartDropdownContainer>
    )
};

export default CartDropdown;