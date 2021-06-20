//@ts-ignore
const fs = require("fs");
const path = require("path");

const getDateById = (id, type) => {
    const rawDate = id.split("@")[0].split("-");
    const fullDate = rawDate[rawDate.length - 1];
    const year = fullDate.slice(0, 4);
    const month = fullDate.slice(4, 6);
    const day = fullDate.slice(6, 8);
    if (type === "KOR") {
        return `${year}년 ${month}월 ${day}일`;
    } else if (type === "PURE") {
        return `${year}${month}${day}`;
    } else {
        return `${year}-${month}-${day}`;
    }
};

function main() {
    const postsDirectory = path.join(process.cwd(), "_posts");
    const fileNames = fs.readdirSync(postsDirectory);
    const postPages = fileNames.map((it) => {
        const id = it.split(".json")[0];
        const date = getDateById(id, "DATE");
        return {
            url: `https://shopcollector.vercel.app/dailybest/${id}`,
            date: new Date(date),
        };
    });
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
     xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
       xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
     xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
         ${postPages
             .map((item) => {
                 return `<url>
             <loc>${item.url}</loc>
             <lastmod>${item.date}</lastmod>
             <changefreq>monthly</changefreq>
             <priority>1.0</priority>
           </url>
           `;
             })
             .join("")}
        </urlset>
      `;
    console.log("SITEMAP GENERATED!!!");
    console.log(sitemap);
    fs.writeFileSync(path.join("./.next/static", "sitemap.xml"), sitemap);
}

main();
