import React, { useState, useRef } from "react";
import fs from "fs";
import path from "path";
import { getStoredPostList, getPostData } from "lib/posts";
import Layout from "component/Layout";
import Head from "next/head";
import Link from "next/link";

const ProudctItem = ({ productName, productImage, productPrice, productUrl }) => {
    const linkRef = useRef(null);
    return (
        <div className="card">
            <div
                onClick={() => {
                    if (linkRef.current) {
                        linkRef.current.click();
                    }
                }}
                className="img_div"
                style={{
                    backgroundImage: `url('${productImage}')`,
                }}
            ></div>
            <div className="info_div">
                <div className="product_name">
                    <h5>
                        <a ref={linkRef} href={productUrl} target="_blank">
                            {productName}
                        </a>
                    </h5>
                </div>
                <div className="price">{parseInt(productPrice).toLocaleString()}원</div>
            </div>
        </div>
    );
};

const Product = ({ postData }) => {
    const pageData = JSON.parse(postData.data);
    console.log(postData.createdDate);
    return (
        <Layout>
            <Head>
                <title>
                    {postData.createdDate} {pageData.title} 데일리 베스트 TOP 20
                </title>
            </Head>
            <div className="Product">
                <div className="page_header">
                    <Link href={"/"}>
                        <label>HOME</label>
                    </Link>
                    <h2>
                        <label className="header_label">{postData.createdDate}</label>
                        <br />
                        {pageData.title} 데일리 베스트 TOP 20
                    </h2>
                    <span>실시간 {pageData.title}의 BEST20 상품입니다</span>
                </div>

                <div className="item_list">
                    <div className="top_banner center">
                        <iframe
                            src="https://ads-partners.coupang.com/widgets.html?id=492774&template=carousel&trackingCode=AF5219904&subId=&width=680&height=140"
                            width="2000"
                            height="140"
                            scrolling="no"
                            referrerPolicy="unsafe-url"
                            className="dynamic_banner"
                        ></iframe>
                    </div>
                    {pageData?.item_list?.map((it, idx) => (
                        <ProudctItem key={`PRODUCTITEM::${idx}`} {...it} />
                    ))}
                    <iframe
                        src="https://ads-partners.coupang.com/widgets.html?id=425184&template=banner&trackingCode=AF5219904&subId=&width=728&height=90"
                        width="728"
                        height="90"
                        scrolling="no"
                        referrerPolicy="unsafe-url"
                    ></iframe>
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
