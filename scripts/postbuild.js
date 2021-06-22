//@ts-ignore
const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
function productNameSpinner(val) {
    var pattern = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi;
    if (pattern.test(val)) {
        val = val.replace(pattern, "");
    }
    return val;
}
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

const getPostPages = () => {
    const postsDirectory = path.join(process.cwd(), "_posts");
    const fileNames = fs.readdirSync(postsDirectory);
    const postPages = fileNames.map((it) => {
        const id = it.split(".json")[0];
        const date = new Date(getDateById(id, "DATE"));
        const rawDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        return {
            url: `https://shopcollector.vercel.app/dailybest/${id}`,
            date: rawDate,
        };
    });
    return postPages;
};

const getPostDetailPages = () => {
    const postsDirectory = path.join(process.cwd(), "_posts");
    const files = fs.readdirSync(postsDirectory);
    let postDetailItemList = [];
    files.forEach((file) => {
        const id = file.split(".json")[0];
        const date = new Date(getDateById(id, "DATE"));
        const rawDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const fileContent = JSON.parse(fs.readFileSync(postsDirectory + "/" + file));
        const curItemList = fileContent.item_list.map((item) => {
            return {
                url: `https://shopcollector.vercel.app/product/${productNameSpinner(item.productName)}-${
                    item.productId
                }`,
                date: rawDate,
            };
        });
        postDetailItemList = postDetailItemList.concat(curItemList);
    });
    return postDetailItemList;
};

function main() {
    const postPages = getPostPages();
    const postDetailPages = getPostDetailPages();

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
             ${postDetailPages
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
    fs.writeFileSync(path.join("./.next/static", "sitemap.xml"), sitemap);

    fetch("http://www.google.com/ping?sitemap=https://shopcollector.vercel.app/sitemap.xml").then(() =>
        console.log("SUCCESS TO PING")
    );
}

main();
