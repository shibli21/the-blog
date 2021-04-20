import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Fonts from "../theme/Fonts";
import theme from "../theme/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
