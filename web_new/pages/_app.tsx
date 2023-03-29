// pages/_app.tsx
// This file overrides Next.js' default `App` component to initialize pages,
// and allows us to control initialization.
// More info here: https://nextjs.org/docs/advanced-features/custom-app
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import "../styles/globals.css";
import "../styles/style.css"; // this adds the page style (blue header, etc.)
import { useState } from "react";
import I18nProvider, { I18nLocale } from "@/providers/I18Provider";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  const [locale, setLocale] = useState<I18nLocale>("en");
  // wrap the page with our custom i18n provider
  return (
    <I18nProvider locale={locale}>
      <select
        className="language_selector"
        onChange={(e) => setLocale(e.target.value as I18nLocale)}
        defaultValue={locale}
      >
        <option value="en">English</option>
        <option value="gd">Gàidhlig</option>
      </select>
      {/* add our custom layout */}
      <Toaster
        position="top-center"
        toastOptions={{
          className: "bg-gray-50 shadow-sm font-medium",
        }}
      />
      <Layout>
        <Component {...pageProps} />{" "}
        {/* the `Component` prop is the active `page` */}
      </Layout>
    </I18nProvider>
  );
}
