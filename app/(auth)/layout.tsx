import React from "react";

const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <main className="flex flex-col bg-zinc-800 h-screen items-center justify-center">
            {children}
        </main>
    );
};

export default AuthLayout;