"use client";

import useFetch from "@/utils/hooks/useFetch";
import FormDataAttrs from "@/utils/interfaces/FormDataAttrs";
import FormDataProps from "@/utils/interfaces/FormDataProps";
import ModalHandlers from "@/utils/interfaces/ModalHandlers";
import { cls } from "@/utils/utl";
import Image from "next/image";
import { ForwardedRef, forwardRef, useImperativeHandle, useRef, useState } from "react";
import Modal from "../Commons/Modal";

interface BannerModalHandlers extends ModalHandlers {
  getData: () => string
}

interface BannerModalProps {
  onSuccess: (value: string) => void
}

const BannerModal = forwardRef<BannerModalHandlers, BannerModalProps>((props, ref) => {
  const modalRef = useRef<ModalHandlers>(null);
  const [selected, setSelected] = useState<string>();
  const bannersSWR = useFetch<string[]>("/api/banners", { method: "GET" });

  useImperativeHandle(ref, () => ({
    toggle(p) {
      modalRef.current?.toggle?.(p);
    },
    getData() {
      return selected!;
    },
  }));

  return <Modal.Main ref={modalRef} defaultOpen={false} ignoreBodyScrolling>
    <Modal.Header>
      Choose a banner
    </Modal.Header>
    <Modal.Body>
      <div className="grid grid-cols-6 gap-2">
        {bannersSWR.isLoading ? <div className="text-gray-500">Loading...</div> :
          (bannersSWR.data || []).map(banner => <div key={`banner-${banner}`}
            className={cls("h-[80px] p-1 border-2", selected === banner ? "border-purple" : "border-transparent", "hover:border-purple transition delay-50")}
            onClick={() => setSelected(banner)}>
            <div className="relative w-full h-full">
              <Image
                className="object-cover"
                loader={() => banner}
                src={banner}
                alt="Event banner"
                fill
              />
            </div>
          </div>)}
      </div>
    </Modal.Body>
    <Modal.Footer>
      <button
        type="button"
        onClick={() => modalRef.current?.toggle?.(false)}
        className="mr-2 flex-center rounded-md rounded-lg text-base text-gray-500 font-medium px-4 py-2 hover:bg-gray-100 transition delay-50"
      >
        Close
      </button>
      <button
        type="button"
        disabled={selected === undefined}
        onClick={() => props.onSuccess(selected!)}
        className="flex-center rounded-md bg-yellow rounded-lg text-purple text-base font-medium px-4 py-2 hover:bg-yellow-800 transition delay-50 disabled:opacity-75 disabled:cursor-not-allowed"
      >
        Save
      </button>
    </Modal.Footer>
  </Modal.Main >
});

const EventBanner = (props: FormDataProps, ref: ForwardedRef<FormDataAttrs>) => {
  const bannerModalRef = useRef<BannerModalHandlers>(null);
  const [isValid, toggleIsValid] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>();

  useImperativeHandle(ref, () => ({
    validate() {
      const isValid = selected !== undefined;
      toggleIsValid(isValid);
      return isValid;
    },
    getData() {
      return {
        "banner": selected
      };
    }
  }));

  return <div className={cls("event__banner", props.className || "")}>
    <div className="event__banner-holder"
      style={!selected ? {} : {
        backgroundImage: `url(${selected})`,
        borderColor: "transparent"
      }}>
      <div className={cls("flex cursor-pointer rounded p-2", isValid ? "" : "data-invalid", selected === undefined ? "" : "bg-yellow")}
        onClick={() => bannerModalRef.current?.toggle?.(true)}>
        <div className="flex-center mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <g clipPath="url(#clip0_8826_82568)">
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
        <div className={cls("font-semibold text-base text-[#14597A] z-[9]")}>
          {selected === undefined ? "Add a banner" : "Change a banner"}
        </div>
      </div>
    </div>

    <BannerModal ref={bannerModalRef}
      onSuccess={banner => {
        setSelected(banner);
        toggleIsValid(true);
        bannerModalRef.current?.toggle?.(false);
      }} />

  </div>
}

export default forwardRef<FormDataAttrs, FormDataProps>(EventBanner);