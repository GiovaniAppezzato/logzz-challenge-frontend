import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.png"/>
        <link rel="stylesheet" href="https://fonts.bunny.net/css?family=poppins:400,500,600,700" />
      </Head>
      <body className="bg-body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
