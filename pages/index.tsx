import React, { useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { getImageByCategory, getStoredPostList } from "lib/posts";
import Layout from "component/Layout";
import { meta_types } from "@global_types";
import { url } from "inspector";

const DailyBestPostItem = (props: meta_types.DailyBestItem) => {
    const linkRef = useRef(null);
    return (
        <div
            onClick={() => {
                if (linkRef.current) [linkRef.current.click()];
            }}
            className="DailyBestPostItem"
            style={{
                backgroundImage: `url('${props.thumbnailImageUrl}')`,
            }}
        >
            <div className="info">
                <Link href={`/dailybest/${props.id}`}>
                    <a ref={linkRef}>{props.category}</a>
                </Link>
            </div>

            {/* {props.category} */}
            {/* <Link href={`/dailybest/${props.id}`}>click</Link> */}
        </div>
    );
};

const DailyBestSectionItem = ({ date, itemList }: { date: string; itemList: Array<meta_types.DailyBestItem> }) => {
    return (
        <div className="DailyBestSectionItem">
            <h5>{date}</h5>
            <div className="section_item_list">
                {itemList.map((item, idx) => (
                    <DailyBestPostItem key={`POSTITEM::${idx}`} {...item} />
                ))}
            </div>
        </div>
    );
};

const Home = (props) => {
    const { postData } = props;
    const DailyBestList = postData.map((it) => it.params);
    DailyBestList.sort((a, b) => {
        if (a.pureCreatedDate < b.pureCreatedDate) return 1;
        else if (a.pureCreatedDate > b.pureCreatedDate) return -1;
        else return 0;
    });
    var DayList = [];
    DailyBestList.forEach((item) => {
        var matchIdx = DayList.findIndex((listItem) => listItem.date === item.createdDate);
        var curItem = {
            ...item,
        };
        if (matchIdx === -1) {
            DayList.push({ date: item.createdDate, itemList: [curItem] });
        } else {
            DayList[matchIdx].itemList.push(curItem);
        }
    });

    const ogObj = {
        title: "실시간 데일리 베스트",
        description: `${DayList.map((it) => {
            const day = it.date;
            const categories = it.itemList.map((item) => item.category + "TOP20").join(", ");
            return `${day} : ${categories}`;
        }).join(" / ")}`,
        image: "https://images.unsplash.com/photo-1607083681678-52733140f93a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    };

    console.log(ogObj.description);
    return (
        <Layout>
            <Head>
                <title>실시간 데일리 베스트</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content={ogObj.description} />
                <meta property="og:title" content={ogObj.title} />
                <meta property="og:description" content={ogObj.description} />
                <meta property="og:image" content={ogObj.image} />
                <meta property="og:site_name" content="쿠팡 실시간 데일리 베스트 TOP20" />
                <meta property="og:type" content="product" />
                <meta property="product:price:currency" content="KRW" />
                <meta name="robots" content="index" />
            </Head>
            <div className="Home">
                <div className="home_header">
                    <h2>실시간 데일리 베스트</h2>
                    <span>실시간 데일리 베스트는 2시간마다 업데이트 됩니다</span>
                </div>

                <div>
                    <div>
                        {DayList.map((dayItem, idx) => (
                            <DailyBestSectionItem key={`DAILY_BEST_SECTION::${idx}`} {...dayItem} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export async function getStaticProps({ params }) {
    const postData = getStoredPostList();
    return {
        props: {
            postData,
        },
    };
}

export default Home;
