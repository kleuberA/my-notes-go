"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertNote } from "@/queries/insert-notes";
import { PlusIcon } from "@radix-ui/react-icons";
import useSupabase from "@/hooks/use-supabase";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { z } from "zod";

const FormSchema = z.object({
    name: z.string().min(5, {
        message: "Name must be at least 5 characters.",
    }),
})

export default function CreateNote() {

    const client = useSupabase();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {

        const queryInserNote = await InsertNote(client, data);

        if (queryInserNote) {
            toast.success("Note created successfully!",
                {
                    style: {
                        borderRadius: '5px',
                        background: '#1c1c1c',
                        color: '#fff',
                        border: '1px solid #2e2e2e'
                    },
                });
        } else {
            toast.error("Error creating Note!",
                {
                    style: {
                        borderRadius: '5px',
                        background: '#1c1c1c',
                        color: '#fff',
                        border: '1px solid #2e2e2e'
                    },
                });
        }

        form.reset();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="flex flex-row gap-2 items-center"> <PlusIcon /> Create Note </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Create Note</DialogTitle>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Annotation name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" >Create</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}