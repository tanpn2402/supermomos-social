import FormDataAttrs from "@/utils/interfaces/FormDataAttrs";
import FormDataProps from "@/utils/interfaces/FormDataProps";
import { ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";


interface Props extends FormDataProps {
  children: string | JSX.Element | JSX.Element[]
  className?: string
}

const RadioGroup = (props: Props, ref: ForwardedRef<FormDataAttrs>) => {
  const groupRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useImperativeHandle(ref, () => ({
    validate() {
      return selected !== null;
    },
    getData() {
      return selected;
    },
  }));

  const getSelected = useCallback(() => {
    if (groupRef.current) {
      let inputs: HTMLCollectionOf<HTMLInputElement> = groupRef.current.getElementsByTagName("input");
      for (let index = 0; index < inputs.length; index++) {
        if (inputs[index].checked === true) {
          return inputs[index].getAttribute("id");
        }
      }
    }
    return null;
  }, [groupRef]);

  useEffect(() => {
    setSelected(getSelected());
  }, [groupRef])

  return <div ref={groupRef} className={props.className || ""} onChange={ev => {
    setSelected((ev.target as HTMLElement).getAttribute("id"));
  }}>
    {props.children}
  </div>
}

export default forwardRef<FormDataAttrs, Props>(RadioGroup);