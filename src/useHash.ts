import { useCallback, useState } from "react";
import useLifecycles from "./useLifecycles";
import { off, on } from "./misc/util";

/**
 * read and write url hash, response to url hash change
 */
export const useHash = () => {
  const [hash, setHash] = useState(() =>
    typeof window !== "undefined" ? window.location.hash : "",
  );

  const onHashChange = useCallback(() => {
    if (typeof window !== "undefined") {
      setHash(window.location.hash);
    }
  }, []);

  useLifecycles(
    () => {
      if (typeof window !== "undefined") {
        on(window, "hashchange", onHashChange);
      }
    },
    () => {
      if (typeof window !== "undefined") {
        off(window, "hashchange", onHashChange);
      }
    },
  );

  const _setHash = useCallback(
    (newHash: string) => {
      if (typeof window !== "undefined" && newHash !== hash) {
        window.location.hash = newHash;
      }
    },
    [hash],
  );

  return [hash, _setHash] as const;
};
