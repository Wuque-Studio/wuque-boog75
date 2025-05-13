import '../styles/global.css';
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";

import en from "../locales/en.json";
import zhCN from "../locales/zh-CN.json";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const messages = {
  "en": en,
  "zh-CN": zhCN,
}

export default function App({ Component, pageProps }) {
  const { locale } = useRouter();

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Component {...pageProps} />
    </IntlProvider>
  )
}