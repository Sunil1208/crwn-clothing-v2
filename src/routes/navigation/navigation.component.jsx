import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { CrwnLogo } from '../../assets';
import { NavigationContainer, LogoContainer, NavLink, NavLinks } from './navigation.styles';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';



const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    console.log("current user is ", currentUser);

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className='logo' />
            </LogoContainer>
            <NavLinks>
                <NavLink className='nav-link' to='/shop'>
                    SHOP
                </NavLink>
                {
                    currentUser ?
                    (
                        <NavLink as="span" onClick={signOutUser}>
                            SIGN OUT
                        </NavLink>
                    )
                    : (
                        <NavLink className='nav-link' to='/auth'>
                            SIGN IN
                        </NavLink>
                    )
                }
                <CartIcon />
            </NavLinks>
            {isCartOpen && (<CartDropdown />)}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
};

export default Navigation;