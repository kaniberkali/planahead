import { createContext, useState} from "react";

const Context = createContext();

const ContextProvider = ({children}) => {
    const [stateSettings, setStateSettings] = useState(false);
    const [bgColor, setBgColor] = useState('#57C5B6');
    const [newNote,setNewNote] = useState(false);
    const [pageNum,setPageNum] = useState(1);
    const [iconModal,setIconModal] = useState(false);
    const [selected, setSelected] = useState('daily');
    const [menuSelected, setMenuSelected] = useState('daily');
    const [selectIcon,setSelectIcon] = useState(''); 
    const [username,setUsername] = useState(null);   
    const [notes,setNotes] = useState([]);
    const [deleteNote,setDeleteNote] = useState(false);
    const [profileImg,setProfileImg] = useState('');
    const [updated,setUpdated] = useState(false);

    const values = {
        stateSettings,
        bgColor,
        newNote,
        pageNum,
        iconModal,
        selected,
        menuSelected,
        selectIcon,
        notes,
        username,
        deleteNote,
        updated,
        setStateSettings,
        setBgColor,
        setNewNote,
        setPageNum,
        setIconModal,
        setSelected,
        setMenuSelected,
        setSelectIcon,
        setNotes,
        setUsername,
        setDeleteNote,
        setUpdated
    };

    return<Context.Provider value={values}>{children}</Context.Provider>
}
export {Context,ContextProvider};