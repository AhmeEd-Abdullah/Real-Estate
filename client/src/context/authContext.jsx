import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null,
    );
    console.log("currentUser", currentUser);

    const updateCurrentUser = (data) => {
        setCurrentUser(data);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <authContext.Provider value={{ currentUser, updateCurrentUser }}>
            {children}
        </authContext.Provider>
    );
};
