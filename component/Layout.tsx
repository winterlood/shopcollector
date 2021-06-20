import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
type Props = {};
const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    return (
        <>
            <Header />
            <div className="Layout">{children}</div>
            <Footer />
        </>
    );
};

export default Layout;
