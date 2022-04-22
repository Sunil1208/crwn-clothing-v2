import React, { useContext } from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CartContext } from '../../contexts/cart.context';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';

const CHECKOUT_HEADERS = [
    "Product",
    "Description",
    "Quantity",
    "Price",
    "Remove"
]

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);
    return(
        <CheckoutContainer>
            <CheckoutHeader>
                {
                    CHECKOUT_HEADERS.map((header, index) =>{
                        return(
                            <HeaderBlock key={`checkout-header-${index}-${header}`}>
                                <span>{header}</span>
                            </HeaderBlock>
                        )
                    })
                }
            </CheckoutHeader>
            {
                cartItems.map((cartItem) => {
                    return(
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                    )
                })
            }
            <Total>Total: ${cartTotal}</Total>
        </CheckoutContainer>
    )
};

export default Checkout;
