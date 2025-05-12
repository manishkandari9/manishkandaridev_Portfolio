"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PortfolioEditor() {
  const { toast } = useToast();
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    image: "",
    category: "web" as "web" | "mobile" | "backend" | "ui/ux",
    technologies: "",
    liveLink: "",
    codeLink: "",
    challenge: "",
    solution: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://backend-cf0k.onrender.com/api/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...projectForm,
          technologies: projectForm.technologies.split(",").map((tech) => tech.trim()),
        }),
      });

      if (response.ok) {
        toast({
          title: "Project Added",
          description: "Your project has been successfully added to the portfolio.",
          className: "bg-green-500 text-white",
        });
        setProjectForm({
          title: "",
          description: "",
          image: "",
          category: "web",
          technologies: "",
          liveLink: "",
          codeLink: "",
          challenge: "",
          solution: "",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to add project. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="container py-10 min-h-screen bg-gradient-to-b from-background to-muted/20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Portfolio Admin Dashboard
        </h1>

        <Alert className="mb-8 shadow-lg">
          <InfoIcon className="h-5 w-5 text-blue-500" />
          <AlertTitle className="text-lg font-semibold">Manage Your Portfolio</AlertTitle>
          <AlertDescription>
            Add new projects to your portfolio with this intuitive interface. Fill out the form below, and your project
            will be instantly available on your website, categorized appropriately.
          </AlertDescription>
        </Alert>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl">Project Management</CardTitle>
            <CardDescription>Add and organize projects</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Easily add new projects to showcase your work, categorized by Web, Mobile, Backend, or UI/UX.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl">Content Updates</CardTitle>
            <CardDescription>Keep your portfolio fresh</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Update project details to reflect your latest achievements and skills.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl">Real-Time Sync</CardTitle>
            <CardDescription>Instant website updates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Changes are reflected on your portfolio website immediately after saving.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="shadow-2xl border border-muted/20">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary">Add New Project</CardTitle>
            <CardDescription className="text-muted-foreground">
              Complete the form below to add a new project to your portfolio.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium">
                    Project Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={projectForm.title}
                    onChange={handleChange}
                    placeholder="E.g., E-commerce Platform"
                    required
                    className="mt-1 focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-sm font-medium">
                    Category
                  </Label>
                  <Select
                    value={projectForm.category}
                    onValueChange={(value) =>
                      setProjectForm({ ...projectForm, category: value as "web" | "mobile" | "backend" | "ui/ux" })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="backend">Backend</SelectItem>
                      <SelectItem value="ui/ux">UI/UX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={projectForm.description}
                  onChange={handleChange}
                  placeholder="E.g., A full-stack e-commerce platform with product management..."
                  required
                  className="mt-1 h-32 focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <Label htmlFor="image" className="text-sm font-medium">
                  Image URL
                </Label>
                <Input
                  id="image"
                  name="image"
                  value={projectForm.image}
                  onChange={handleChange}
                  placeholder="E.g., https://example.com/image.jpg"
                  required
                  className="mt-1 focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <Label htmlFor="technologies" className="text-sm font-medium">
                  Technologies (comma-separated)
                </Label>
                <Input
                  id="technologies"
                  name="technologies"
                  value={projectForm.technologies}
                  onChange={handleChange}
                  placeholder="E.g., React, Node.js, MongoDB"
                  required
                  className="mt-1 focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="liveLink" className="text-sm font-medium">
                    Live Link (optional)
                  </Label>
                  <Input
                    id="liveLink"
                    name="liveLink"
                    value={projectForm.liveLink}
                    onChange={handleChange}
                    placeholder="E.g., https://example.com"
                    className="mt-1 focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>

                <div>
                  <Label htmlFor="codeLink" className="text-sm font-medium">
                    Code Link (optional)
                  </Label>
                  <Input
                    id="codeLink"
                    name="codeLink"
                    value={projectForm.codeLink}
                    onChange={handleChange}
                    placeholder="E.g., https://github.com"
                    className="mt-1 focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="challenge" className="text-sm font-medium">
                  Challenge
                </Label>
                <Textarea
                  id="challenge"
                  name="challenge"
                  value={projectForm.challenge}
                  onChange={handleChange}
                  placeholder="E.g., Implementing a secure payment system..."
                  required
                  className="mt-1 h-24 focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div>
                <Label htmlFor="solution" className="text-sm font-medium">
                  Solution
                </Label>
                <Textarea
                  id="solution"
                  name="solution"
                  value={projectForm.solution}
                  onChange={handleChange}
                  placeholder="E.g., Utilized Stripe's secure payment API..."
                  required
                  className="mt-1 h-24 focus:ring-2 focus:ring-primary transition-all"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex items-center gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all"
                >
                  <PlusCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  {isSubmitting ? "Adding..." : "Add Project"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}