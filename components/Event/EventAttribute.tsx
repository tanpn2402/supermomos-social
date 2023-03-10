"use client";

import FormDataAttrs from "@/utils/interfaces/FormDataAttrs";
import FormDataProps from "@/utils/interfaces/FormDataProps";
import { cls } from "@/utils/utl";
import React, { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import DatePicker from "../Commons/DatePicker";
import Input from "../Commons/Form/Input";
import LocationSuggestion from "../Commons/LocationSuggestion";
import TimePicker from "../Commons/TimePicker";

const EventTitle = forwardRef<FormDataAttrs, FormDataProps>((props, ref) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isValid, toggleIsValid] = useState<boolean>(true);

  useImperativeHandle(ref, () => ({
    validate() {
      const isValid = titleRef.current?.textContent?.trim().length! > 0;
      toggleIsValid(isValid);
      return isValid;
    },
    getData() {
      return titleRef.current?.textContent?.trim();
    },
  }))

  return <h2 className={cls("py-1 px-3 bg-purple text-5xl font-bold text-white outline-none inline leading-[80px]", isValid ? "" : "data-invalid")}
    ref={titleRef}
    onInput={() => toggleIsValid(true)}
    contentEditable
    suppressContentEditableWarning={true}>
    Untitle Event
  </h2>
})

