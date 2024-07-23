import { useMutation } from "@tanstack/react-query";
import { useRef, useCallback, useEffect } from "react";

import debounce from "lodash/debounce";

export const useDebouncedSave = <T = any>(
  saveFunction: (value: T) => Promise<any>,
  delay: number = 300,
) => {
  const latestValueRef = useRef<T | null>(null);
  const isSaving = useRef<boolean>(false);

  const mutation = useMutation({
    mutationFn: saveFunction,
    onSuccess: () => {
      if (latestValueRef.current !== null) {
        const nextValue = latestValueRef.current;
        latestValueRef.current = null;
        saveValue(nextValue);
      } else {
        isSaving.current = false;
      }
    },
  });

  const saveValue = (value: T) => {
    if (isSaving.current) {
      latestValueRef.current = value;
    } else {
      isSaving.current = true;
      mutation.mutate(value);
    }
  };

  const debouncedSave = useCallback(debounce(saveValue, delay), [
    saveValue,
    delay,
  ]);

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        debouncedSave.flush();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [debouncedSave]);

  return debouncedSave;
};
