"use client";

import EventAttribute from "@/components/Event/EventAttribute"
import EventBanner from "@/components/Event/EventBanner"
import EventCreationAlert from "@/components/Event/EventCreationAlert";
import EventDescription from "@/components/Event/EventDescription"
import EventSettings from "@/components/Event/EventSettings"
import EventCreationAlertHandlers from "@/utils/interfaces/EventCreationHandlers";
import FormDataAttrs from "@/utils/interfaces/FormDataAttrs";
import { FormEvent, useCallback, useRef } from "react";

export default function Home() {
  const refs = useRef<Map<string, FormDataAttrs>>(new Map<string, FormDataAttrs>());
  const alertRef = useRef<EventCreationAlertHandlers>(null);

  const setRef = useCallback((name: string) => {
    return (ref: FormDataAttrs | null) => {
      if (ref !== null) {
        refs.current.set(name, ref);
      }
    }
  }, []);

  const handleSubmit = useCallback((ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    alertRef.current?.update(false);

    let isValid = true, data: any = {};
    for (let [_, handler] of Array.from(refs.current.entries())) {
      if (handler.validate() === false) {
        isValid = false;
      }
      else {
        data = { ...data, ...handler.getData() };
      }
    }

    if (isValid) {
      fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(async res => {
          if (res.ok && res.status === 200) {
            alertRef.current?.update(true, "Your event has been created!", "success");
          }
          else {
            throw new Error("Unexpected error!");
          }
        })
        .catch((err: Error) => {
          alertRef.current?.update(true, "Error: " + err.message, "error");
        });
    }
    else {
      alertRef.current?.update(true, "Please fullfil the form!", "error");
    }
  }, []);

  return (
    <main className="flex-center mx-auto max-w-screen-xl">
      <form className="container py-8 px-4 lg:px-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
          <EventAttribute ref={setRef("attr")} className="order-2 md:order-1" />
          <EventBanner ref={setRef("banner")} className="order-1 md:order-2" />
        </div>
        <div className="w-full md:w-4/5 lg:w-3/6 mt-8">
          <EventDescription ref={setRef("description")} />
        </div>
        <div className="w-full md:w-4/5 lg:w-3/6 mt-8 p-8 rounded-[20px] bg-white">
          <EventSettings ref={setRef("settings")} />
        </div>
        <div className="w-full md:w-4/5 lg:w-3/6">
          <EventCreationAlert ref={alertRef} />
        </div>
        <div className="w-full md:w-4/5 lg:w-3/6 mt-8">
          <button
            type="submit"
            className="w-full flex justify-center items-center rounded-md bg-yellow h-12 rounded-lg text-purple text-base font-medium hover:bg-yellow-200 transition delay-50"
          >
            CREATE SOCIAL
          </button>
        </div>
      </form>
      <div>
      </div>
    </main>
  )
}
