// Module that uses React Intl for Internationalization
import { PropsWithChildren, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";

import en from "@/i18n/en";

// this is our own custom type for the two locales
export type I18nLocale = "en" | "gd";

// use an interface to describe the requirement of having a `locale` property of type `I18nLocale`
interface I18nProviderProps {
  locale: I18nLocale;
}

export default function I18nProvider({
  children,
  locale,
}: PropsWithChildren<I18nProviderProps>) {
  // Declare a new `messages` state variable.
  // The set function `setMessages` allows to update the state
  // to a different value and trigger a re-render.
  // Record<Keys, Type> constructs an object type whose property
  // keys are `Keys` and whose property values are `Type`.
  const [messages, setMessages] = useState<Record<keyof typeof en, string>>(en);

  // Now make use of the `useEffect` Hook, where the function we pass
  // dynamically loads (i.e. on demand) the requested locale
  useEffect(() => {
    import(`i18n/${locale}`).then((msg) => setMessages(msg.default));
  });

  // Finally we wrap it up with the `IntlProvider` component
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
