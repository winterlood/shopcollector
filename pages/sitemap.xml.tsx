import React, { useState, useEffect } from "react";
import { getDateById } from "lib/posts";
import globby from "globby";
const Sitemap = () => {};

export async function getServerSideProps({ res }) {
    const pages = await globby(["_posts/*.json"]);
    const idList = pages.map((it) => it.split("_posts/")[1]);

    const postPages = idList.map((it) => {
        const id = it.split(".json")[0];
        const date = getDateById(id, "DATE");
        return {
            url: `https://shopcollector.vercel.app/dailybest/${id}`,
            date: new Date(date),
        };
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${postPages.map((item) => {
         return `
         <url>
         <loc>${item.url}</loc>
         <lastmod>${item.date}</lastmod>
         <changefreq>monthly</changefreq>
         <priority>1.0</priority>
       </url>
         `;
     })}
    </urlset>
  `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
    return {
        props: {},
    };
}

export default Sitemap;
