"use client";

import * as z from "zod";
import axios from "axios";
import { Heading } from "@/components/heading"
import { Copy, Download, ImageIcon, Key, MailIcon, MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema, toneOptions, variantOptions } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/Loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ReactMarkdown from "react-markdown";
import { ChatCompletionRequestMessage } from "openai";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

const MailPage = () => {
    const proModal = useProModal
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            resolution: "1 variant"

        } 
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionRequestMessage = {
                role: "user",
                content: values.prompt,
            };

            const newMessages = [...messages, userMessage];

            const response= await axios.post("/api/mail", {
                messages: newMessages,
            }); 
            
            setMessages((current) => [...current, userMessage, response.data]);
            form.reset();

        }  catch (error: any) {
            if (error?.response?.status === 403) {
            //    proModal.onOpen();
            } else {
               toast.error("Something went wrong");
            }
         }  finally {
             router.refresh();
            }
    }
    return (
        <div>
            <Heading
               title= "Mail Generation"
               description= "Turn a few keypoints into a ready to send mail."
               icon={MailIcon}
               iconColor="text-emerald-700"
               bgColor="bg-emerald-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form 
                          onSubmit={form.handleSubmit(onSubmit)}
                          className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField 
                               name="prompt" 
                               render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input 
                                           className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                           disabled={isLoading}
                                           placeholder="Turn a few keypoints into a ready to send mail"
                                           {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}/>

                            <FormField 
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <Select
                                           disabled={isLoading}
                                           onValueChange={field.onChange}
                                           value={field.value}
                                           defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select tone" defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {toneOptions.map((option) => (
                                                    <SelectItem 
                                                       key={option.value}
                                                       value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="resolution"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-6">
                                        <Select
                                           disabled={isLoading}
                                           onValueChange={field.onChange}
                                           value={field.value}
                                           defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {variantOptions.map((option) => (
                                                    <SelectItem 
                                                       key={option.value}
                                                       value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>

                                        </Select>

                                    </FormItem>
                                )}
                            />

                            <Button className="col-span-12 lg:col-span-2 w-full"
                              disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty label="No conversation started." />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) => (
                            <div 
                              key={message.content}
                              className={cn("p-8 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}
                            >
                                {message.role === "user"? <UserAvatar /> : <BotAvatar />}
                                <ReactMarkdown
                                    components={{
                                        pre: ({ node, ...props }) => (
                                            <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                                <pre {...props} />
                                            </div>
                                        ),
                                        code: ({ node, ...props }) => (
                                            <code className="bg-black/10 rounded-lg p-1" {...props} />

                                        )
                                    }}
                                    className="text-sm overflow-hidden leading-7"
                                >
                                    {message.content || ""}
                                </ReactMarkdown> 
                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>       
    )
}

export default MailPage;
