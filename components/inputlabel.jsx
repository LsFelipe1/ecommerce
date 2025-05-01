function InputForm({
  id,
  name,
  label,
  type = "text",
  placeholder,
  className = " ",
  maxlength,
  inputClassName = "",
}) {
  return (
    <div className="flex relative mx-15 my-3 flex-col">
      <input
        id={id}
        name={name}
        type={type}
        placeholder=""
        maxLength={maxlength}
        className="peer border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 transition"
      />
      <label class="absolute transition-all duration-300 peer-focus:text-emerald-500 peer-placeholder-shown:bg-transparent bg-zinc-100 peer-placeholder-shown:text-base peer-placeholder-shown:top-1.5 text-sm -top-3 px-1 mx-3">
        {label}
      </label>
    </div>
  );
}

export default InputForm;
