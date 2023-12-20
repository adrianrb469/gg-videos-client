import { createContext, useState, ReactNode } from "react";

type User = {
    user_id: number;
    email: string;
};

type AuthState = {
    auth: {
        user?: User;
        access_token?: string;
    };
    setAuth: (auth: { user?: User; access_token?: string }) => void;
};

type Props = {
    children?: ReactNode;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
