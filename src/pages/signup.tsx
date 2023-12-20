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
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "@/api/axios";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

function Signup() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
            const response = await axios.post("/users/register", values, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="h-screen   bg-purple flex justify-center items-center ">
            <Link to="/" className="text-white  absolute top-4 left-4">
                Back
            </Link>
            <div className="h-auto bg-white  p-7 shadow-md rounded-md  w-96 ">
                <h1 className="text-2xl">
                    <b>Create Account</b>
                </h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-3 "
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="email@example.com"
                                            {...field}
                                            required
                                            autoComplete="email"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Use the same one as your GGyess account.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="password"
                                            type="password"
                                            required
                                            autoComplete="current-password"
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className=" flex justify-end">
                            <Button type="submit">Sign Up</Button>
                        </div>
                        <div className="w-full text-center">
                            <Link to="/login" className="text-purple text-sm">
                                Already have an account?
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default Signup;
