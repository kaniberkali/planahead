import { createContext, useState} from "react";

const Context = createContext();

const ContextProvider = ({children}) => {
    const [stateSettings, setStateSettings] = useState(false);
    const [bgColor, setBgColor] = useState('#57C5B6');
    const [newNote,setNewNote] = useState(false);

    const values = {
        stateSettings,
        bgColor,
        newNote,
        setStateSettings,
        setBgColor,
        setNewNote
    };

    return<Context.Provider value={values}>{children}</Context.Provider>
}
export {Context,ContextProvider};