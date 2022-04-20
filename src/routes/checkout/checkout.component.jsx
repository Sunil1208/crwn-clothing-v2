import React, { useContext } from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { CartContext } from '../../contexts/cart.context';

import './checkout.styles.scss';

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
        <div className='checkout-container'>
            <div className='checkout-header'>
                {
                    CHECKOUT_HEADERS.map((header, index) =>{
                        return(
                            <div key={`checkout-header-${index}-${header}`} className='header-block'>
                                <span>{header}</span>
                            </div>
                        )
                    })
                }
            </div>
            {
                cartItems.map((cartItem) => {
                    return(
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                    )
                })
            }
            <span className='total'>Total: ${cartTotal}</span>
        </div>
    )
};

export default Checkout;
