import "styles/globals.scss";
import "styles/product.scss";
import "styles/Layout.scss";
function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Component {...pageProps} />
            <footer></footer>
        </div>
    );
}

export default MyApp;
