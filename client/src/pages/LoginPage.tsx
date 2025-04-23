// External imports and utilities
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// UI components
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

// Routing, authentication, and utilities
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@/lib/api/auth"; // API call for logging in
import { useAuth } from "@/auth/useAuth"; // Auth context for login method
import { toast } from "sonner"; // Notification utility
import { Loader2 } from "lucide-react"; // Icon for loading spinner
import { useState } from "react";

// Define form schema using Zod for validation
const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState<boolean>(false); // Loading state for form submission

  // Initialize react-hook-form with Zod resolver
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setLoading(true); // Show loader
    try {
      const res = await loginUser(values); // API call to login
      login(res.data.access_token); // Store token in auth context

      navigate("/"); // Redirect to homepage on success
    } catch (error: unknown) {
      toast.error((error as Error).message); // Show error toast on failure
    } finally {
      setLoading(false); // Reset loading state
    }
  }

  return (
    <div className="container flex items-center justify-center h-dvh">
      {/* Login Card container */}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to start using this app</CardDescription>
        </CardHeader>

        {/* Login form */}
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        {/* Footer with registration link */}
        <CardFooter>
          <p className="text-center text-sm w-full">
            Don't have an account yet?{" "}
            <Link
              to={{ pathname: "/auth/register" }}
              className="text-blue-500 dark:text-sky-500 hover:underline"
            >
              Register here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
