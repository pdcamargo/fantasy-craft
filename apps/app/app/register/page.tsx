"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@craft/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@craft/ui/form";
import { Button } from "@craft/ui/button";
import { Input } from "@craft/ui/input";
import { Separator, toast } from "@craft/ui";
import Link from "next/link";
import { useTranslation } from "@craft/translation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FeatureFlag } from "app/feature-flag";

const registerSchema = z.object({
  username: z
    .string({
      message: "Register.validation.usernameRequired",
    })
    .min(3, "Register.validation.usernameMin"),
  email: z
    .string({
      message: "Register.validation.emailRequired",
    })
    .email("Register.validation.emailInvalid"),
  password: z
    .string({
      message: "Register.validation.passwordRequired",
    })
    .min(6, "Register.validation.passwordMin"),
  passwordConfirmation: z.string({
    message: "Register.validation.passwordConfirmationRequired",
  }),
  fullName: z.string({
    message: "Register.validation.fullNameRequired",
  }),
});

export default function RegisterPage() {
  const router = useRouter();

  const { t } = useTranslation();

  return (
    <>
      <title>{t("Register.pageTitle")}</title>
    </>
  );
}
