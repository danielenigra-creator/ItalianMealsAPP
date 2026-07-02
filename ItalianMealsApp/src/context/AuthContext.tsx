/*
import type {AuthUser} from "service/auth"
import React from "react";
interface AuthContextValue {
    user : AuthUser;
    login: ()=> void;
}
const AuthContext = React.createContext<FavoriteContextValue | null>(null);

export function AuthProvider(){


const [user, setUser] = React.useState()<AuthUser>();


//passiamo le value per dire che componenti dobbiamo passare
//il logout è una function per cancellare un valore in async storage
//il login è una funzione
const value= React.useMemo(() => {
user,
login: setUser,
logout() => setUser(null), 
}
), [user]);
//sarà una dipendenza
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

//dobbiamo esportarlo, usiamo use context
fucntion useAuth() {
    const context = React.useContext(AuthContext);
    reurn context;
}



*/