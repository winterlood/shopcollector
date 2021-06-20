import React from "react";
import fs from "fs";
import { getStoredPostList } from "lib/posts";
import { renderToStaticMarkup } from "react-dom/server";

const Sitemap = () => {};

export const getServerSideProps = async ({ res }) => {
    const baseUrl = {
        development: "http://localhost:5000",
        production: "https://shopcollector.vercel.app",
    }[process.env.NODE_ENV];

    const staticPages = fs
        .readdirSync("pages")
        .filter((staticPage) => {
            return !["_app.js", "_document.js", "_error.js", "sitemap.xml.js"].includes(staticPage);
        })
        .map((staticPagePath) => {
            return `${baseUrl}/${staticPagePath}`;
        });

    const postPages = getStoredPostList().map((it) => {
        var url = `https://shopcollector.vercel.app/dailybest/${it.params.id}`;

        var createTime = it.params.pureCreatedDate;
        var year = createTime.slice(0, 4);
        var month = createTime.slice(4, 6);
        var day = createTime.slice(6, 8);

        var date = new Date(`${year}-${month}-${day}`);
        return {
            url: url,
            date: date,
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
      ${staticPages
          .map((url) => {
              return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
          })
          .join("")}
    </urlset>
  `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;
