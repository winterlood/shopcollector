import "styles/globals.scss";
import "styles/product.scss";
import "styles/Layout.scss";
import "styles/Footer.scss";
import "styles/Header.scss";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <meta name="google-site-verification" content="Crt5iVgpjWMM_wix5Y8ToBQvkjogLpYyYnttvNIeXZ0" />
            </Head>
            <Component {...pageProps} />
            <footer></footer>
        </div>
    );
}

export default MyApp;
