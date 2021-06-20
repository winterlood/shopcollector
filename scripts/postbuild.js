//@ts-ignore
const fs = require("fs");
const path = require("path");

function main() {
    const postsDirectory = path.join(process.cwd(), "_posts");
    const fileNames = fs.readdirSync(postsDirectory);
    console.log(fileNames);

    //     const postsDirectory = path.join(process.cwd(), "_posts");
    //     const pagesDir = "./.next/server/pages";
    //     console.log("POST BUILD!");

    //     const pageFiles = getPageFiles(pagesDir);

    //     console.log(pageFiles);
    //     const idList = pages.map((it) => it.split("_posts/")[1]);

    //     const postPages = idList.map((it) => {
    //         const id = it.split(".json")[0];
    //         const date = getDateById(id, "DATE");
    //         return {
    //             url: `https://shopcollector.vercel.app/dailybest/${id}`,
    //             date: new Date(date),
    //         };
    //     });

    //     const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    //     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    //      ${postPages.map((item) => {
    //          return `
    //          <url>
    //          <loc>${item.url}</loc>
    //          <lastmod>${item.date}</lastmod>
    //          <changefreq>monthly</changefreq>
    //          <priority>1.0</priority>
    //        </url>
    //          `;
    //      })}
    //     </urlset>
    //   `;

    //     console.log(postPages);
}

main();
