import { useEffect, useState } from "react";


function useMobile(size: any = 768) {
  const [isMobile, setIsMobile] = useState<Boolean>(false);
  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  function handleWindowSizeChange() {

    if (window.innerWidth > size) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }

  return isMobile;
}
export default useMobile;
