import React, { useState, useEffect } from "react";
import globby from "globby";
type Props = {};
const Test = () => {};

// ${postPages.map((item) => {
//     return `
//     <url>
//     <loc>${item.url}</loc>
//     <lastmod>${item.date}</lastmod>
//     <changefreq>monthly</changefreq>
//     <priority>1.0</priority>
//   </url>
//     `;
// })}

export async function getServerSideProps({ res }) {
    const pages = await globby([
        // include
        "_posts/*.json",
    ]);
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

    </urlset>
  `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
    return {
        props: {},
    };
}

export default Test;
