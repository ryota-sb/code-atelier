import Document, { Head, Html, Main, NextScript } from "next/document";
import GoogleAnalytics from "components/GoogleAnalytics";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja" dir="ltr" prefix="og: http://ogp.me/ns#">
        <Head>
          <GoogleAnalytics />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
