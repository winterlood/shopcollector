import CupAd from "component/CupAd";
import Layout from "component/Layout";
import { getDetailPostData, getDetailPostList } from "lib/posts";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
type Props = {};
const ProductDetail = ({ postData }) => {
    const pageData = postData.params;
    const linkRef = useRef(null);
    const DynamicCupDynamic = dynamic(() => import("component/CupAd"));

    return (
        <Layout>
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
