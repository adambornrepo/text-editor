import React, { useRef, useEffect, useState, useMemo } from "react";
import {
  useFloating,
  offset,
  shift,
  autoUpdate,
  size,
  inline,
  limitShift,
  useInteractions,
  useDismiss,
} from "@floating-ui/react";

const DropdownContainer = ({ isOpen, children, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef(null);
  const [containerElement, setContainerElement] = useState(undefined);

  useEffect(() => {
    const findContainer = () => {
      const container = document.querySelector(".text-editor-wrapper");
      if (container) {
        setContainerElement(container);
      }
    };

    findContainer();

    if (!containerElement) {
      const timeoutId = setTimeout(findContainer, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [containerElement]);

  const middleware = useMemo(
    () => [
      offset(6),
      shift({
        boundary: containerElement,
        limiter: limitShift({
          mainAxis: true,
          crossAxis: false,
        }),
      }),
      size({
        apply({ availableWidth, availableHeight, elements }) {
          if (elements.floating) {
            Object.assign(elements.floating.style, {
              maxWidth: `${availableWidth}px`,
              maxHeight: `${availableHeight}px`,
              overflow: "auto",
            });
          }
        },
        boundary: containerElement,
      }),
      inline(),
    ],
    [containerElement]
  );

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      if (!open) {
        onClose();
      }
    },
    middleware,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
  });

  const { getFloatingProps } = useInteractions([
    useDismiss(context),
  ]);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (triggerRef.current) {
      const buttonElement = triggerRef.current.querySelector("button");
      if (buttonElement) {
        refs.setReference(buttonElement);
      }
    }
  }, [refs]);

  return (
    <div ref={triggerRef}>
      {children[0]} {/* Trigger Buton */}
      {mounted && isOpen && (
        <div
          ref={refs.setFloating}
          {...getFloatingProps({
            style: {
              ...floatingStyles,
              zIndex: 10,
              backgroundColor: "white",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            },
          })}
        >
          {children[1]} {/* Dropdown Content */}
        </div>
      )}
    </div>
  );
};

export default DropdownContainer;
