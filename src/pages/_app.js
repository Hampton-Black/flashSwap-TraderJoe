import { MoralisProvider } from "react-moralis";
import "../styles/index.css";

const NoSSR = ({ children }) => (
    <>
        <div className="w-full h-full overflow-hidden" suppressHydrationWarning>
            {typeof window === 'undefined' ? null : children}
        </div>
    </>
)

function MyApp({ Component, pageProps }) {
    // use layout defined at page level, if available
    const getLayout = Component.getLayout || ((page) => page);

    return getLayout(
        <NoSSR>
            <MoralisProvider
                appId={process.env.MORALIS_APP_ID}
                serverUrl={process.env.MORALIS_SERVER_URL}
            >
                <Component {...pageProps} />
            </MoralisProvider>
        </NoSSR>
    );
}

export default MyApp;