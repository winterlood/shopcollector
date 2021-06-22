import Layout from "component/Layout";
import { getDetailPostList } from "lib/posts";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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
    return (
        <Layout>
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
