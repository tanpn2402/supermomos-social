import useOnClickOutside from "@/utils/hooks/useOnClickOutside";
import { cls } from "@/utils/utl";
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

interface DefaultProps {
  children: string | JSX.Element | JSX.Element[]
  className?: string
}

interface Props extends DefaultProps {
  defaultOpen?: boolean
  ignoreBodyScrolling?: boolean
}

interface ModalHandlers {
  toggle?: (p: boolean) => void
}

const Modal = (props: Props, ref: ForwardedRef<ModalHandlers>) => {
  const anchorRef = useRef<HTMLInputElement>(null);
  const [isOpen, toggleOpen] = useState<boolean>(props.defaultOpen || false);
  useOnClickOutside(anchorRef, () => toggleOpen(false));

  useImperativeHandle(ref, () => ({
    toggle(p: boolean) {
      toggleOpen(p);
    },
  }));

  useEffect(() => {
    if (!props.ignoreBodyScrolling) {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      }
      else {
        document.body.style.overflow = "auto";
      }
    }
  }, [isOpen]);

  return <div className={cls("modal", props.className || "", isOpen ? "block" : "")}>
    <div className="modal-dialog">
      <div ref={anchorRef} className="modal-content">
        {props.children}
      </div>
    </div>
    <div className="modal-backdrop"></div>
  </div>
}

const Header = (props: DefaultProps) => {
  return <div className={cls("modal-header", props.className || "")}>
    {props.children}
  </div>
}

const Body = (props: DefaultProps) => {
  return <div className={cls("modal-body", props.className || "")}>
    {props.children}
  </div>
}

const Footer = (props: DefaultProps) => {
  return <div className={cls("modal-footer", props.className || "")}>
    {props.children}
  </div>
}

export default {
  Main: forwardRef<ModalHandlers, Props>(Modal),
  Header,
  Body,
  Footer
};