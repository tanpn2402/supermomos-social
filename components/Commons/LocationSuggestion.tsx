"use client";

import useDebounce from "@/utils/hooks/useDebounce";
import useOnClickOutside from "@/utils/hooks/useOnClickOutside";
import FormDataAttrs from "@/utils/interfaces/FormDataAttrs";
import FormDataProps from "@/utils/interfaces/FormDataProps";
import { cls } from "@/utils/utl";
import React, { ChangeEvent, ForwardedRef, forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

type Location = {
  id: string
  lat?: number
  long?: number
  name: string
  address: string
}

interface Props extends FormDataProps {
  className?: string
}

const LocationSuggestion = (props: Props, ref: ForwardedRef<FormDataAttrs>) => {
  const anchorRef = useRef(null);
  const [isLoading, toggleLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isOpenPicker, togglePicker] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);
  const [isValid, toggleIsValid] = React.useState<boolean>(true);

  useOnClickOutside(anchorRef, () => togglePicker(false));

  useImperativeHandle(ref, () => ({
    validate() {
      const isValid = validate(value);
      toggleIsValid(isValid);
      return isValid;
    },
    getData() {
      return value;
    },
  }));

  useEffect(() => {
    fetchData();
  }, [debouncedValue]);

  const validate = useCallback((value: string) => {
    return value.trim().length > 0;
  }, [value]);

  const fetchData = useCallback(() => {
    if (value.trim().length > 0 && isOpenPicker) {
      toggleLoading(true);
      setTimeout(() => {
        setSuggestions([
          {
            id: "1",
            name: "Chelsea Market",
            address: "163 W 20nd Street, Manhattan, NYC"
          },
          {
            id: "2",
            name: "Coffee Project",
            address: "155 7th Ave, New York, NYC"
          },
          {
            id: "3",
            name: "Slate NY",
            address: "54 W 21st St, New York, NYC"
          }
        ]);
        toggleLoading(false);
      }, 150)
    }
  }, [value, isOpenPicker]);

  const handleChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
    toggleIsValid(validate(ev.target.value));
  }, []);

  const handleChangeSelection = (p: Location) => {
    setValue(p.name + " " + p.address);
    togglePicker(false);
  }

  return <div className={cls("relative w-full", props.className || "")} ref={anchorRef}>
    <input className={cls("rounded h-[40px] px-3 w-full placeholder-current", isValid ? "" : "data-invalid")} placeholder="Location"
      onFocus={() => togglePicker(true)}
      value={value}
      onChange={handleChange}
    />
    {isOpenPicker && <div className="absolute rounded bg-white left-0 top-100 mt-1 w-full max-h-[200px] overflow-y-auto">
      {isLoading ?
        <div className="p-2 text-gray-500">Loading...</div>
        :
        suggestions.length < 1 ?
          <div className="p-2">No suggestion!</div>
          : <div>
            {suggestions.map(e => <div key={e.id} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleChangeSelection(e)}>
              {e.name} - {e.address}
            </div>)}
          </div>}
    </div>}
  </div>
}

export default forwardRef<FormDataAttrs, Props>(LocationSuggestion);