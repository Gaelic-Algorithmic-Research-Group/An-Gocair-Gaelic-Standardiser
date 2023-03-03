import I18nProvider, { I18nLocale } from 'providers/I18nProvider';
import { useState } from 'react';
import '../styles/globals.css';
import '../styles/style.css'; // this adds the page style (blue header, etc.)

function App({ Component, pageProps }) {

  const [locale, setLocale] = useState<I18nLocale>("en");
  return <I18nProvider locale={locale}>
    <select
      className="language_selector"
      onChange={(e) => setLocale(e.target.value as I18nLocale)}
      defaultValue={locale}
    >
      <option value="en">English</option>
      <option value="gd">Gàidhlig</option>
    </select>
    <Component {...pageProps} />
  </I18nProvider>;
}

export default App;
