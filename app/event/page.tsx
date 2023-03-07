import EventAttribute from "@/components/Event/EventAttribute"
import EventBanner from "@/components/Event/EventBanner"
import EventDescription from "@/components/Event/EventDescription"
import EventSettings from "@/components/Event/EventSettings"
import { cls } from "@/utils/utl"
import Image from 'next/image'


export default function Home() {
  return (
    <main className="container mx-auto max-w-screen-xl">
      <div className="p-8">
        <div className="flex">
          <div style={{
            width: "calc(50% - 150px)"
          }}
            className="mr-5">
            <EventAttribute />
          </div>
          <div style={{
            width: "calc(50% + 150px - 20px)"
          }}>
            <EventBanner />
          </div>
        </div>
        <div className="w-3/6 mt-8">
          <EventDescription />
        </div>
        <div className="w-3/6 mt-8 p-8 rounded-[20px] bg-white">
          <EventSettings />
        </div>
        <div className="w-3/6 mt-8">
          <button
            type="submit"
            className="w-full flex justify-center items-center rounded-md bg-[#FEF452] h-12 rounded-lg text-[#942F70] text-base font-medium"
          >
            CREATE SOCIAL
          </button>
        </div>
      </div>
      <div>

      </div>
    </main>
  )
}
