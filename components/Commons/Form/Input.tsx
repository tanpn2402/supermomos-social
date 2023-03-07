import FormDataAttrs from "@/utils/interfaces/FormDataAttrs";
import FormDataProps from "@/utils/interfaces/FormDataProps";
import { cls } from "@/utils/utl";
import { ChangeEvent, ForwardedRef, forwardRef, HTMLInputTypeAttribute, useCallback, useImperativeHandle, useRef, useState } from "react";


interface Props extends FormDataProps {
  type?: HTMLInputTypeAttribute | undefined
  min?: number
  max?: number
  className?: string
  placeHolder?: string

  isValidateOnChange?: boolean
  validationHandler?: (p: string | undefined) => boolean
}

const Input = (props: Props, ref: ForwardedRef<FormDataAttrs>) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isValid, toggleIsValid] = useState<boolean>(true);

  useImperativeHandle(ref, () => ({
    validate() {
      if (props.validationHandler) {
        let isValid = props.validationHandler(inputRef.current?.value);
        toggleIsValid(isValid);
        return isValid;
      }
      else {
        return true;
      }
    },
    getData() {
      return inputRef.current?.value;
    },
  }));

  const handleChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    if (props.isValidateOnChange && props.validationHandler) {
      toggleIsValid(props.validationHandler(ev.target.value));
    }
  }, [props]);

  return <input ref={inputRef} className={cls("rounded h-[40px] placeholder-current", props.className || "", !isValid ? "data-invalid" : "")}
    placeholder={props.placeHolder}
    onChange={handleChange}
    type={props.type}
    min={0}
  />
}

export default forwardRef<FormDataAttrs, Props>(Input);