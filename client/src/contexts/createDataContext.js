import React, { useReducer } from "react"

const createDataContext = (reducer, actions, initialValue) => {
    const Context = React.createContext();

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, initialValue);

        const boundActions = {}
        if (actions) {
            for (let key in actions) {
                boundActions[key] = actions[key](dispatch);
            }
        }

        return (
            <Context.Provider value={{ state, ...boundActions }}>
                {children}
            </Context.Provider>
        )
    };

    return {
        Context,
        Provider
    }
}

export default createDataContext;