import { createContext, useReducer } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    // if found, increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }
    // return new array with modified cartItems/ new cart item
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);
    if(existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1}
            : cartItem
        );
}

const clearCartItem = (cartItems, cartItemToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

export const cartReducer = (state, action) => {
    const { type, payload } = action;
    
    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`unhandle type of ${type} in cartReducer`)
    }
}

export const CartProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

    const { isCartOpen, cartItems, cartCount, cartTotal } = state;

    const updateCartItemReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);
        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS,
            payload: {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount
            }
        });
    };

    const setIsCartOpen = (bool) => {
        dispatch({
            type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
            payload: bool
        });
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemReducer(newCartItems);
    };

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemReducer(newCartItems);
    };

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemReducer(newCartItems);
    };

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        cartTotal,
        removeItemFromCart,
        clearItemFromCart
    };

    return(
        <CartContext.Provider value={value}>
            { children }
        </CartContext.Provider>
    )
}