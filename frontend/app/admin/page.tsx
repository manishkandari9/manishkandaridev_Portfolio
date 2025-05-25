// app/admin/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import SignIn from "@/components/admin/SignIn";
import SignUp from "@/components/admin/SignUp";
import PortfolioEditor from "@/components/admin/portfolio-editor";
import { Loader2 } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("https://backend-cf0k.onrender.com/auth/verify", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
          router.push("/admin/portfolio-editor");
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleToggleForm = () => {
    setShowSignUp(!showSignUp);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <PortfolioEditor />;
  }

  return showSignUp ? (
    <SignUp onToggleForm={handleToggleForm} />
  ) : (
    <SignIn onToggleForm={handleToggleForm} />
  );
}