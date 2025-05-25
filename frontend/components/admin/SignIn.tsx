"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface SignInForm {
  email: string;
  password: string;
}

interface SignInProps {
  onToggleForm: () => void;
}

export default function SignIn({ onToggleForm }: SignInProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [form, setForm] = useState<SignInForm>({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://backend-cf0k.onrender.com/auth/signin",
        {
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast({
          title: "Success",
          description: response.data.message || "Signed in successfully.",
          className: "bg-green-500 text-white",
        });
        router.push("/admin/portfolio-editor");
      } else {
        throw new Error("Failed to sign in");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Invalid email or password. Please try again.");
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to sign in.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-purple-500/10 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border border-primary/10 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary">Admin Sign In</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to manage your portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                    className="pl-10 mt-1 focus:ring-2 focus:ring-primary/70 focus:border-primary/70 transition-all duration-300 shadow-sm"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                    className="pl-10 mt-1 focus:ring-2 focus:ring-primary/70 focus:border-primary/70 transition-all duration-300 shadow-sm"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/80 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg hover:translate-y-[-2px]"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button onClick={onToggleForm} className="text-primary hover:underline">
                Sign Up
              </button>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}