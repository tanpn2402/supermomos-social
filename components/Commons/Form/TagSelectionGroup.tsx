import FormDataAttrs from "@/utils/interfaces/FormDataAttrs";
import FormDataProps from "@/utils/interfaces/FormDataProps";
import { cls } from "@/utils/utl";
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from "react";

interface Props extends FormDataProps {
  options: string[],
  className?: string,
  min: number
}

const TagSelectionGroup = (props: Props, ref: ForwardedRef<FormDataAttrs>) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isValid, toggleIsValid] = useState<boolean>(true);

  useImperativeHandle(ref, () => ({
    validate() {
      const isValid = selectedTags.length >= props.min;
      toggleIsValid(isValid);
      return isValid;
    },
    getData() {
      return selectedTags;
    },
  }));

  useEffect(() => {
    // toggleIsValid(selectedTags.length >= props.min);
    toggleIsValid(true);
  }, [selectedTags.length]);

  return <div className={props.className || ""}>
    <div className="mt-6 flex items-center">
      {selectedTags.map((tag, index) => <div key={`tag-active-${tag}`} className={cls("badge active", index > 0 ? "ml-2" : "")}>
        {tag}
        <div className="flex-center ml-1" onClick={() => setSelectedTags(tags => tags.filter(t => t !== tag))}>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M9 3L3 9M3 3L9 9" stroke="#942F70" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>)}
    </div>
    <div className={cls("mt-4 flex items-center", isValid ? "" : "data-invalid p-2")}>
      {props.options.filter(t => !selectedTags.includes(t)).map((tag, index) => {
        if (selectedTags.includes(tag)) {
          return null;
        }
        return <div key={`tag-${tag}`} className={cls("badge", index > 0 ? "ml-2" : "")}
          onClick={() => setSelectedTags(tags => [...tags, tag])}>
          {tag}
        </div>
      })}
    </div>
  </div>
}

export default forwardRef<FormDataAttrs, Props>(TagSelectionGroup);