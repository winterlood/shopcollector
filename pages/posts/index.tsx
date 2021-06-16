import React, { useState, useEffect } from "react";
import Link from "next/link";

type Props = {};
const index = () => {
    return (
        <div>
            THIS IS INDEX
            <Link href="/posts/1">
                <a>GOGO</a>
            </Link>
        </div>
    );
};

export default index;
