"use client";

import useOnClickOutside from "@/utils/hooks/useOnClickOutside";
import FormDataAttrs from "@/utils/interfaces/FormDataAttrs";
import FormDataProps from "@/utils/interfaces/FormDataProps";
import { cls } from "@/utils/utl";
import { format, parse, isValid as isDateValid } from 'date-fns';
import React, { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useMemo } from "react";
import { DayPicker } from 'react-day-picker';

interface Props extends FormDataProps {
  className?: string
}

const DATE_FORMAT = "yyyy-MM-dd";

const DatePicker = (props: Props, ref: ForwardedRef<FormDataAttrs>) => {
  const anchorRef = React.useRef(null);
  const [isValid, toggleIsValid] = React.useState<boolean>(true);
  const [isOpenPicker, togglePicker] = React.useState<boolean>(false);
  const [date, setDate] = React.useState<string>(format(new Date(), DATE_FORMAT));
  useOnClickOutside(anchorRef, () => togglePicker(false));

  useImperativeHandle(ref, () => ({
    validate() {
      return isValid;
    },
    getData() {
      return date;
    },
  }));

  useEffect(() => {
    toggleIsValid(isDateValid(parse(date, DATE_FORMAT, new Date())))
  }, [date]);

  return <div className={cls("relative", props.className || "")} ref={anchorRef}>
    <input className={cls("rounded h-[40px] px-3 w-full text-gray placeholder-current text-2xl", !isValid ? "data-invalid" : "")} placeholder="Date"
      onFocus={() => togglePicker(true)}
      onChange={(ev) => setDate(ev.target.value)}
      value={date}
    />
    {isOpenPicker && <div className="absolute rounded bg-white left-0 top-100 mt-1">
      <DayPicker
        mode="single"
        showOutsideDays
        selected={parse(date, DATE_FORMAT, new Date())}
        onSelect={date => {
          setDate(format(date!, DATE_FORMAT));
          togglePicker(false);
        }}
      />
    </div>}
  </div>
}

export default forwardRef<FormDataAttrs, Props>(DatePicker);