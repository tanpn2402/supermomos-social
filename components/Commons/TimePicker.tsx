"use client";

import FormDataAttrs from "@/utils/interfaces/FormDataAttrs";
import FormDataProps from "@/utils/interfaces/FormDataProps";
import { cls } from "@/utils/utl";
import React, { ForwardedRef, forwardRef, useImperativeHandle } from "react";

type TimeOption = {
  id: string
  title: string
}

interface Props extends FormDataProps {
  className?: string
}

const TIME_OPTIONS = Array.from(Array(48).keys()).map(e => ({
  id: String(Math.floor(e / 2)).padStart(2, "0") + ":" + String(e % 2 === 0 ? "00" : "30") + "+00:00",
  title: String(Math.floor(e / 2)).padStart(2, "0") + ":" + String(e % 2 === 0 ? "00" : "30") + " (GMT+7)"
}));

const TimePicker = (props: Props, ref: ForwardedRef<FormDataAttrs>) => {
  const [selected, setSelected] = React.useState<TimeOption>(TIME_OPTIONS[20]);

  useImperativeHandle(ref, () => ({
    validate() {
      return true;
    },
    getData() {
      return selected.id;
    },
  }));

  return <div className={cls("relative w-full", props.className || "")}>
    <select className="rounded h-[40px] px-3 w-full placeholder-current" value={selected.id}
      onChange={ev => setSelected(TIME_OPTIONS.filter(e => e.id === ev.target.value)[0])}>
      {TIME_OPTIONS.map(e => <option key={e.id} className="p-2 hover:bg-gray-200 cursor-pointer" value={e.id}>
        {e.title}
      </option>)}
    </select>
  </div>
}

export default forwardRef<FormDataAttrs, Props>(TimePicker);