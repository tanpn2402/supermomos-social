import { cls } from "@/utils/utl"
import Image from 'next/image'

const PRIVACY_SETTINGS = [
  { id: "public", title: "Public", isDefault: true },
  { id: "curated_audience", title: "Curated Audience", isDefault: false },
  { id: "community_only", title: "Community Only", isDefault: false }
]

export default function Home() {
  return (
    <main className="container mx-auto max-w-screen-xl">
      <div className="p-8">
        <div className="flex">
          <div style={{
            width: "calc(50% - 150px)"
          }}
            className="mr-5">
            <h2 className="py-1 px-3 bg-[#942F70] text-5xl font-bold text-white outline-none inline leading-[80px]" contentEditable>
              Untitle Event
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="flex items-center">
                <div className="flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.6 7.19995C14.4402 7.19995 13.5 8.14015 13.5 9.29995V11.4H11.4C9.08036 11.4 7.19995 13.2804 7.19995 15.6V36.5999C7.19995 38.9195 9.08036 40.7999 11.4 40.7999H36.5999C38.9195 40.7999 40.7999 38.9195 40.7999 36.5999V15.6C40.7999 13.2804 38.9195 11.4 36.5999 11.4H34.4999V9.29995C34.4999 8.14015 33.5597 7.19995 32.4 7.19995C31.2402 7.19995 30.3 8.14015 30.3 9.29995V11.4H17.7V9.29995C17.7 8.14015 16.7597 7.19995 15.6 7.19995ZM15.6 17.7C14.4402 17.7 13.5 18.6402 13.5 19.8C13.5 20.9597 14.4402 21.9 15.6 21.9H32.4C33.5597 21.9 34.4999 20.9597 34.4999 19.8C34.4999 18.6402 33.5597 17.7 32.4 17.7H15.6Z" fill="#14597A" />
                  </svg>
                </div>
                <input className="rounded h-[40px] px-3 w-full" placeholder="Date" />
              </div>
              <div className="flex items-center">
                <div className="flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M24 40.7999C33.2784 40.7999 40.8 33.2783 40.8 24C40.8 14.7216 33.2784 7.19995 24 7.19995C14.7216 7.19995 7.20001 14.7216 7.20001 24C7.20001 33.2783 14.7216 40.7999 24 40.7999ZM25 15.6C25 15.0477 24.5523 14.6 24 14.6C23.4477 14.6 23 15.0477 23 15.6V24C23 24.2652 23.1054 24.5195 23.2929 24.7071L29.2326 30.6468C29.6231 31.0373 30.2563 31.0373 30.6468 30.6468C31.0373 30.2562 31.0373 29.6231 30.6468 29.2325L25 23.5857V15.6Z" fill="#14597A" />
                  </svg>
                </div>
                <input className="rounded h-[40px] px-3 w-full" placeholder="Time" />
              </div>
            </div>
            <div className="mt-6">
              <div className="flex items-center">
                <div className="flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.07944 5.63828C9.79702 2.9207 14.2031 2.9207 16.9207 5.63828C19.6382 8.35586 19.6382 12.7619 16.9207 15.4795L12 20.4001L7.07944 15.4795C4.36187 12.7619 4.36187 8.35586 7.07944 5.63828ZM12 12.5471C13.0981 12.5471 13.9883 11.657 13.9883 10.5589C13.9883 9.46082 13.0981 8.57066 12 8.57066C10.902 8.57066 10.0118 9.46082 10.0118 10.5589C10.0118 11.657 10.902 12.5471 12 12.5471Z" fill="#14597A" />
                  </svg>
                </div>
                <input className="rounded h-[40px] px-3 w-full" defaultValue={"Vanue"} />
              </div>
              <div className="mt-3 flex items-center">
                <div className="flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14.8001 7.8C14.8001 9.3464 13.5465 10.6 12.0001 10.6C10.4537 10.6 9.2001 9.3464 9.2001 7.8C9.2001 6.2536 10.4537 5 12.0001 5C13.5465 5 14.8001 6.2536 14.8001 7.8Z" fill="#14597A" />
                    <path d="M19.4668 9.66667C19.4668 10.6976 18.631 11.5333 17.6001 11.5333C16.5692 11.5333 15.7334 10.6976 15.7334 9.66667C15.7334 8.63574 16.5692 7.8 17.6001 7.8C18.631 7.8 19.4668 8.63574 19.4668 9.66667Z" fill="#14597A" />
                    <path d="M15.7334 16.2C15.7334 14.1381 14.062 12.4667 12.0001 12.4667C9.93823 12.4667 8.26676 14.1381 8.26676 16.2V19H15.7334V16.2Z" fill="#14597A" />
                    <path d="M8.26676 9.66667C8.26676 10.6976 7.43103 11.5333 6.4001 11.5333C5.36917 11.5333 4.53343 10.6976 4.53343 9.66667C4.53343 8.63574 5.36917 7.8 6.4001 7.8C7.43103 7.8 8.26676 8.63574 8.26676 9.66667Z" fill="#14597A" />
                    <path d="M17.6001 19V16.2C17.6001 15.2161 17.3464 14.2915 16.9008 13.488C17.1243 13.4306 17.3586 13.4 17.6001 13.4C19.1465 13.4 20.4001 14.6536 20.4001 16.2V19H17.6001Z" fill="#14597A" />
                    <path d="M7.09941 13.488C6.65382 14.2915 6.4001 15.2161 6.4001 16.2V19H3.6001V16.2C3.6001 14.6536 4.8537 13.4 6.4001 13.4C6.64156 13.4 6.87588 13.4306 7.09941 13.488Z" fill="#14597A" />
                  </svg>
                </div>
                <input className="rounded h-[40px] px-3 mr-8 w-[155px]" defaultValue={"Max capacity"} />
                <div className="flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M10.355 9.28883C10.5176 9.18047 10.7183 9.08362 10.95 9.00866L10.95 10.7915C10.7183 10.7166 10.5176 10.6197 10.355 10.5114C9.97271 10.2565 9.89998 10.0197 9.89998 9.9001C9.89998 9.7805 9.97271 9.5437 10.355 9.28883Z" fill="#14597A" />
                    <path d="M13.05 14.9915L13.05 13.2087C13.2816 13.2836 13.4824 13.3805 13.6449 13.4888C14.0273 13.7437 14.1 13.9805 14.1 14.1001C14.1 14.2197 14.0273 14.4565 13.6449 14.7114C13.4824 14.8197 13.2816 14.9166 13.05 14.9915Z" fill="#14597A" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 20.4001C16.6392 20.4001 20.4 16.6393 20.4 12.0001C20.4 7.36091 16.6392 3.6001 12 3.6001C7.36078 3.6001 3.59998 7.36091 3.59998 12.0001C3.59998 16.6393 7.36078 20.4001 12 20.4001ZM13.05 6.7501C13.05 6.1702 12.5799 5.7001 12 5.7001C11.4201 5.7001 10.95 6.1702 10.95 6.7501V6.84669C10.2973 6.96926 9.69363 7.20587 9.19015 7.54152C8.43239 8.04669 7.79998 8.8599 7.79998 9.9001C7.79998 10.9403 8.43239 11.7535 9.19015 12.2587C9.69363 12.5943 10.2973 12.8309 10.95 12.9535L10.95 14.9918C10.5394 14.8585 10.2351 14.6586 10.0645 14.462C9.68442 14.024 9.02126 13.977 8.58326 14.357C8.14527 14.7371 8.09829 15.4002 8.47834 15.8382C9.06896 16.5189 9.96251 16.9675 10.95 17.1531L10.95 17.2501C10.95 17.83 11.4201 18.3001 12 18.3001C12.5799 18.3001 13.05 17.83 13.05 17.2501L13.05 17.1535C13.7027 17.0309 14.3063 16.7943 14.8098 16.4587C15.5676 15.9535 16.2 15.1403 16.2 14.1001C16.2 13.0599 15.5676 12.2467 14.8098 11.7415C14.3063 11.4059 13.7027 11.1693 13.05 11.0467L13.05 9.00839C13.4605 9.14169 13.7649 9.3416 13.9355 9.53824C14.3155 9.97624 14.9787 10.0232 15.4167 9.64316C15.8547 9.26311 15.9017 8.59995 15.5216 8.16195C14.931 7.48128 14.0375 7.03271 13.05 6.84707V6.7501Z" fill="#14597A" />
                  </svg>
                </div>
                <input className="rounded h-[40px] px-3 w-[155px]" defaultValue={"Cost per person"} />
              </div>
            </div>
          </div>
          <div style={{
            width: "calc(50% + 150px - 20px)",
            background: "rgba(242, 242, 242, 0.1)"
          }}
            className="rounded-tr-[64px] rounded-bl-[64px] border border-[#F2F2F2] border-dashed h-[445px] flex items-center justify-center">
            <div className="flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_8826_82568)">
                  <path d="M11.1222 12.5359C10.8436 12.2571 10.5128 12.0359 10.1487 11.885C9.7846 11.7342 9.39434 11.6565 9.00021 11.6565C8.60608 11.6565 8.21582 11.7342 7.85171 11.885C7.48761 12.0359 7.15681 12.2571 6.87821 12.5359L0.038208 19.3759C0.130669 20.6299 0.693116 21.8029 1.61308 22.6602C2.53305 23.5175 3.74272 23.996 5.00021 23.9999H19.0002C19.9799 23.9997 20.9377 23.7098 21.7532 23.1669L11.1222 12.5359Z" fill="#14597A" />
                  <path d="M18.0001 7.99999C19.1047 7.99999 20.0001 7.10456 20.0001 5.99999C20.0001 4.89543 19.1047 4 18.0001 4C16.8956 4 16.0001 4.89543 16.0001 5.99999C16.0001 7.10456 16.8956 7.99999 18.0001 7.99999Z" fill="#14597A" />
                  <path d="M19 0H5C3.67441 0.00158786 2.40356 0.528882 1.46622 1.46622C0.528882 2.40356 0.00158786 3.67441 0 5L0 16.586L5.464 11.122C5.92831 10.6576 6.47956 10.2892 7.08628 10.0378C7.69299 9.78644 8.34328 9.65707 9 9.65707C9.65672 9.65707 10.307 9.78644 10.9137 10.0378C11.5204 10.2892 12.0717 10.6576 12.536 11.122L23.167 21.753C23.71 20.9375 23.9998 19.9797 24 19V5C23.9984 3.67441 23.4711 2.40356 22.5338 1.46622C21.5964 0.528882 20.3256 0.00158786 19 0V0ZM18 10C17.2089 10 16.4355 9.7654 15.7777 9.32588C15.1199 8.88635 14.6072 8.26164 14.3045 7.53073C14.0017 6.79983 13.9225 5.99556 14.0769 5.21964C14.2312 4.44372 14.6122 3.73098 15.1716 3.17157C15.731 2.61216 16.4437 2.2312 17.2196 2.07686C17.9956 1.92252 18.7998 2.00173 19.5307 2.30448C20.2616 2.60723 20.8864 3.11992 21.3259 3.77772C21.7654 4.43552 22 5.20888 22 6C22 7.06087 21.5786 8.07828 20.8284 8.82843C20.0783 9.57857 19.0609 10 18 10Z" fill="#14597A" />
                </g>
                <defs>
                  <clipPath id="clip0_8826_82568">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="font-semibold text-base text-[#14597A]">
              Add a banner
            </div>
          </div>
        </div>
        <div className="w-3/6 mt-8">
          <label htmlFor="about" className="block text-base font-normal text-[#333333]">
            Description
          </label>
          <div className="mt-1.5">
            <textarea
              rows={6}
              className="p-3 w-full rounded-lg border border-[#D0D5DD] text-gray-900 placeholder:text-gray-400"
              placeholder="Description of your event..."
              defaultValue=""
            />
          </div>
        </div>
        <div className="w-3/6 mt-8 p-8 rounded-[20px] bg-white">
          <h2 className="inline-flex h-[60px] px-3 text-[32px] font-bold text-[#942F70] bg-[#FEF452]">Settings</h2>
          <div className="mt-6">
            <label className="text-gray-700 font-medium">
              <input type="checkbox" checked /> I want to approve attendees
            </label>
          </div>
          <div className="mt-6">
            <fieldset>
              <legend className="text-base font-medium text-gray-700">
                Privacy
              </legend>
              <div className="mt-2 flex items-center">
                {PRIVACY_SETTINGS.map((priv, index) => <div key={`settins-privacy-${priv.id}`} className={cls("flex items-center", index > 0 ? "ml-8" : "")}>
                  <input
                    id={priv.id}
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor={priv.id}
                    className="ml-3 block text-base font-normal text-gray-600"
                  >
                    {priv.title}
                  </label>
                </div>)}
              </div>
            </fieldset>
          </div>
          <div className="mt-6">
            <fieldset>
              <legend className="text-base font-medium text-gray-700">
                Tag your social
              </legend>
              <p className="text-base font-normal text-gray-600">Pick tags for our curation engine to work its magin.</p>
              <div className="mt-2 flex items-center">

              </div>
            </fieldset>
          </div>
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
