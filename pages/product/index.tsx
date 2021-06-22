import Layout from "component/Layout";
import { getDetailPostList } from "lib/posts";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

type Props = {};

const ProductDetailItem = (props) => {
    return (
        <div className="ProductDetailItem">
            <div className="img_box" style={{ backgroundImage: `url('${props.productImage}')` }}></div>
            <div className="info_box">
                <div className="meta_info">
                    <span className="rank">{props.rank} 위</span>
                    <span className="category"> {props.keyword}</span>
                </div>
                <div className="title">
                    <Link href={`/product/${props.id}`}>{props.productName}</Link>
                </div>
                <div className="badge_list">
                    {props.isRocket && (
                        <img
                            alt={"로켓배송"}
                            src={"https://image10.coupangcdn.com/image/badges/rocket/rocket_logo.png"}
                        />
                    )}
                    {props.isFressShipping && <div className="freeshipping">무료 배송</div>}
                </div>
            </div>
        </div>
    );
};

//

const KeywordItem = (props) => {
    return (
        <div className={`KeywordItem ${props.isSelected ? "on" : ""}`}>
            <Link href={{ pathname: "/product", query: { keyword: props.keyword } }}>{props.keyword}</Link>
        </div>
    );
};

const ProductHome = (props) => {
    const router = useRouter();
    const nowKeyword = router.query.keyword || "전체";

    const { postData } = props;
    const postDataList = postData.map((it) => it.params);
    const keywordList = [];
    keywordList.push("전체");
    postDataList.forEach((item) => {
        var targetIdx = keywordList.indexOf(item.keyword);
        if (targetIdx === -1) {
            keywordList.push(item.keyword);
        }
    });
    const renderList =
        nowKeyword === "전체"
            ? postDataList.filter((it) => it.rank <= 3)
            : postDataList.filter((it) => it.keyword === nowKeyword);

    const ogObj = {
        title: "실시간 데일리 베스트 키워드별 상품 랭킹",
        description: `${renderList.map((it) => it.productName).join(",")}
        `,
        image: "https://images.unsplash.com/photo-1607083681678-52733140f93a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
        keyword: `${keywordList.map((it) => it).join(", ")}`,
    };
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
                <meta property="product:price:currency" content="KRW" />
                <meta name="robots" content="index" />
            </Head>
            <div className="ProductHome">
                <div className="keyword_list">
                    {keywordList.map((it, idx) => {
                        const isSelected = it === nowKeyword;
                        return <KeywordItem key={`KWDITEM${idx}`} keyword={it} isSelected={isSelected} />;
                    })}
                </div>
                <div className="item_list">
                    {renderList.map((it, idx) => (
                        <ProductDetailItem key={`PDITEM${idx}`} {...it} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticProps() {
    const postData = getDetailPostList(true);
    return {
        props: {
            postData,
        },
    };
}

export default ProductHome;
