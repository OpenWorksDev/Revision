import Router from "next/router";
import nProgress from "nprogress";
import { Html, Head, Main, NextScript } from "next/document";

Router.onRouteChangeStart = (url) => {
  console.log(url);
  nProgress.start();
};

Router.onRouteChangeComplete = () => nProgress.done();
Router.onRouteChangeErr = () => nProgress.done();

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="A revision application designed by crunchy and grey" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
          integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
