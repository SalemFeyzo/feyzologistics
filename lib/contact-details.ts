const DEFAULT_CONTACT_EMAIL = "info@feyzologistics.com";
/** E.164 digits without + (used for tel: and wa.me) */
const DEFAULT_PHONE_DIGITS = "963967822812";

export function getContactEmail(): string {
  return process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? DEFAULT_CONTACT_EMAIL;
}

export function getPhoneDigits(): string {
  return (
    process.env.NEXT_PUBLIC_PHONE_NUMBER?.replace(/\D/g, "") ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ||
    DEFAULT_PHONE_DIGITS
  );
}

export function getTelephoneE164(): string {
  return `+${getPhoneDigits()}`;
}
