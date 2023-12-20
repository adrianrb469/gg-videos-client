import { createContext, useState, ReactNode } from "react";

export type User = {
    user_id: number;
    email: string;
    is_admin: boolean;
};

export type AuthState = {
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
