// Artboard: 11 — Settings

const SectionLabel = ({ children }: { children: string }) => (
  <div className="text-muted-foreground font-[Inter,system-ui,sans-serif] text-[11px] font-semibold tracking-[0.06em] leading-[16px] mb-[12px]">
    {children}
  </div>
);

interface InputFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
}

const InputField = ({ label, value, placeholder, type = 'text' }: InputFieldProps) => (
  <div className="flex flex-col gap-[4px]">
    <label className="text-muted-foreground font-[Inter,system-ui,sans-serif] text-[12px] font-medium leading-[16px]">
      {label}
    </label>
    <input
      type={type}
      defaultValue={value}
      placeholder={placeholder}
      className="bg-field border border-solid border-border rounded-[8px] text-foreground font-[Inter,system-ui,sans-serif] text-[13px] leading-[16px] outline-none py-[8px] px-[12px] w-full"
    />
  </div>
);

interface SelectFieldProps {
  label: string;
  value: string;
}

const SelectField = ({ label, value }: SelectFieldProps) => (
  <div className="flex flex-col gap-[4px]">
    <label className="text-muted-foreground font-[Inter,system-ui,sans-serif] text-[12px] font-medium leading-[16px]">
      {label}
    </label>
    <div className="flex items-center bg-field border border-solid border-border rounded-[8px] justify-between py-[8px] px-[12px]">
      <span className="text-foreground font-[Inter,system-ui,sans-serif] text-[13px] leading-[16px]">{value}</span>
      <svg width="12" height="12" viewBox="0 0 15 15" fill="none" className="stroke-muted-foreground" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 5.5L7.5 10L12 5.5" />
      </svg>
    </div>
  </div>
);

interface ToggleRowProps {
  title: string;
  description: string;
  value?: string;
  enabled?: boolean;
}

const ToggleRow = ({ title, description, value, enabled = false }: ToggleRowProps) => (
  <div className="flex items-center border-b border-b-border justify-between py-[16px]">
    <div className="flex flex-col gap-[2px]">
      <span className="text-foreground font-[Inter,system-ui,sans-serif] text-[14px] font-medium leading-[18px]">{title}</span>
      <span className="text-muted-foreground font-[Inter,system-ui,sans-serif] text-[13px] leading-[16px]">{description}</span>
    </div>
    <div className="flex items-center shrink-0 gap-[10px] ml-[24px]">
      {value && (
        <span className="text-muted-foreground font-[Inter,system-ui,sans-serif] text-[13px] leading-[16px]">{value}</span>
      )}
      <div className={`rounded-full cursor-pointer h-[20px] p-[2px] transition-[background-color] duration-150 w-[36px] ${enabled ? 'bg-foreground' : 'bg-border'}`}>
        <div className={`bg-background rounded-full h-[16px] transition-transform duration-150 w-[16px] ${enabled ? 'translate-x-4' : 'translate-x-0'}`} />
      </div>
    </div>
  </div>
);

const SettingsPage = () => {
  return (
    <div className="bg-background min-h-full pt-[56px] px-[40px] pb-[40px]">
      <div className="max-w-[680px] mx-auto w-full">

        <h1 className="text-foreground font-[Inter,system-ui,sans-serif] text-[28px] font-medium tracking-[-0.02em] leading-[34px] m-0 mb-[16px]">
          Settings
        </h1>

        {/* Personal Information */}
        <div className="mb-[32px]">
          <SectionLabel>Personal Information</SectionLabel>
          <div className="flex flex-col gap-[12px]">
            <div className="grid gap-[12px] grid-cols-2">
              <InputField label="First name" value="Jaden" />
              <InputField label="Last name" value="Park" />
            </div>
            <InputField label="Email" value="jaden@sentra.app" type="email" />
            <InputField label="Phone" value="+1 (555) 123-4567" type="tel" />
            <SelectField label="Language" value="English" />
            <SelectField label="Timezone" value="Eastern Time (US & Canada)" />
            <div className="flex justify-end mt-[4px]">
              <button
                type="button"
                className="bg-foreground border-none rounded-[8px] text-background cursor-pointer font-[Inter,system-ui,sans-serif] text-[13px] font-medium leading-[16px] py-[8px] px-[16px]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Meeting Bot & Appearance */}
        <div className="border-t border-t-border mb-[32px]">
          <ToggleRow
            title="Meeting Bot"
            description="Allow Sentra to join scheduled meetings and take notes."
            enabled
          />
          <ToggleRow
            title="Appearance"
            description="Match your device appearance settings."
            value="System"
          />
        </div>

        {/* Change Password */}
        <div>
          <SectionLabel>Change Password</SectionLabel>
          <div className="flex flex-col gap-[12px]">
            <InputField label="New password" value="" placeholder="At least 8 characters" type="password" />
            <InputField label="Confirm password" value="" placeholder="Confirm new password" type="password" />
            <div className="flex justify-end mt-[4px]">
              <button
                type="button"
                className="bg-background border border-solid border-border rounded-[8px] text-foreground cursor-pointer font-[Inter,system-ui,sans-serif] text-[13px] font-medium leading-[16px] py-[8px] px-[16px]"
              >
                Change password
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;
