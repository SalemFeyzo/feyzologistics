"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitStatus("success");
    
    // Reset form
    const form = e.target as HTMLFormElement;
    form.reset();

    // Clear success message after 5 seconds
    setTimeout(() => {
      setSubmitStatus(null);
    }, 5000);
  };

  return (
    <Card className="border-2 border-[#1e40af]/20">
      <CardHeader>
        <CardTitle className="text-2xl text-[#1e40af]">{t("title")}</CardTitle>
        <CardDescription className="text-base">
          Fill out the form below and we'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("name")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder={t("namePlaceholder")}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder={t("emailPlaceholder")}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("phone")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder={t("phonePlaceholder")}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subject"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("subject")}
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              placeholder={t("subjectPlaceholder")}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {t("message")}
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder={t("messagePlaceholder")}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
            />
          </div>

          {submitStatus === "success" && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
              <p className="text-sm text-green-800 dark:text-green-200">
                {t("success")}
              </p>
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-800 dark:text-red-200">
                {t("error")}
              </p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            size="lg"
            className="w-full bg-linear-to-r from-[#1e40af] to-[#14b8a6] hover:opacity-90 text-white"
          >
            {isSubmitting ? t("submitting") : t("submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

