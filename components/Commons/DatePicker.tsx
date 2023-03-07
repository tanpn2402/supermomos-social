"use client";

import useOnClickOutside from "@/utils/hooks/useOnClickOutside";
import { format, } from 'date-fns';
import React from "react";
import { DayPicker } from 'react-day-picker';

const DatePicker = () => {
  const ref = React.useRef(null);
  const [isOpenPicker, togglePicker] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<Date>(new Date());
  useOnClickOutside(ref, () => togglePicker(false));

  return <div className="relative" ref={ref}>
    <input className="rounded h-[40px] px-3 w-full placeholder-current" placeholder="Date"
      onFocus={ev => togglePicker(true)}
      defaultValue={format(selected, "yyyy-MM-dd")}
    />
    {isOpenPicker && <div className="absolute rounded bg-white left-0 top-100 mt-1">
      <DayPicker
        mode="single"
        showOutsideDays
        selected={selected}
        onSelect={date => {
          setSelected(date!);
          togglePicker(false);
        }}
      />
    </div>}
  </div>
}

export default DatePicker;