import React, { useState, useEffect } from "react";
type Props = {};
const Layout = ({ children }: { children: JSX.Element }) => {
    return <div className="Layout">{children}</div>;
};

export default Layout;
