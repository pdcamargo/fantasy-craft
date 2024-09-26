import { useMutation } from "@tanstack/react-query";
import { useRef, useCallback, useEffect } from "react";
import debounce from "lodash/debounce";

export const useDebouncedSave = <T = any>(
  saveFunction: (value: T) => Promise<any>,
  delay: number = 200,
) => {
  const latestValueRef = useRef<T | null>(null);
  const isSaving = useRef<boolean>(false);
  const debouncing = useRef<boolean>(false); // Track if debouncing is in progress

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

  // Regular save function
  const saveValue = useCallback(
    (value: T) => {
      if (isSaving.current) {
        latestValueRef.current = value;
      } else {
        isSaving.current = true;
        mutation.mutate(value);
      }
    },
    [mutation],
  );

  // Immediate save handler
  const immediateSave = useCallback(
    (value: T) => {
      if (!debouncing.current) {
        // If not debouncing, save immediately
        saveValue(value);
        debouncing.current = true;
      } else {
        // Otherwise, set for debounced save
        debouncedSave(value);
      }
    },
    [saveValue],
  );

  // Debounced save function
  const debouncedSave = useCallback(
    debounce((value: T) => {
      saveValue(value);
      debouncing.current = false; // Reset after debounce finishes
    }, delay),
    [saveValue, delay],
  );

  useEffect(() => {
    return () => {
      debouncedSave.cancel();
    };
  }, [debouncedSave]);

  // Handle visibility change (e.g., flushing the debounce when the user navigates away)
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

  return immediateSave;
};
