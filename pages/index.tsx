import React, { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "component/Layout";
import { getDetailPostList, getSortedPostsData, getStoredPostList } from "lib/posts";

const CategoryItem = (props) => {
    const linkRef = useRef(null);
    return (
        <div
            className="CategoryItem"
            onClick={() => {
                if (linkRef.current) [linkRef.current.click()];
            }}
            style={{
                backgroundImage: `url('${props.thumbnailImageUrl}')`,
            }}
        >
            <div className="info">
                <Link href={`/dailybest/${props.id}`}>
                    <a ref={linkRef}>{props.category}</a>
                </Link>
            </div>
        </div>
    );
};

const ProductItem = (props) => {
    return (
        <div className="ProductItem">
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

const Home = (props) => {
    const { categoryList, productList } = props;
    console.log(props);
    return (
        <Layout>
            <Head>
                <title>실시간 데일리 베스트</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta property="og:site_name" content="쿠팡 실시간 데일리 베스트 TOP20" />
                <meta property="og:type" content="product" />
                <meta property="product:price:currency" content="KRW" />
                <meta name="robots" content="index" />
            </Head>
            <div className="Home">
                <section className="section_item">
                    <div className="item_header">
                        <h4># 가장 최근에 수집된 카테고리</h4>
                        <span>
                            <Link href={"/dailybest"}>+ 더 보기</Link>
                        </span>
                    </div>
                    <div className="item_slide_list">
                        {categoryList.map((it, idx) => (
                            <CategoryItem key={`CATEGORY_ITEM${idx}`} {...it} />
                        ))}
                    </div>
                </section>
                <section className="section_item">
                    <div className="item_header">
                        <h4># 가장 최근에 수집된 상품</h4>
                        <span>
                            <Link href={"/product"}>+ 더 보기</Link>
                        </span>
                    </div>
                    <div className="item_vertical_list">
                        {productList.map((it, idx) => (
                            <ProductItem key={`PRODUCT_ITEM${idx}`} {...it} />
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export async function getStaticProps({ params }) {
    const productList = getDetailPostList(true)
        .slice(0, 5)
        .map((it) => it.params);

    const categoryList = getStoredPostList()
        .sort((a, b) => {
            if (a.params.pureCreatedDate < b.params.pureCreatedDate) return 1;
            else if (a.params.pureCreatedDate > b.params.pureCreatedDate) return -1;
            else return 0;
        })
        .slice(0, 15)
        .map((it) => it.params);
    return {
        props: {
            productList,
            categoryList,
        },
    };
}

export default Home;
