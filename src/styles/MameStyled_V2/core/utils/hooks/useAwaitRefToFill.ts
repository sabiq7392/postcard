import { MutableRefObject, useState } from "react";

// export default function useAwaitRefToFill(refElement?: MutableRefObject<HTMLElement | undefined>, element?: HTMLElement) {
export default function useAwaitRefToFill(): any {
  const [isRefFilled, setIsRefFilled] = useState<boolean>(false);

  function setRefElement(refElement: MutableRefObject<HTMLElement | undefined>, element: HTMLElement): void {
    refElement.current = element; 
    setIsRefFilled(!!element);
  }

  return [isRefFilled, setRefElement];
}
