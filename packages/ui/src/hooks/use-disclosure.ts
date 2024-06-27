import { useState } from "react";

export type UseDiscloseOptions = {
  defaultIsOpen?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
};

export type UseDiscloseReturn = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
};

/**
 * A hook to manage the open and close state of a component with supoprt for controlled and uncontrolled states.
 *
 * @param options - The options for the hook.
 * @returns The state and functions to open, close, and toggle the state.
 */
export function useDisclose(
  options: UseDiscloseOptions = {},
): UseDiscloseReturn {
  const {
    defaultIsOpen = false,
    isOpen: controlledIsOpen,
    onClose,
    onOpen,
  } = options;

  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const isControlled = controlledIsOpen !== undefined;

  const handleOpen = () => {
    setIsOpen(true);
    onOpen?.();
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const resolvedIsOpen = isControlled ? controlledIsOpen! : isOpen;

  return {
    isOpen: resolvedIsOpen,
    onOpen: handleOpen,
    onClose: handleClose,
    onToggle: handleToggle,
  };
}
