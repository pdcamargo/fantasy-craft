import { useMutation } from "@tanstack/react-query";
import { useRef, useCallback, useEffect } from "react";

function debounce(fn: Function, delay: number) {
  let timeoutId: any | null = null;
  function debouncedCallback(...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  }

  debouncedCallback.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return debouncedCallback;
}

export const useDebouncedSave = (
  saveFunction: (value: any) => Promise<any>,
  delay: number = 300,
) => {
  const latestValueRef = useRef<any | null>(null);
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

  const saveValue = (value: any) => {
    if (isSaving.current) {
      latestValueRef.current = value;
    } else {
      isSaving.current = true;
      mutation.mutate(value);
    }
  };

  const debouncedSave = useCallback(debounce(saveValue, delay), []);

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  return debouncedSave;
};
