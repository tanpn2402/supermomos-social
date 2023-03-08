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

  const validate = useCallback((value: string) => {
    return value.trim().length > 0;
  }, [value]);

  const fetchData = useCallback(() => {
    if (value.trim().length > 0 && isOpenPicker) {
      toggleLoading(true);
      fetch("/api/addresses")
        .then(async res => {
          if (res.ok && res.status === 200) {
            setSuggestions((await res.json()).data || []);
            toggleLoading(false);
          }
        })
        .catch(error => {
          setSuggestions([]);
          toggleLoading(false);
        });
    }
  }, [value, isOpenPicker]);

  useEffect(() => {
    fetchData();
  }, [debouncedValue, fetchData]);

  const handleChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
    toggleIsValid(validate(ev.target.value));
  }, [validate]);

  const handleChangeSelection = (p: Location) => {
    setValue(p.name + " " + p.address);
    togglePicker(false);
  }

  return <div className={cls("relative w-full", props.className || "")} ref={anchorRef}>
    <input className={cls("rounded h-[40px] px-3 w-full text-gray placeholder-current", isValid ? "" : "data-invalid")} placeholder="Location"
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