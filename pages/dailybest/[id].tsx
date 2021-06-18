import React, { useState, useEffect } from "react";
import fs from "fs";
import path from "path";
import { getStoredPostList, getPostData } from "lib/posts";
import Layout from "component/Layout";

const Product = ({ postData }) => {
    const pageData = JSON.parse(postData.data);

    return (
        <Layout>
            <div className="Product">
                <div className="page_header">
                    <h2>{pageData.title} BEST 20</h2>
                    <span>실시간 {pageData.title}의 BEST20 상품입니다</span>
                </div>
                <div className="item_list">
                    {pageData?.item_list.map((it) => (
                        <div className="card">
                            <div className="mask">
                                <div className="cup_btn">
                                    <a href={it.productUrl} target="_blank">
                                        상세페이지
                                    </a>
                                </div>
                            </div>
                            <div
                                className="img_div"
                                style={{
                                    backgroundImage: `url('${it.productImage}')`,
                                }}
                            ></div>
                            <div className="info_div">
                                <div className="product_name">
                                    <h5>{it.productName}</h5>
                                </div>
                                <div className="price">{parseInt(it.productPrice).toLocaleString()}원</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticProps({ params }) {
    const postData = getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}

export async function getStaticPaths() {
    const post_list = getStoredPostList();
    const paths = post_list;
    return { paths, fallback: false };
}

export default Product;
