import styled from 'styled-components';
import { BaseButton, InvertedButton, GoogleSignInButton } from '../button/button.styles';

export const CartDropdownContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;


  //targeting another styled componenets/nesting
  ${BaseButton},
  ${InvertedButton},
  ${GoogleSignInButton} {
    margin-top: auto;
  }
`;

export const EmptyMessage = styled.div`
  font-size: 18px;
  margin: 50px auto;
`;

export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  overflow-x: hidden;
`;
