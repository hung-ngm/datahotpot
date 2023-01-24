import { FC, ReactNode } from 'react';
import { Header } from '../header';

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    )
} 

export default Layout;