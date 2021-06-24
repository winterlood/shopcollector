import "styles/globals.scss";
import "styles/product.scss";
import "styles/Layout.scss";
import "styles/Footer.scss";
import "styles/Header.scss";
import "styles/DailyBestHome.scss";
import "styles/ProductHome.scss";
import "styles/ProductDetail.scss";
import Head from "next/head";

const googleAnalyticsTag = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-EPC17P7MRQ');
`;
function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <script async src="https://www.googletagmanager.com/gtag/js?id=G-EPC17P7MRQ"></script>
                <script dangerouslySetInnerHTML={{ __html: googleAnalyticsTag }}></script>
                <meta name="google-site-verification" content="Crt5iVgpjWMM_wix5Y8ToBQvkjogLpYyYnttvNIeXZ0" />
            </Head>
            <Component {...pageProps} />
            <footer></footer>
        </div>
    );
}

export default MyApp;
