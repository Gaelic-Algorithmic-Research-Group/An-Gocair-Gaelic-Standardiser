// components/header.tsx

import { useIntl } from "react-intl";

export default function Header() {
  const intl = useIntl();
  const headTitle = intl.formatMessage({ id: "headtitle" });
  return (
    <header>
      {/* Note here we are using Tailwind CSS for styling */}
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold leading-tight text-center">
          {headTitle}
        </h1>
      </div>
    </header>
  );
}
