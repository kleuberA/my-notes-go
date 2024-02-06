"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import isAuthenticated from "@/hooks/isAuthenticated";
import useSupabase from "@/hooks/use-supabase";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import Link from "next/link";
import { z } from "zod";

const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
})


export default function SignInComponent() {

    const supabase = useSupabase();

    isAuthenticated();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {

        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        })

        if (error) {
            toast.error(error.message,
                {
                    style: {
                        borderRadius: '3px',
                        background: '#333',
                        color: '#fff',
                    },
                });
        } else {
            toast.success("Login successfully!",
                {
                    style: {
                        borderRadius: '3px',
                        background: '#333',
                        color: '#fff',
                    },
                });
        }
        form.reset();
    }

    return (
        <section className="w-full h-screen flex justify-center items-center">
            <div className="bg-secondary/50 flex flex-col gap-3 w-[25dvw] rounded-sm h-[60dvh] border border-ring">
                <div className="p-4 flex flex-col gap-1">
                    <h1 className="text-xl text-primary font-bold">Welcome Back!</h1>
                    <span className="text-sm text-accent-foreground">SignIn</span>
                </div>
                <div className="p-4 w-full">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="emailexample@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex flex-row justify-between">
                                            <FormLabel>Password</FormLabel>
                                            <Link href="/auth/fortgotpassword" className="text-sm text-primary hover:underline" >Forgot Password?</Link>
                                        </div>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full hover:bg-transparent hover:text-primary border border-transparent hover:border-primary transition-all duration-300">
                                SignIn
                            </Button>
                        </form>
                    </Form>
                    <div className="pt-5">
                        <span className="text-sm flex gap-1 text-secondary-foreground">
                            Don't have an account?
                            <Link className="text-sm text-primary underline" href="/auth/signup">Register now</Link>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}