const EventAttribute = (props: FormDataProps, ref: ForwardedRef<FormDataAttrs>) => {
  const refs = useRef<Map<string, FormDataAttrs>>(new Map<string, FormDataAttrs>());

  const setRef = useCallback((name: string) => {
    return (ref: FormDataAttrs | null) => {
      if (ref !== null) {
        refs.current.set(name, ref);
      }
    }
  }, []);

  useImperativeHandle(ref, () => ({
    validate() {
      let isValid = true;
      for (let [_, handler] of Array.from(refs.current.entries())) {
        if (handler.validate() === false) {
          isValid = false;
        }
      }

      return isValid;
    },
    getData() {
      let data: any = {};
      if (this.validate()) {
        for (let [name, handler] of Array.from(refs.current.entries())) {
          data = {
            ...data,
            ...{ [name]: handler.getData() }
          }
        }
      }
      return {
        "title": data.title,
        "startAt": data.date + "T" + data.time,
        "venue": data.venue,
        "capacity": parseInt(data.capacity),
        "price": parseInt(data.price)
      };
    }
  }));

  return <div className={cls("event__attr pt-8", props.className || "")}>
    <EventTitle ref={setRef("title")} />
    <div className="event__attr-detail">
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center">
          <div className="flex-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M15.6 7.19995C14.4402 7.19995 13.5 8.14015 13.5 9.29995V11.4H11.4C9.08036 11.4 7.19995 13.2804 7.19995 15.6V36.5999C7.19995 38.9195 9.08036 40.7999 11.4 40.7999H36.5999C38.9195 40.7999 40.7999 38.9195 40.7999 36.5999V15.6C40.7999 13.2804 38.9195 11.4 36.5999 11.4H34.4999V9.29995C34.4999 8.14015 33.5597 7.19995 32.4 7.19995C31.2402 7.19995 30.3 8.14015 30.3 9.29995V11.4H17.7V9.29995C17.7 8.14015 16.7597 7.19995 15.6 7.19995ZM15.6 17.7C14.4402 17.7 13.5 18.6402 13.5 19.8C13.5 20.9597 14.4402 21.9 15.6 21.9H32.4C33.5597 21.9 34.4999 20.9597 34.4999 19.8C34.4999 18.6402 33.5597 17.7 32.4 17.7H15.6Z" fill="#14597A" />
            </svg>
          </div>
          <DatePicker className="z-[100]" ref={setRef("date")} />
        </div>
        <div className="flex items-center">
          <div className="flex-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M24 40.7999C33.2784 40.7999 40.8 33.2783 40.8 24C40.8 14.7216 33.2784 7.19995 24 7.19995C14.7216 7.19995 7.20001 14.7216 7.20001 24C7.20001 33.2783 14.7216 40.7999 24 40.7999ZM25 15.6C25 15.0477 24.5523 14.6 24 14.6C23.4477 14.6 23 15.0477 23 15.6V24C23 24.2652 23.1054 24.5195 23.2929 24.7071L29.2326 30.6468C29.6231 31.0373 30.2563 31.0373 30.6468 30.6468C31.0373 30.2562 31.0373 29.6231 30.6468 29.2325L25 23.5857V15.6Z" fill="#14597A" />
            </svg>
          </div>
          <TimePicker className="z-[100]" ref={setRef("time")} />
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center">
          <div className="flex-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M7.07944 5.63828C9.79702 2.9207 14.2031 2.9207 16.9207 5.63828C19.6382 8.35586 19.6382 12.7619 16.9207 15.4795L12 20.4001L7.07944 15.4795C4.36187 12.7619 4.36187 8.35586 7.07944 5.63828ZM12 12.5471C13.0981 12.5471 13.9883 11.657 13.9883 10.5589C13.9883 9.46082 13.0981 8.57066 12 8.57066C10.902 8.57066 10.0118 9.46082 10.0118 10.5589C10.0118 11.657 10.902 12.5471 12 12.5471Z" fill="#14597A" />
            </svg>
          </div>
          <LocationSuggestion className="z-[99]" ref={setRef("venue")} />
        </div>
        <div className="flex items-center flex-wrap">
          <div className="mt-3 flex-center">
            <div className="flex-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M14.8001 7.8C14.8001 9.3464 13.5465 10.6 12.0001 10.6C10.4537 10.6 9.2001 9.3464 9.2001 7.8C9.2001 6.2536 10.4537 5 12.0001 5C13.5465 5 14.8001 6.2536 14.8001 7.8Z" fill="#14597A" />
                <path d="M19.4668 9.66667C19.4668 10.6976 18.631 11.5333 17.6001 11.5333C16.5692 11.5333 15.7334 10.6976 15.7334 9.66667C15.7334 8.63574 16.5692 7.8 17.6001 7.8C18.631 7.8 19.4668 8.63574 19.4668 9.66667Z" fill="#14597A" />
                <path d="M15.7334 16.2C15.7334 14.1381 14.062 12.4667 12.0001 12.4667C9.93823 12.4667 8.26676 14.1381 8.26676 16.2V19H15.7334V16.2Z" fill="#14597A" />
                <path d="M8.26676 9.66667C8.26676 10.6976 7.43103 11.5333 6.4001 11.5333C5.36917 11.5333 4.53343 10.6976 4.53343 9.66667C4.53343 8.63574 5.36917 7.8 6.4001 7.8C7.43103 7.8 8.26676 8.63574 8.26676 9.66667Z" fill="#14597A" />
                <path d="M17.6001 19V16.2C17.6001 15.2161 17.3464 14.2915 16.9008 13.488C17.1243 13.4306 17.3586 13.4 17.6001 13.4C19.1465 13.4 20.4001 14.6536 20.4001 16.2V19H17.6001Z" fill="#14597A" />
                <path d="M7.09941 13.488C6.65382 14.2915 6.4001 15.2161 6.4001 16.2V19H3.6001V16.2C3.6001 14.6536 4.8537 13.4 6.4001 13.4C6.64156 13.4 6.87588 13.4306 7.09941 13.488Z" fill="#14597A" />
              </svg>
            </div>
            <Input className="px-3 w-[155px] mr-8" placeHolder="Max capacity" type="number" min={0} ref={setRef("capacity")}
              isValidateOnChange
              validationHandler={(p) => {
                return p?.trim?.() !== "" && !Number.isNaN(p);
              }}
            />
          </div>
          <div className="mt-3 flex-center">
            <div className="flex-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M10.355 9.28883C10.5176 9.18047 10.7183 9.08362 10.95 9.00866L10.95 10.7915C10.7183 10.7166 10.5176 10.6197 10.355 10.5114C9.97271 10.2565 9.89998 10.0197 9.89998 9.9001C9.89998 9.7805 9.97271 9.5437 10.355 9.28883Z" fill="#14597A" />
                <path d="M13.05 14.9915L13.05 13.2087C13.2816 13.2836 13.4824 13.3805 13.6449 13.4888C14.0273 13.7437 14.1 13.9805 14.1 14.1001C14.1 14.2197 14.0273 14.4565 13.6449 14.7114C13.4824 14.8197 13.2816 14.9166 13.05 14.9915Z" fill="#14597A" />
                <path fillRule="evenodd" clipRule="evenodd" d="M12 20.4001C16.6392 20.4001 20.4 16.6393 20.4 12.0001C20.4 7.36091 16.6392 3.6001 12 3.6001C7.36078 3.6001 3.59998 7.36091 3.59998 12.0001C3.59998 16.6393 7.36078 20.4001 12 20.4001ZM13.05 6.7501C13.05 6.1702 12.5799 5.7001 12 5.7001C11.4201 5.7001 10.95 6.1702 10.95 6.7501V6.84669C10.2973 6.96926 9.69363 7.20587 9.19015 7.54152C8.43239 8.04669 7.79998 8.8599 7.79998 9.9001C7.79998 10.9403 8.43239 11.7535 9.19015 12.2587C9.69363 12.5943 10.2973 12.8309 10.95 12.9535L10.95 14.9918C10.5394 14.8585 10.2351 14.6586 10.0645 14.462C9.68442 14.024 9.02126 13.977 8.58326 14.357C8.14527 14.7371 8.09829 15.4002 8.47834 15.8382C9.06896 16.5189 9.96251 16.9675 10.95 17.1531L10.95 17.2501C10.95 17.83 11.4201 18.3001 12 18.3001C12.5799 18.3001 13.05 17.83 13.05 17.2501L13.05 17.1535C13.7027 17.0309 14.3063 16.7943 14.8098 16.4587C15.5676 15.9535 16.2 15.1403 16.2 14.1001C16.2 13.0599 15.5676 12.2467 14.8098 11.7415C14.3063 11.4059 13.7027 11.1693 13.05 11.0467L13.05 9.00839C13.4605 9.14169 13.7649 9.3416 13.9355 9.53824C14.3155 9.97624 14.9787 10.0232 15.4167 9.64316C15.8547 9.26311 15.9017 8.59995 15.5216 8.16195C14.931 7.48128 14.0375 7.03271 13.05 6.84707V6.7501Z" fill="#14597A" />
              </svg>
            </div>
            <Input className="px-3 w-[155px]" placeHolder="Cost per person" type="number" min={0} ref={setRef("price")}
              isValidateOnChange
              validationHandler={(p) => {
                return p?.trim?.() !== "" && !Number.isNaN(p);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default forwardRef<FormDataAttrs, FormDataProps>(EventAttribute);