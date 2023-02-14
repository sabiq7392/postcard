export default function pxToRem(size: number) {
  let value: string;
  let rootFontSizeBrowser: number;

  const setRootFontSizeBrowser = () => {
    const getRootFontSizeBrowser = window.getComputedStyle(document.body).fontSize;
    const seperatePxText = getRootFontSizeBrowser.split("px");
    const result = Number(seperatePxText[0]);

    return rootFontSizeBrowser = result;
  };

  const setValue = () => {
    const compute = size / rootFontSizeBrowser;
    const result = `${compute}rem`;

    value = result;

    return value;
  };
  
  // typeof window !== "undefined" ? setRootFontSizeBrowser() : "";
  setRootFontSizeBrowser();

  return setValue();
}
