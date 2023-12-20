import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "../api/axios";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

function Login() {
    const { setAuth, auth } = useAuth()!;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log(values);
            setIsLoading(true);
            const response = await axios.post("/users/login", values, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            const accessToken = response.data.access_token;
            const user = response.data.user;

            console.log(response.data);
            setAuth({ user, access_token: accessToken });
            navigate("/home");
        } catch (err) {
            console.log(err);
        }

        setIsLoading(false);
    }

    return (
        <div className="h-screen   bg-purple flex justify-center items-center ">
            <Link to="/" className="text-white  absolute top-4 left-4">
                Back
            </Link>
            <div className="h-auto bg-white p-7 shadow-md rounded-md  w-96  ">
                <h1 className="text-2xl ">
                    <b>Login</b>
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
                                            {...field}
                                            required
                                            autoComplete="current-password"
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className=" flex justify-end">
                            <Button type="submit" disabled={isLoading}>
                                Sign In
                            </Button>
                        </div>
                        <div className="w-full text-center">
                            <Link to="/signup" className="text-purple text-sm">
                                Don't have an account?
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}

export default Login;
