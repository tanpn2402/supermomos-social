"use client";

import FormDataAttrs from "@/utils/interfaces/FormDataAttrs";
import FormDataProps from "@/utils/interfaces/FormDataProps";
import { cls } from "@/utils/utl";
import { ChangeEvent, ForwardedRef, forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";

const EventDescription = (props: FormDataProps, ref: ForwardedRef<FormDataAttrs>) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [isValid, toggleIsValid] = useState<boolean>(true);

  useImperativeHandle(ref, () => ({
    validate() {
      const isValid = textRef.current?.value.trim().length! > 0;
      toggleIsValid(isValid);
      return isValid;
    },
    getData() {
      return {
        "description": textRef.current?.value
      };
    }
  }));

  const handleChange = useCallback((ev: ChangeEvent<HTMLTextAreaElement>) => {
    toggleIsValid(textRef.current?.value.trim().length! > 0);
  }, []);

  return <>
    <label htmlFor="about" className="block text-base font-normal text-[#333333]">
      Description
    </label>
    <div className="mt-1.5">
      <textarea
        ref={textRef}
        rows={6}
        onChange={handleChange}
        className={cls("p-3 w-full rounded-lg border border-[#D0D5DD] text-gray-900 text-gray placeholder:text-gray-400", isValid ? "" : "data-invalid")}
        placeholder="Description of your event..."
        defaultValue=""
      />
    </div>
  </>
}

export default forwardRef<FormDataAttrs, FormDataProps>(EventDescription);