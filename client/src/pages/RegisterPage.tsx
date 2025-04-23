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
import { registerUser } from "@/lib/api/auth"; // API call to register
import { useAuth } from "@/auth/useAuth"; // Auth context
import { toast } from "sonner"; // Notification system
import { Loader2 } from "lucide-react"; // Loading spinner icon
import { useState } from "react";

// Define form schema for validation using Zod
const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Auth context to login after registration
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading spinner

  // React Hook Form setup
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setLoading(true); // Show loading spinner
    try {
      const res = await registerUser(values); // API call to register
      login(res.data.access_token); // Store token and mark as logged in
      navigate("/"); // Navigate to home page
    } catch (error: unknown) {
      toast.error((error as Error).message); // Show error toast
    } finally {
      setLoading(false); // Reset loading spinner
    }
  }

  return (
    <div className="container flex items-center justify-center h-dvh">
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
                    <Loader2 className="animate-spin w-4 h-4" />
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
          <p className="text-center text-sm w-full">
            Have an account?{" "}
            <Link
              to={{ pathname: "/auth/login" }}
              className="text-blue-500 dark:text-sky-500 hover:underline"
            >
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
