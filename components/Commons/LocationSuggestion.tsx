"use client";

import useDebounce from "@/utils/hooks/useDebounce";
import useOnClickOutside from "@/utils/hooks/useOnClickOutside";
import { format, } from 'date-fns';
import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { DayPicker } from 'react-day-picker';

type Location = {
  id: string
  lat?: number
  long?: number
  name: string
  address: string
}

const LocationSuggestion = () => {
  const ref = useRef(null);
  const [isLoading, toggleLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isOpenPicker, togglePicker] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(value, 500);
  const [selected, setSelected] = useState<Location | null>(null);

  useOnClickOutside(ref, () => togglePicker(false));

  useEffect(() => {
    fetchData();
  }, [debouncedValue]);

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setSelected(null);
  }

  const handleChangeSelection = (p: Location) => {
    setSelected(p);
    togglePicker(false);
    setValue(p.name);
  }

  return <div className="relative w-full" ref={ref}>
    <input className="rounded h-[40px] px-3 w-full placeholder-current" placeholder="Location"
      onFocus={ev => togglePicker(true)}
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

export default LocationSuggestion;