import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
        <script src="https://unpkg.com/moralis/dist/moralis.js"></script>
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}