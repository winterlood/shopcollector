import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "_posts");

export function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.json`);
    const fileContent = fs.readFileSync(fullPath, "utf8");
    return { id: id, data: fileContent };
}

export function getStoredPostList() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        const id = fileName.replace(/\.json$/, "");
        return {
            params: {
                id: id,
            },
        };
    });
}

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        var id = fileName.replace(/\.json$/, "");
        id = id.split("@")[0];

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Combine the data with the id
        return {
            product: id,
        };
    });
    // Sort posts by date
    return allPostsData;
}
