// test-utils.js
// this is a custom render method that wraps the component in a IntlProvider
// this is useful for testing when you have components that use react-intl
// see https://testing-library.com/docs/example-react-intl
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import enTranslations from "i18n/en";
// the last import explicitly gives the translations to the IntlProvider
// this cleans up the tests from React Intl "Missing message" errors in console

function render(ui, { locale = "en", ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return (
      <IntlProvider locale={locale} messages={enTranslations}>
        {children}
      </IntlProvider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";

// override render method
export { render };
