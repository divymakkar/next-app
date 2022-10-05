import { useEffect, useState } from "react";
import moment from "moment";

export const DateParseFormat = "MMM Do YY";

export const dateFormatter = (date: string | Date) => {
  return moment(date, DateParseFormat);
};

export const useMediaQuery = (query: any) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};
