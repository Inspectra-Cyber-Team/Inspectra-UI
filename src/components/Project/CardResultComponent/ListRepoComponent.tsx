"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useGetAllUserRepositoriesQuery } from "@/redux/service/git";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const FormSchema = z.object({
  selectedRepo: z.string().min(1, "Please select a repository"),
});

export function ListRepoComponent() {
  const [isUserAccessToken, setIsUserAccessToken] = useState<any>("");
  const { data: userRepo } = useGetAllUserRepositoriesQuery({
    accessToken: isUserAccessToken,
  });
  const { data: session } = useSession();

  const userData = () => {
    if (session) {
      const accessToken = (session as any).accessToken;
      setIsUserAccessToken(accessToken);
    } else {
      console.log("No session found");
    }
  };

  useEffect(() => {
    userData();
  }, [session]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      selectedRepo: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-[60px] items-end flex flex-col justify-end"
      >
        <FormField
          control={form.control}
          name="selectedRepo"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 md:gap-10 bg-card_color_light dark:bg-card_color_dark p-10 rounded-[20px]">
              {userRepo?.map((item: any) => (
                <FormItem
                  key={item.id}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value === item.full_name}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange(item.full_name);
                        } else {
                          field.onChange("");
                        }
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-text_body_16 text-start text-text_color_light dark:text-text_color_dark">
                    {item?.full_name}
                  </FormLabel>
                </FormItem>
              ))}
              <FormMessage className="text-text_body_16 text-custom_red" />
            </FormItem>
          )}
        />
        <button
          className="mt-[50px] bg-primary_color text-text_body_16 text-text_color_light rounded-tl-[14px] rounded-br-[14px] px-4 lg:px-4 py-2 lg:py-1.5"
          type="submit"
        >
          Submit
        </button>
      </form>
    </Form>
  );
}
