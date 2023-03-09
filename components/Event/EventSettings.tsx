"use client";

import useFetch from "@/utils/hooks/useFetch";
import FormDataAttrs from "@/utils/interfaces/FormDataAttrs";
import FormDataProps from "@/utils/interfaces/FormDataProps";
import { ForwardedRef, forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import Checkbox from "../Commons/Form/Checkbox";
import Radio from "../Commons/Form/Radio";
import RadioGroup from "../Commons/Form/RadioGroup";
import TagSelectionGroup from "../Commons/Form/TagSelectionGroup";

type PrivacyOption = {
  id: string
  title: string
  value: string
  isDefault: boolean
}

const EventSettings = (props: FormDataProps, ref: ForwardedRef<FormDataAttrs>) => {
  const refs = useRef<Map<string, FormDataAttrs>>(new Map<string, FormDataAttrs>());
  const privacyOptSWR = useFetch<PrivacyOption[]>("/api/options/privacy", { method: "GET" });
  const tagOptSWR = useFetch<string[]>("/api/options/tag", { method: "GET" });

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
        "privacy": data.privacy,
        "isManualApprove": data.isManualApprove,
        "tags": data.tags
      };
    }
  }));

  return <>
    <h2 className="inline-flex h-[60px] leading-[60px] px-3 text-[32px] font-bold text-purple bg-yellow">Settings</h2>
    <div className="mt-6">
      <Checkbox ref={setRef("isManualApprove")} id="aprrove_attendees" label="I want to approve attendees" name="aprrove_attendees" />
    </div>
    <div className="mt-6">
      <fieldset>
        <legend className="text-base font-medium text-gray-700">
          Privacy
        </legend>
        <RadioGroup ref={setRef("privacy")} className="mt-2 flex items-center flex-wrap">
          {privacyOptSWR.isLoading ? <div className="text-gray-500">Loading...</div> :
            (privacyOptSWR.data || []).map((priv, index) => <Radio key={`settins-privacy-${priv.id}`} id={priv.value}
              name="privacy_option"
              className={index < privacyOptSWR.data?.length! ? "mr-8" : ""}
              label={priv.title}
              defaultChecked={priv.isDefault}
            />)}
        </RadioGroup>
      </fieldset>
    </div>
    <div className="mt-6">
      <fieldset>
        <legend className="text-base font-medium text-gray-700">
          Tag your social
        </legend>
        <p className="text-base font-normal text-gray-600">Pick tags for our curation engine to work its magin.</p>
        {tagOptSWR.isLoading ? <div className="text-gray-500">Loading...</div> :
          <TagSelectionGroup ref={setRef("tags")} min={1} options={tagOptSWR.data || []} />}
      </fieldset>
    </div>
  </>
}

export default forwardRef<FormDataAttrs, FormDataProps>(EventSettings);