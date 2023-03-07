"use client";

import useOnClickOutside from "@/utils/hooks/useOnClickOutside";
import { format, } from 'date-fns';
import React from "react";

type TimeOption = {
  id: string
  title: string
}

const TIME_OPTIONS = ["AM", "PM"].reduce((rlt, p) => {
  let arr = Array.from(Array(21).keys()).map(e => ({
    id: String(Math.floor(e / 2)).padStart(2, "0") + ":" + String(e % 2 === 0 ? "00" : "30") + p,
    title: String(Math.floor(e / 2)).padStart(2, "0") + ":" + String(e % 2 === 0 ? "00" : "30") + " " + p
  }));

  return rlt.concat(arr);
}, [] as TimeOption[]);

const TimePicker = () => {
  const ref = React.useRef(null);
  const [isOpenPicker, togglePicker] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<TimeOption>({ id: "10:00AM", title: "10:00 AM" });
  useOnClickOutside(ref, () => togglePicker(false));

  return <div className="relative" ref={ref}>
    <input className="rounded h-[40px] px-3 w-full placeholder-current" placeholder="Date"
      onFocus={ev => togglePicker(true)}
      defaultValue={selected.title}
    />
    {isOpenPicker && <div className="absolute rounded bg-white left-0 top-100 mt-1 w-full max-h-[200px] overflow-y-auto">
      {TIME_OPTIONS.map(e => <div key={e.id} className="p-2 hover:bg-gray-200 cursor-pointer"
        onClick={ev => {
          setSelected(e);
          togglePicker(false);
        }}>
        {e.title}
      </div>)}
    </div>}
  </div>
}

export default TimePicker;