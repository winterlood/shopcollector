import "styles/globals.scss";
import "styles/product.scss";
import "styles/Layout.scss";
import "styles/Footer.scss";
import "styles/Header.scss";
function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Component {...pageProps} />
            <footer></footer>
        </div>
    );
}

export default MyApp;
