import UIKit from "./pages/UIKit";

export default function App() {
  return (
    <>
      <button
        onClick={() => document.documentElement.classList.toggle("dark")}
        className="fixed top-4 right-4 z-50 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
        aria-label="Tema degistir"
      >
        <span className="dark:hidden">&#9790;</span>
        <span className="hidden dark:inline">&#9728;</span>
      </button>

      <UIKit />
    </>
  );
}