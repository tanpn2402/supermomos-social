import { cls } from "@/utils/utl";
import Checkbox from "../Commons/Form/Checkbox";
import Radio from "../Commons/Form/Radio";



const PRIVACY_OPTIONS = [
  { id: "public", title: "Public", isDefault: true },
  { id: "curated_audience", title: "Curated Audience", isDefault: false },
  { id: "community_only", title: "Community Only", isDefault: false }
]

const EventSettings = () => {
  return <>
    <h2 className="inline-flex h-[60px] px-3 text-[32px] font-bold text-[#942F70] bg-[#FEF452]">Settings</h2>
    <div className="mt-6">
      <Checkbox id="aprrove_attendees" label="I want to approve attendees" name="aprrove_attendees" />
    </div>
    <div className="mt-6">
      <fieldset>
        <legend className="text-base font-medium text-gray-700">
          Privacy
        </legend>
        <div className="mt-2 flex items-center">
          {PRIVACY_OPTIONS.map((priv, index) => <div key={`settins-privacy-${priv.id}`} className={cls("flex items-center", index > 0 ? "ml-8" : "")}>
            <Radio id={priv.id}
              name="push-notifications"
              label={priv.title} />
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
  </>
}

export default EventSettings;