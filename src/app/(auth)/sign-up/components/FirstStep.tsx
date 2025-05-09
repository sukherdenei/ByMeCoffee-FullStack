"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { json } from "stream/consumers";
import { boolean, z } from "zod";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { userType } from "../../../../../util/type";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(16, "Maximum 12 character"),
});

export function FirstStep({
  nextPage,
  setUserName,
}: {
  nextPage: () => void;
  setUserName: (username: string) => void;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const existingUsernames: string[] = ["user1", "user2", "admin"];

  function isUsernameTaken(username: string): boolean {
    return existingUsernames.includes(username);
  }

  const [users, setUsers] = useState<userType[] | null>(null);

  const addUser = async (username: string) => {
    // useEffect(() => {
    fetch("api/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    })
      .then((data) => data.json())
      .then((json) => setUsers(json.data));
    // }, []);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const usernameToCheck = values.username;
    setUserName(values.username);
    if (isUsernameTaken(usernameToCheck)) {
      toast("already name exists..");
    } else {
      toast(`"${usernameToCheck}" нь ашиглахад бэлэн байна.`);
      nextPage();
      addUser(values.username);
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Link href={"/login"}>
        <Button
          variant={"secondary"}
          className="h-10 absolute top-[32px] right-[80px] "
        >
          Log in
        </Button>
      </Link>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[24px] font-[600] leading-[32px] w-full">
                  Create Your Account
                </FormLabel>
                <FormDescription className="w-full text-[14px] font-[400] leading-[20px] text-foreground">
                  Choose a username for your page
                </FormDescription>
                <FormControl>
                  <Input placeholder="Enter username here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="default" className="w-full h-10">
            Continue
          </Button>
          <Toaster />
        </form>
      </Form>
      <div>{users && users[0].username}</div>
    </div>
  );
}
