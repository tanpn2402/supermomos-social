
const EventDescription = () => {
  return <>
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
  </>
}

export default EventDescription;