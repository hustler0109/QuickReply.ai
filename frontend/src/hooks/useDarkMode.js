// // import { useEffect, useState } from "react";

// // export default function useDarkMode() {
// //   const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

// //   useEffect(() => {
// //     document.documentElement.classList.toggle("dark", dark);
// //     localStorage.setItem("theme", dark ? "dark" : "light");
// //   }, [dark]);

// //   return [dark, setDark];
// // }

// import { useEffect, useState } from "react";

// export default function useDarkMode() {
//   const [dark, setDark] = useState(
//     () => localStorage.getItem("theme") === "dark"
//   );

//   useEffect(() => {
//     const root = window.document.documentElement;
//     if (dark) {
//       root.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       root.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   }, [dark]);

//   return [dark, setDark];
// }
import { useEffect, useState } from "react";

export default function useDarkMode() {
  const getInitialTheme = () => {
    if (typeof window === "undefined") return false;

    const stored = localStorage.getItem("theme");
    if (stored) return stored === "dark";

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "theme") {
        setDark(e.newValue === "dark");
      }
    };
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, []);

  return [dark, setDark];
}
