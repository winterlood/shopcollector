import React from "react";
import Head from "next/head";
import Link from "next/link";
import { getStoredPostList } from "lib/posts";

const Home = (props) => {
    const { postData } = props;
    return (
        <div>
            <Head>
                <title>My page title</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <h2>SHOP COLLECTOR</h2>
            <div>
                <h4>게시글 리스트</h4>
                <div>
                    {postData.map((item, idx) => {
                        return (
                            <Link href={`/dailybest/${item.params.id}`}>
                                <div>
                                    <a>{item.params.id}</a>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
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
