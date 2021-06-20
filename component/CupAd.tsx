import React, { useState, useEffect } from "react";
type Props = {};
const CupAd = () => {
    var width = window.innerWidth > 0 ? window.innerWidth : screen.width;

    return (
        <div className="top_banner center">
            <iframe
                src="https://ads-partners.coupang.com/widgets.html?id=492774&template=carousel&trackingCode=AF5219904&subId=&width=680&height=140"
                width={width}
                height="140"
                scrolling="no"
                referrerPolicy="unsafe-url"
                className="dynamic_banner"
            ></iframe>
        </div>
    );
};

export default CupAd;
