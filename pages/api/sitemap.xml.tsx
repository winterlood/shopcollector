import { getStoredPostList } from "lib/posts";

export default async (req, res) => {
    // Instead of static content this would be the place for a db request.
    const data = {
        title: "This is a title",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    };

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
   
    </urlset>
  `;

    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
};
