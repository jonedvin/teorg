import "../styles/globals.css";
import { useState, useEffect } from "react";
import liff from "@line/liff";

function MyApp({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    if (typeof window !== 'undefined') {

      // Initialize LIFF
      console.log("start liff.init()...");
      liff
        .init({ liffId: process.env.LIFF_ID })
        .ready.then(() => {
          console.log("liff.init() done");
          setLiffObject(liff);
        })
        .catch((error) => {
          console.log(`liff.init() failed: ${error}`);
          if (!process.env.LIFF_ID) {
            console.info(
              "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
            );
          }
          setLiffError(error.toString());
        })
    }
  }, []);

  // Provide `liff` object and `liffError` object
  // to page component as property
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return <Component {...pageProps} />;
}

export default MyApp;
