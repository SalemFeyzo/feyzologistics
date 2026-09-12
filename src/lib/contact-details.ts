const DEFAULT_CONTACT_EMAIL = "info@feyzologistics.com";
/** E.164 digits without + (used for tel: and wa.me) */
const DEFAULT_PHONE_DIGITS = "963967822812";

export function getContactEmail(): string {
  return import.meta.env.PUBLIC_CONTACT_EMAIL ?? DEFAULT_CONTACT_EMAIL;
}

export function getPhoneDigits(): string {
  return (
    import.meta.env.PUBLIC_PHONE_NUMBER?.replace(/\D/g, "") ||
    import.meta.env.PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ||
    DEFAULT_PHONE_DIGITS
  );
}

export function getTelephoneE164(): string {
  return `+${getPhoneDigits()}`;
}
