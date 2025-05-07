// React Hook Form, Zod schema, and resolver for validation
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// UI Components for Form and Layout
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Router and Auth utilities
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/useAuth"; // Auth context
import { toast } from "sonner"; // Notification system
import { Loader2 } from "lucide-react"; // Loading spinner icon
import usePost from "@/hooks/usePost";
import { useEffect } from "react";

// Define form schema for validation using Zod
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterRequest = {
  name: string;
  username: string;
  password: string;
};

type RegisterResponse = {
  access_token: string;
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Auth context to login after registration
  const { error, loading, execute } = usePost<
    RegisterRequest,
    RegisterResponse
  >({ endpoint: "/auth/register", method: "POST" });

  // React Hook Form setup
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // Handle form submission
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const response = await execute(values);

    if (!response) return;

    login(response.access_token);
    navigate("/");
  }

  return (
    <div className="container flex h-dvh items-center justify-center">
      {/* Registration form card */}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Register to start using this app</CardDescription>
        </CardHeader>

        {/* Registration Form */}
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Name field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Username field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit button with loading indicator */}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Submitting...</span>
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>

        {/* Link to login page */}
        <CardFooter>
          <p className="w-full text-center text-sm">
            Have an account?{" "}
            <Link
              to={{ pathname: "/auth/login" }}
              className="text-blue-500 hover:underline dark:text-sky-500"
            >
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
