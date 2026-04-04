import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

const DEFAULT_CONTACT_EMAIL = "info@feyzologistics.com";
/** E.164 without + for https://wa.me/ */
const DEFAULT_WHATSAPP_DIGITS = "963967822812";

function formatPhoneDisplay(digits: string): string {
  if (digits.startsWith("963") && digits.length === 12) {
    return `+963 ${digits.slice(3, 6)} ${digits.slice(6, 9)} ${digits.slice(9)}`;
  }
  return `+${digits}`;
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export async function LandingContact() {
  const t = await getTranslations("Contact");
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? DEFAULT_CONTACT_EMAIL;
  const mailHref = `mailto:${email}`;

  const phoneDigits =
    process.env.NEXT_PUBLIC_PHONE_NUMBER?.replace(/\D/g, "") ||
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ||
    DEFAULT_WHATSAPP_DIGITS;
  const phoneDisplay = formatPhoneDisplay(phoneDigits);
  const telHref = `tel:+${phoneDigits}`;
  const whatsappDigits =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ||
    DEFAULT_WHATSAPP_DIGITS;
  const whatsappDisplay = formatPhoneDisplay(whatsappDigits);
  const whatsappHref = `https://wa.me/${whatsappDigits}`;

  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-background px-4 py-20 md:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="rounded-3xl border border-border bg-muted/20 px-8 py-12 md:px-14 md:py-16">
          <h2
            id="contact-heading"
            className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">{t("body")}</p>
          <address className="mt-6 max-w-2xl not-italic text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{t("addressLabel")}</span>
            <span className="mt-1 block">{t("address")}</span>
          </address>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="rounded-full px-8">
              <a href={mailHref}>{t("cta")}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-foreground/20 bg-transparent px-8"
            >
              <a
                href={telHref}
                className="inline-flex items-center gap-2 font-medium tabular-nums"
                aria-label={`${t("phoneHint")}: ${phoneDisplay}`}
              >
                <PhoneIcon className="size-5 shrink-0" />
                <span dir="ltr">{phoneDisplay}</span>
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full border-foreground/20 bg-transparent px-8"
            >
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
                aria-label={`${t("whatsappHint")} (${whatsappDisplay})`}
              >
                <WhatsAppIcon className="size-5 shrink-0" />
                {t("whatsappCta")}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
