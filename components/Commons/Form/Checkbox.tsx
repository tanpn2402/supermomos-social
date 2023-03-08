"use client";

import FormDataAttrs from "@/utils/interfaces/FormDataAttrs";
import FormDataProps from "@/utils/interfaces/FormDataProps";
import React, { ForwardedRef, forwardRef, useImperativeHandle, useState } from "react";

interface CheckboxProps extends FormDataProps {
  id: string
  name: string
  label: string
  defaultChecked?: boolean
}

const Checkbox = (props: CheckboxProps, ref: ForwardedRef<FormDataAttrs>) => {
  const [checked, toggleChecked] = useState<boolean>(props.defaultChecked || false);

  useImperativeHandle(ref, () => ({
    validate() {
      return true;
    },
    getData() {
      return checked;
    },
  }));

  return <div className="flex items-center mr-4 mb-2">
    <input type="checkbox" id={props.id} name={props.name} className="opacity-0 absolute h-6 w-6" checked={checked}
      onChange={ev => toggleChecked(ev.target.checked)}
    />
    <div className="bg-white border-2 rounded-md border-gray-400 w-6 h-6 flex-center flex-shrink-0 focus-within:border-gray-500">
      <svg className="fill-current hidden w-3 h-3 text-gray-600 pointer-events-none" version="1.1" viewBox="0 0 17 12" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <g transform="translate(-9 -11)" fill="#942F70" fillRule="nonzero">
            <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
          </g>
        </g>
      </svg>
    </div>
    <label htmlFor={props.id} className="ml-3">{props.label}</label>
  </div>
}

export default forwardRef<FormDataAttrs, CheckboxProps>(Checkbox);