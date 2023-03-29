// components/navigation-links.tsx

import { useIntl } from "react-intl";

export default function NavigationLinks() {
  const intl = useIntl();
  const navLink1 = intl.formatMessage({ id: "home" });
  const navLink2 = intl.formatMessage({ id: "transcriber" });
  const navLink3 = intl.formatMessage({ id: "analyser" });
  return (
    <nav>
      <ul className="flex justify-center">
        <li className="px-4 py-2">
          <a href="https://garg.ed.ac.uk">{navLink1}</a>
        </li>
        <li className="px-4 py-2">
          <a href="https://sgriobhadair.garg.ed.ac.uk">{navLink2}</a>
        </li>
        <li className="px-4 py-2">
          <a href="https://sgrudaire.garg.ed.ac.uk">{navLink3}</a>
        </li>
      </ul>
    </nav>
  );
}
