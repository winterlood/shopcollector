import React, { useState, useRef } from "react";
import fs from "fs";
import path from "path";
import { getStoredPostList, getPostData, getImageByCategory } from "lib/posts";
import Layout from "component/Layout";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

const ProudctItem = ({ productName, productImage, productPrice, productUrl }) => {
    const linkRef = useRef(null);
    return (
        <div
            className="card"
            onClick={() => {
                if (linkRef.current) {
                    linkRef.current.click();
                }
            }}
        >
            <div
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
    // console.log(pageData.createdDate);
    console.log(postData);

    const ogObj = {
        title: `${postData.createdDate} ${pageData.title} 데일리 베스트 TOP 20`,
        description: `[${pageData.title} TOP20 추천] : ${pageData?.item_list
            .slice(0, 5)
            .map((it) => it.productName)} 외 20개의 상품 추천`,
        image: postData.thumbnailImage,
    };
    const DynamicCupDynamic = dynamic(() => import("component/CupAd"));

    return (
        <Layout>
            <Head>
                <title>
                    {postData.createdDate} {pageData.title} 데일리 베스트 TOP 20
                </title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"></meta>
                <meta name="keywords" content={pageData.keyword} />
                <meta name="description" content={ogObj.description} />
                <meta property="og:title" content={ogObj.title} />
                <meta property="og:description" content={ogObj.description} />
                <meta property="og:image" content={ogObj.image} />
                <meta property="og:site_name" content="쿠팡 실시간 데일리 베스트 TOP20" />
                <meta property="og:type" content="product" />
                <meta property="product:availability" content="instock" />
                <meta property="product:price:currency" content="KRW" />
                <meta property="article:published_time" content={postData.createdDate} />
                <meta name="robots" content="index" />
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
                    <DynamicCupDynamic />
                    {pageData?.item_list?.map((it, idx) => (
                        <ProudctItem key={`PRODUCTITEM::${idx}`} {...it} />
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
