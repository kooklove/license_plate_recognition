/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const LoginContextStore = createContext();

const LoginContext = (props) => {
    const [loginInfo, setLoginInfo] = useState();

    const UserInfo = {
        loginInfo,
        setLoginInfo,
    }

    return (
        <LoginContextStore.Provider value={UserInfo}>
            {props.children}
        </LoginContextStore.Provider>
    );
};

export default LoginContext;