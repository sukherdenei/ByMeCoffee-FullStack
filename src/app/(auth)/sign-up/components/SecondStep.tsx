import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must include at least one UPPERCASE letter.",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must include at least one lowercase letter.",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must include at least one number.",
    }),
});

export const SecondStep = ({
  signUp,
}: {
  signUp: (email: string, password: string) => void;
}) => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupUser = async (email: string, password: string) => {
    const response = await fetch("/api/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log("Successfully sign-up", data);
    toast.success("Successfully sign-up", data);
    if (data.error) {
      toast.error("Wrong password!");
    } else {
      router.push("/login");
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    signUp(values.email, values.password);
    console.log(values);
    signupUser(values.email, values.password);
  }

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    setUserName(userName);
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <Link href={"/login"}>
        <Button
          variant={"secondary"}
          className="h-10 absolute top-[32px] right-[80px] cursor-pointer"
        >
          Log in
        </Button>
      </Link>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[407px] flex flex-col items-start rounded-lg  "
        >
          <div className="flex flex-col items-start p-6 gap-[6px] ">
            <h3 className="text-[24px] font-[600] leading-[32px] w-full ">
              Welcome {userName}
            </h3>
            <h4 className="w-full text-[14px] font-[400] leading-[20px] text-muted-foreground ">
              Connect email and set a password
            </h4>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-[10px] items-start px-[24px] pb-[24px] w-full  ">
                <div className="flex flex-col items-start gap-2 w-full  ">
                  <FormLabel className="text-[14px] font-[500] leading-[14px]  ">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username here" {...field} />
                  </FormControl>
                </div>

                <FormDescription hidden></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-[10px] items-start px-[24px] pb-[24px] w-full  ">
                <div className="flex flex-col items-start gap-2 w-full">
                  <FormLabel className="text-[14px] font-[500] leading-[14px]  ">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="myInput"
                      placeholder="Enter username here"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                </div>
                <FormDescription hidden></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-start gap-[10px] px-[24px] pb-[24px] w-full ">
            <Button
              type="submit"
              variant="default"
              className="w-full cursor-pointer h-10"
            >
              Continue
            </Button>
            <Toaster richColors />
          </div>
        </form>
      </Form>
    </div>
  );
};
