import React, { useState, useEffect } from "react";
type Props = {};
const Product = ({ paths, product }) => {
    console.log(product);
    const nowProduct = JSON.parse(product);
    console.log(nowProduct);
    return (
        <div className="Product">
            <h2>{nowProduct.title}</h2>

            <div className="item_list">
                {nowProduct.item_list.map((it) => (
                    <div className="card">
                        <div className="img">
                            <img src={it.product_image} />
                        </div>
                        <div className="text">{it.name}</div>
                        <div className="price">{it.price}</div>
                        <div className="click">
                            <a href="https://coupa.ng/bLPxY9" target="_blank">
                                더 알아보기
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export async function getStaticPaths() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();

    const paths = users.map((user) => ({
        params: { product: user.id.toString() },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    console.log(params);
    const filename = "2015.json";
    const file = require(`posts/${filename}`);
    const product = JSON.stringify(file);
    return { props: { product } };
}
export default Product;
