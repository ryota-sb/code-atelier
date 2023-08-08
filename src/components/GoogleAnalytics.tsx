import Script from "next/script";
import { GA_ID } from "libs/gtag";

const GoogleAnalytics = () => {
  return (
    <>
      {GA_ID && (
        <>
          <Script
            defer
            id="ga-connect"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />

          <Script
            defer
            id="ga-track"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag() {
                  dataLayer.push(arguments);
                }
                gtag("js", new Date());
                gtag("config", '${GA_ID}', {
                  page_path: window.location.pathname
                });
              `,
            }}
          />
        </>
      )}
    </>
  );
};

export default GoogleAnalytics;
