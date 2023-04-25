import { createContext, useState} from "react";

const Context = createContext();

const ContextProvider = ({children}) => {
    const [stateModal, setStateModal] = useState(false);

    const values = {
        stateModal,
        setStateModal
    };

    return<Context.Provider value={values}>{children}</Context.Provider>
}
export {Context,ContextProvider};