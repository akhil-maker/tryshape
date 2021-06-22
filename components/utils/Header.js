import React, { useState } from "react";

// link from next
import Link from "next/link";

// auth for signin out
import { auth } from "../../utils/firebase";

// toast
import toast from "react-hot-toast";

// icon
import { FiPower, FiX } from "react-icons/fi";
import ImgLogo from '../../public/images/img-logo.svg'

// Bootstrap
import Button from "react-bootstrap/Button";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import { FiSearch } from "react-icons/fi";

// Styled Component
import styled from "styled-components";

const AppHeader = styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.6rem 0.8rem;
    background-color: var(--color-brand);
`;

const Logo = styled.h1`
   width: 140px;
   height: 32px;
   background-image: url(${ImgLogo});
   background-repeat: no-repeat;
   background-size: contain;
   background-position: center;
   padding: 0;
   margin: 2px 0 0 -8px;
   line-height: 1;
   cursor: pointer;
`;

const NavbarSearchInput = styled(InputGroup)`
    position: relative;
    width: 60% !important;
    border-radius: 0.4rem;
    background-color: rgba(var(--color-neutral-100-rgb), 0.3);

    &:focus-within {
      box-shadow: 0 0 0 0.1rem rgba(var(--color-neutral-10-rgb), 40%);
      background-color: rgba(var(--color-neutral-100-rgb), 0.4);
    }
`;

const NavbarSearchInputText = styled(InputGroup.Text)`
    position: absolute;
    top: 3px;
    left: 0;
    background-color: transparent !important;
    border: 0 !important;
`;

const NavbarSearchInputControl = styled(FormControl)`
  border-radius: 0.4rem !important;
  border: 0 !important;
  background-color: transparent !important;
  color: var(--color-neutral-10) !important;
  padding-left: 2.4rem !important;
  font-size: var(--fs-rg) !important;
  ::placeholder {
    color: rgba(var(--color-neutral-10-rgb), 0.6) !important;
  }
`;

const CloseIcon = styled(FiX)`
  margin: 0.36rem;
`;

const UserThumb = styled.div`
  display: flex;
  grid-gap: 0.4rem;
  align-items: center;

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
`;

const UserThumbName = styled.div`
  font-size: var(--fs-sm);
  color: var(--color-neutral-10);
  line-height: 1;
`;

const LogoutButton = styled(Button)`
  color: var(--color-neutral-10);
`;

const LoginBar = styled.div`
  display: flex;
`;

const Header = ({ setOpen, user, setUser }) => {
  // console.log(user);
  // sign out function
  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        setUser([]);
        toast.success("Signed Out!");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <AppHeader>
      <Link href="/">
        <Logo>       
          <div className="sr-only">TryShape</div>
        </Logo>
      </Link>
      <NavbarSearchInput>
        <NavbarSearchInputText id="basic-addon1"><FiSearch color='white' size='18px' /></NavbarSearchInputText>
        <NavbarSearchInputControl
          placeholder="Search a shape"
          aria-label="Search a shape"
          aria-describedby="basic-addon1"
        />
        <CloseIcon color='#ffffff' size='24px' />
      </NavbarSearchInput>
      {(user.email || user.displayName) ? (
        <>
          <LoginBar>
            <UserThumb>
              <img
                src={
                  user.photoURL
                    ? user.photoURL
                    : `https://unavatar.vercel.app/${user.email}`
                }
                alt="profile"
              />
              <UserThumbName>{user.displayName ? user.displayName : "User"}</UserThumbName>
            </UserThumb>

            <LogoutButton onClick={signOut} variant="link" className="btn-icon">
              <FiPower color='var(--color-neutral-10' size="18px"/>
              <div className="sr-only">Sign Out</div>
            </LogoutButton>
          </LoginBar>
        </>
      ) : (
        <Button variant="outline-secondary" size="sm" onClick={() => setOpen(true)}>
          <div>Sign In</div>
        </Button>
      )}
    </AppHeader>
  );
};

export default Header;
