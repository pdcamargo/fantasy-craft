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
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetcher, setAuthToken } from "@craft/query";
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

type RegisterSchema = z.infer<typeof registerSchema>;

type UserRegisterResult = {
  message: string;
  data: {
    user: {
      username: string;
      email: string;
    };
    token: {
      type: "bearer";
      token: string;
      name: string;
      abilities: string[];
      lastUsedAt: string;
      expiresAt: string;
    };
  };
} | null;

export default function RegisterPage() {
  const router = useRouter();

  const { mutateAsync: signUp, isPending: isRegistering } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterSchema) => {
      const [_, result] = await fetcher.post<UserRegisterResult>(
        "/api/auth/register",
        data,
        {
          withBearer: false,
        },
      );

      return result;
    },
  });

  const { t } = useTranslation();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      password: "",
      username: "",
      email: "",
      fullName: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: RegisterSchema) => {
    const result = await signUp(data);

    if (result) {
      setAuthToken(result.data.token);

      router.push("/dashboard/dnd/books");
      toast.success(t("Register.onSuccess"));
    }

    toast.error(t("Register.onError"));
  };

  return (
    <>
      <title>{t("Register.pageTitle")}</title>
      <div
        className="w-screen flex justify-start items-center h-screen overflow-hidden bg-white bg-cover px-5 lg:px-20"
        style={{
          backgroundImage:
            "url(https://images.alphacoders.com/504/thumb-1920-504930.jpg)",
        }}
      >
        <Card
          variant="white"
          className="w-full max-w-[500px] shadow-none border-none py-6 lg:py-14 px-2 lg:px-7"
        >
          <CardHeader>
            <CardTitle className="text-center">
              {t("Register.header")}
            </CardTitle>
            <CardDescription className="text-center">
              {t("Register.subheader")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FeatureFlag oneOf={["LoginWithDiscord", "LoginWithGoogle"]}>
              <div className="flex items-center gap-5 mb-2">
                <FeatureFlag name="LoginWithGoogle">
                  <Button
                    variant="outline"
                    className="flex-[50%]"
                    disabled={isRegistering}
                  >
                    {t("Login.loginWithGoogle")}
                  </Button>
                </FeatureFlag>

                <FeatureFlag name="LoginWithDiscord">
                  <Button
                    variant="outline"
                    className="flex-[50%]"
                    disabled={isRegistering}
                  >
                    {t("Login.loginWithDiscord")}
                  </Button>
                </FeatureFlag>
              </div>

              <div className="flex items-center gap-5 py-2">
                <Separator className="flex-1" />
                <span className="text-muted-foreground">{t("Login.or")}</span>
                <Separator className="flex-1" />
              </div>
            </FeatureFlag>

            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Register.fullName")}</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="name" />
                      </FormControl>
                      <FormMessage t={t} />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Register.username")}</FormLabel>
                      <FormControl>
                        <Input {...field} autoComplete="username" />
                      </FormControl>
                      <FormMessage t={t} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("Register.email")}</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" autoComplete="email" />
                      </FormControl>
                      <FormMessage t={t} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>{t("Register.password")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage t={t} />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordConfirmation"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>{t("Register.confirmPassword")}</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage t={t} />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full mt-4"
                  disabled={isRegistering}
                >
                  {isRegistering
                    ? t("Register.registering")
                    : t("Register.register")}
                </Button>

                <div className="text-center mt-5 text-sm">
                  <Link href="/">{t("Register.login")}</Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
