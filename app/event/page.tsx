"use client";

import EventAttribute from "@/components/Event/EventAttribute"
import EventBanner from "@/components/Event/EventBanner"
import EventDescription from "@/components/Event/EventDescription"
import EventSettings from "@/components/Event/EventSettings"
import FormDataAttrs from "@/utils/interfaces/FormDataAttrs";
import { cls } from "@/utils/utl"
import Image from 'next/image'
import { useCallback, useRef } from "react";

export default function Home() {
  const refs = useRef<Map<string, FormDataAttrs>>(new Map<string, FormDataAttrs>());

  const setRef = useCallback((name: string) => {
    return (ref: FormDataAttrs | null) => {
      if (ref !== null) {
        refs.current.set(name, ref);
      }
    }
  }, []);

  return (
    <main className="container mx-auto max-w-screen-xl">
      <form className="p-8" onSubmit={ev => {
        ev.preventDefault();
        refs.current.forEach((handler, name) => {
          console.log(name, handler.validate());;
        });

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

        }
        else {

        }

        console.log(data);
      }}>
        <div className="flex">
          <div style={{
            width: "calc(50% - 150px)"
          }}
            className="mr-5">
            <EventAttribute ref={setRef("attr")} />
          </div>
          <div style={{
            width: "calc(50% + 150px - 20px)"
          }}>
            <EventBanner ref={setRef("banner")} />
          </div>
        </div>
        <div className="w-3/6 mt-8">
          <EventDescription ref={setRef("description")} />
        </div>
        <div className="w-3/6 mt-8 p-8 rounded-[20px] bg-white">
          <EventSettings ref={setRef("settings")} />
        </div>
        <div className="w-3/6 mt-8">
          <button
            type="submit"
            className="w-full flex justify-center items-center rounded-md bg-yellow h-12 rounded-lg text-purple text-base font-medium"
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
