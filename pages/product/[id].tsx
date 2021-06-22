import CupAd from "component/CupAd";
import Layout from "component/Layout";
import { getDetailPostData, getDetailPostList } from "lib/posts";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
type Props = {};
const ProductDetail = ({ postData }) => {
    const pageData = postData.params;
    const linkRef = useRef(null);
    const DynamicCupDynamic = dynamic(() => import("component/CupAd"));
    const ogObj = {
        title: `${pageData.keyword}분야 ${pageData.rank}위 - ${pageData.productName}`,
        description: `${pageData.productName}`,
        image: `${pageData.productImage}`,
        keyword: `${pageData.keyword}, ${pageData.productName}`,
    };

    console.log(pageData.productName.split(" "));
    return (
        <Layout>
            <Head>
                <title>{ogObj.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="keywords" content={ogObj.keyword} />
                <meta name="description" content={ogObj.description} />
                <meta property="og:title" content={ogObj.title} />
                <meta property="og:description" content={ogObj.description} />
                <meta property="og:image" content={ogObj.image} />
                <meta property="og:site_name" content="쿠팡 실시간 데일리 베스트 TOP20" />
                <meta property="og:type" content="product" />
                <meta property="product:price:amount" content={parseInt(pageData.productPrice).toLocaleString()} />
                <meta property="product:price:currency" content="KRW" />
                <meta name="robots" content="index" />
            </Head>
            <div className="ProductDetail">
                <div className="breadcumb">
                    <Link href={`/product`}>{"product >"}</Link> <span>{pageData.productName}</span>
                </div>
                <div className="product_header">
                    <div className="img_box" style={{ backgroundImage: `url('${pageData.productImage}')` }}></div>
                    <div className="info_box">
                        <div className="info_wrapper">
                            <div className="rank">{pageData.rank}위</div>
                            <div className="category">{pageData.keyword}</div>
                            <h1>{pageData.productName}</h1>
                            <div className="price">{parseInt(pageData.productPrice).toLocaleString()} 원</div>
                            <div className="freeshipping">{pageData.isFreeShipping && "무료배송"}</div>
                            <div>
                                {pageData.isRocket && (
                                    <>
                                        <img
                                            alt={"로켓배송"}
                                            src={"https://image10.coupangcdn.com/image/badges/rocket/rocket_logo.png"}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                        <div
                            onClick={() => {
                                if (linkRef.current) {
                                    linkRef.current.click();
                                }
                            }}
                            className="shop_btn"
                        >
                            <a ref={linkRef} target="_blank" href={pageData.productUrl}>
                                제품 상세정보 (할인가 적용)
                            </a>
                        </div>
                    </div>
                </div>
                <DynamicCupDynamic />
            </div>
        </Layout>
    );
};

export async function getStaticProps({ params }) {
    const id = params.id.split("-")[1];
    const postData = getDetailPostData(id);
    return {
        props: {
            postData,
        },
    };
}

export async function getStaticPaths() {
    const post_list = getDetailPostList();
    const paths = post_list;
    return { paths, fallback: false };
}

export default ProductDetail;
