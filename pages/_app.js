import React, { Suspense, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "antd/dist/antd.css";
// import "./App.css";
import "../css/style.css";
import Loading from "../components/config/Loading";
import Head from "next/head";
import Script from "next/script";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/router";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      // console.log(
      //   `App is changing to ${url} ${
      //     shallow ? "with" : "without"
      //   } shallow routing`
      // );
      setLoaded(true);
    };

    const handleRouteChangeComplete = (url, { shallow }) => {
      // console.log(
      //   `App is changed to ${url} ${
      //     shallow ? "with" : "without"
      //   } shallow routing`
      // );
      setLoaded(false);
    };

    const handleRouteChangeError = (err, url) => {
      if (err.cancelled) {
        // console.log(`Route to ${url} was cancelled!`);
        setLoaded(false);
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.on("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Head>
          <script
            type="text/javascript"
            src="https://code.jquery.com/jquery-1.12.4.min.js"
          ></script>

          <script
            type="text/javascript"
            src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
          ></script>
        </Head>
        {loaded ? <Loading /> : <Component {...pageProps} />}
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
