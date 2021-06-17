import React, { useState, useEffect } from "react";
import fs from "fs";
import path from "path";
import { getStoredPostList, getPostData } from "lib/posts";

const postsDirectory = path.join(process.cwd(), "posts");

type Props = {};
const Product = ({ postData }) => {
    const pageData = JSON.parse(postData.data);
    // console.log(JSON.parse(pageData));
    return (
        <div className="Product">
            <h2>{pageData.title}</h2>

            <div className="item_list">
                {pageData?.item_list.map((it) => (
                    <div className="card">
                        <div className="img">
                            <img src={it.productImage} />
                        </div>
                        <div className="text">{it.productName}</div>
                        <div className="price">{it.productPrice}</div>
                        <div className="click">
                            <a href={it.productUrl} target="_blank">
                                더 알아보기
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export async function getStaticProps({ params }) {
    console.log(params);
    const postData = getPostData(params.id);
    console.log(postData);
    return {
        props: {
            postData,
        },
    };
}

export async function getStaticPaths() {
    const post_list = getStoredPostList();
    console.log(post_list);
    const paths = post_list;
    return { paths, fallback: false };
}

export default Product;
