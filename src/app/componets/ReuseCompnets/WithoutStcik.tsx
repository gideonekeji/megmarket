import React from 'react';

interface InputFieldProps {
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value: string;
  name: string;
  labeloptionalvalues?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const WithoutStcik: React.FC<InputFieldProps> = ({
  label,
  required = false,
  type = 'text',
  placeholder,
  value,
  name,
  onChange,
  labeloptionalvalues,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-poppins text-B4 text-textcolor">
        {label}
        {labeloptionalvalues && (
          <span className="text-[#808080] text-[13px]"> ({labeloptionalvalues})</span>
        )}
        {required && <span className="text-[#F21818] pl-[1px]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl placeholder:font-normal border border-light-border dark:border-dark-border font-poppins font-normal focus:border-light-inputFocuscolor dark:focus:border-dark-inputFocuscolor text-textcolor bg-light-inputbgcolor dark:bg-dark-inputbgcolor px-4 py-[14px] placeholder:text-placeholdercolor placeholder:text-sm focus:outline-none"
      />
    </div>
  );
};

export default WithoutStcik;
