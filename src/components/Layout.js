import Head from "next/head";
import Script from "next/script";
import styles from "../styles/layout.module.css";

export default function Layout({ children }) {
    return (
        <>
            <Head />
            <Script 
                src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"
                strategy="lazyOnload"
            />
            <Script 
                src="https://unpkg.com/moralis/dist/moralis.js"
                strategy="lazyOnload"
            />
            <main className={styles.main}>{children}</main>
        </>
    );
}