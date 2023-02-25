import React, { Fragment, ReactNode, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clsx from "clsx";

export interface ModalProps {
  open: boolean;
  setOpen: (flag: boolean) => void;
  onClose?: () => void;
  showCloseIcon?: Boolean;
  className?: string;
  overlayClass?: string;
  restrainWidth?: boolean;
  dialogClass?: string;
  zeroPadding?: boolean;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open,
  setOpen,
  onClose,
  children,
  className,
  overlayClass = "bg-gray-700",
  restrainWidth = true,
  dialogClass,
  zeroPadding = false,
}) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={clsx("fixed z-[1000] inset-0 overflow-y-auto", dialogClass)}
        initialFocus={cancelButtonRef}
        onClose={onClose ?? setOpen}
      >
        <div
          className={clsx(
            "modal flex items-center sm:items-end justify-center min-h-screen text-center sm:block",
            !zeroPadding && "px-4 py-10"
          )}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay
              className={clsx("fixed inset-0 transition-opacity", overlayClass)}
            />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={clsx(
                { "max-w-xl": restrainWidth },
                "inline-block sm:align-middle align-bottom",
                className
              )}
            >
              <div className="bg-white rounded-lg shadow-xl transform transition-all w-fit">
                {children}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
