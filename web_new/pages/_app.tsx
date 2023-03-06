// pages/_app.tsx
// This file overrides Next.js' default `App` component to initialize pages,
// and allows us to control initialization.
// More info here: https://nextjs.org/docs/advanced-features/custom-app
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import "../styles/globals.css";
import "../styles/style.css";
import { useState } from "react";
import I18nProvider, { I18nLocale } from "@/providers/I18Provider";

export default function App({ Component, pageProps }: AppProps) {
  const [locale, setLocale] = useState<I18nLocale>("en");
  // wrap the page with our custom i18n provider
  return (
    <I18nProvider locale={locale}>
      {/* add our custom layout */}
      <Layout>
        <Component {...pageProps} />{" "}
        {/* the `Component` prop is the active `page` */}
      </Layout>
    </I18nProvider>
  );
}
