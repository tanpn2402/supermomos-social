import EventCreationAlertHandlers from "@/utils/interfaces/EventCreationHandlers";
import FormDataProps from "@/utils/interfaces/FormDataProps";
import { cls } from "@/utils/utl";
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from "react";

type AlertProps = {
  isVisible: boolean
  message?: string
  type?: string
}

const EventCreationAlert = (props: FormDataProps, ref: ForwardedRef<EventCreationAlertHandlers>) => {
  const [alert, setAlert] = useState<AlertProps>();

  useImperativeHandle(ref, () => ({
    update(isVisible, message, type) {
      setAlert({ isVisible, message, type });
    }
  }));

  return <div className={cls("flex items-center px-8 py-4 rounded mt-6 text-gray",
    alert?.isVisible ? "block" : "hidden", alert?.type === "error" ? "data-invalid" : "data-valid")}>
    {alert?.type === "error" ?
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg> :
      alert?.type === "success" ?
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
        : <></>}
    <span className="ml-2 font-medium">{alert?.message}</span>
  </div>
}

export default forwardRef<EventCreationAlertHandlers, FormDataProps>(EventCreationAlert);