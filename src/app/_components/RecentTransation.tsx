"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import React, { useEffect } from "react";

export const RecentTransaction = ({ user, key }) => {
  // useEffect(() => {}, []);
  return (
    <div
      key={key}
      className="w-full flex flex-col gap-3 items-start sm:w-[500px] "
    >
      <div className="flex w-full justify-between items-start ">
        <h4 className="text-[16px] font-[600] leading-[24px] ">
          Recent transactions
        </h4>
        <Select>
          <SelectTrigger className="h-[36px] py-2 px-4 border-dashed ">
            <SelectValue placeholder="Amount" />
          </SelectTrigger>
          <Link href={`/view-profile/${user.id}`}>
            <Button className="text-sm bg-[#F4F4F5] text-black hover:bg-[#F4F4F5] cursor-pointer hover:border-1">
              view profile
            </Button>
          </Link>
          <SelectContent>
            <SelectItem value="a">
              <div className="flex items-center space-x-2">
                <Checkbox id="one" />
                <label
                  htmlFor="one"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  $1
                </label>
              </div>
            </SelectItem>
            <SelectItem value="b">
              <div className="flex items-center space-x-2">
                <Checkbox id="two" />
                <label
                  htmlFor="two"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  $2
                </label>
              </div>
            </SelectItem>
            <SelectItem value="c">
              <div className="flex items-center space-x-2">
                <Checkbox id="five" />
                <label
                  htmlFor="five"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  $5
                </label>
              </div>
            </SelectItem>
            <SelectItem value="d">
              <div className="flex items-center space-x-2">
                <Checkbox id="ten" />
                <label
                  htmlFor="ten"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  $10
                </label>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full flex flex-col gap-4 p-6 items-start rounded-lg border-[1px] ">
        <div className="p-3 flex flex-col gap-[10px] rounded-lg ">
          <div className="w-full flex flex-col gap-4 items-start ">
            <div className="w-full flex justify-between items-center ">
              <div className="flex gap-3 items-center ">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center items-start gap-1 ">
                  <h4 className="text-[14px] font-[500] leading-[20px] ">
                    {user.username}
                  </h4>
                  <h5 className="text-[12px] font-[400] leading-[16px] ">
                    {user.profile.socialmediaurl}
                  </h5>
                </div>
              </div>
              <div className="flex flex-col gap-1 items-end w-[258.5px] ">
                <h4 className="text-[16px] font-[500] leading-[20px] ">
                  +
                  <span className="text-[16px] font-[700] leading-[20px] ">
                    $1
                  </span>
                </h4>
                <h4 className="text-[12px] font-[400] leading-[16px] text-muted-foreground ">
                  10 hours ago
                </h4>
              </div>
            </div>
            <h4 className="text-[14px] font-[400] leading-[20px] w-full ">
              {user.profile.about}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
