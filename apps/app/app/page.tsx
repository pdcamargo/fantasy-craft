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
  FormDescription,
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
import { fetcher, setAuthToken, useIsUserLoggedIn } from "@craft/query";
import { FeatureFlag } from "./feature-flag";

const loginSchema = z.object({
  username: z
    .string({
      message: "Login.validation.usernameRequired",
    })
    .min(3, "Login.validation.usernameMin"),
  password: z
    .string({
      message: "Login.validation.passwordRequired",
    })
    .min(6, "Login.validation.passwordMin"),
});

type LoginSchema = z.infer<typeof loginSchema>;

type UserLoginResult = {
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

export default function RootPage() {
  const isLoggedIn = useIsUserLoggedIn();

  const router = useRouter();

  const { mutateAsync: signIn, isPending: isLoggingIn } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginSchema) => {
      const [_, result] = await fetcher.post<UserLoginResult>(
        "/api/auth/login",
        data,
        {
          withBearer: false,
        },
      );

      return result;
    },
  });

  const { t } = useTranslation();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: LoginSchema) => {
    const result = await signIn(data);

    if (result) {
      setAuthToken(result.data.token);

      router.push("/dashboard/n5e/characters");
      toast.success(t("Login.onSuccess"));
    }

    toast.error(t("Login.onError"));
  };

  if (isLoggedIn) {
    router.push("/dashboard/n5e/characters");

    return null;
  }

  return (
    <div
      className="w-screen flex justify-end items-center h-screen overflow-hidden bg-white bg-cover px-5 lg:px-20"
      style={{
        backgroundImage: "url(https://images7.alphacoders.com/134/1346551.png)",
      }}
    >
      <Card
        variant="white"
        className="w-full max-w-[500px] shadow-none border-none py-6 lg:py-14 px-2 lg:px-7"
      >
        <CardHeader>
          <CardTitle className="text-center">{t("Login.header")}</CardTitle>
          <CardDescription className="text-center">
            {t("Login.subheader")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FeatureFlag oneOf={["LoginWithDiscord", "LoginWithGoogle"]}>
            <div className="flex items-center gap-5 mb-2">
              <FeatureFlag name="LoginWithGoogle">
                <Button
                  variant="outline"
                  className="flex-[50%]"
                  disabled={isLoggingIn}
                >
                  {t("Login.loginWithGoogle")}
                </Button>
              </FeatureFlag>

              <FeatureFlag name="LoginWithDiscord">
                <Button
                  variant="outline"
                  className="flex-[50%]"
                  disabled={isLoggingIn}
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
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("Login.username")}</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="username" />
                    </FormControl>
                    <FormDescription>{t("Login.usernameHint")}</FormDescription>
                    <FormMessage t={t} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>{t("Login.password")}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage t={t} />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end text-xs pt-2 mb-4">
                <Link href="/forgot-password">{t("Login.forgotPassword")}</Link>
              </div>

              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? t("Login.loggingIn") : t("Login.login")}
              </Button>

              <div className="text-center mt-5 text-sm">
                <Link href="/register">{t("Login.register")}</Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
