import { PropsWithChildren, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import en from "i18n/en";


export type I18nLocale = 'en' | 'gd';

interface I18nProviderProps {
  locale: I18nLocale;
}

function I18nProvider({children, locale}:  PropsWithChildren<I18nProviderProps>) {
  const [messages, setMessages] = useState<Record<keyof typeof en, string>>(en);
  useEffect(() => {
    import(`i18n/${locale}`).then(msg => setMessages(msg.default))
  }, [locale])
  return <IntlProvider locale={locale} messages={messages}>{children}</IntlProvider>
}

export default I18nProvider;
