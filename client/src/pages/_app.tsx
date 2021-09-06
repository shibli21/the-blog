import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { Router } from "next/router";
import NProgress from "nprogress";
import Fonts from "../theme/Fonts";
import "../theme/nprogress.css";
import theme from "../theme/theme";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
