import React from 'react';
import { useSelector } from 'react-redux';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PaymentForm from '../../components/payment-form/payment-form.component';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';

const CHECKOUT_HEADERS = [
    "Product",
    "Description",
    "Quantity",
    "Price",
    "Remove"
]

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    
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
            <PaymentForm />
        </CheckoutContainer>
    )
};

export default Checkout;
