import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
type Props = {};

const MenuItem = (props) => {
    return (
        <li className={props.isNow ? "on" : "off"}>
            <Link href={props.path}>{props.name}</Link>
        </li>
    );
};

const Header = () => {
    const menuItemList = [
        {
            path: "/",
            name: "HOME",
        },
        {
            path: "/dailybest",
            name: "DAILYBEST",
        },
        {
            path: "/product",
            name: "PRODUCT",
        },
    ];
    const router = useRouter();
    console.log(router.pathname);
    return (
        <header className="Header">
            <h2>실시간 데일리베스트</h2>
            <nav>
                {menuItemList.map((it, idx) => (
                    <MenuItem key={`MENU_ITEM::${idx}`} isNow={it.path === router.pathname} {...it} />
                ))}
            </nav>
        </header>
    );
};

export default Header;
