export function restoredTheme(setIsLigthTheme) {
    const theme = localStorage.getItem("@theme");
    setIsLigthTheme(theme === "true");
}