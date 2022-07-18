/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const ModelContextStore = createContext();

const ModelContext = (props) => {
    const [command, setCommand] = useState();
    const [response, setResponse] = useState();

    const UserInfo = {
        command,
        setCommand,
        response,
        setResponse
    }

    return (
        <ModelContextStore.Provider value={UserInfo}>
            {props.children}
        </ModelContextStore.Provider>
    );
};

export default ModelContext;