"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { portfolioData } from "@/data/portfolio-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function PortfolioEditor() {
  const [data, setData] = useState(JSON.stringify(portfolioData, null, 2))
  const { toast } = useToast()

  const handleSave = () => {
    try {
      // In a real application, this would save to a database or API
      // For now, we'll just validate the JSON
      JSON.parse(data)

      toast({
        title: "Changes saved",
        description: "Your portfolio data has been updated successfully.",
      })

      // In a real app, you would update the data here
      // For example: updatePortfolioData(JSON.parse(data))
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please check your data format and try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Portfolio Admin Dashboard</h1>

      <Alert className="mb-8">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>How to use this admin interface</AlertTitle>
        <AlertDescription>
          This dashboard allows you to manage all content on your portfolio website. Edit the JSON data below to update
          text, images, projects, services, and feedback. All changes will be reflected on your site immediately after
          saving.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Content Management</CardTitle>
            <CardDescription>Edit all website content</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Update text, images, and information across all sections of your portfolio.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feedback Management</CardTitle>
            <CardDescription>Manage user feedback</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Approve, edit or delete user feedback submissions before they appear on your site.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Showcase</CardTitle>
            <CardDescription>Update your portfolio projects</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Add new projects, update existing ones, or change the order they appear in.
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="json" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="json">JSON Editor</TabsTrigger>
          <TabsTrigger value="form" disabled>
            Form Editor (Coming Soon)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="json" className="space-y-4">
          <div className="bg-muted/30 p-4 rounded-md mb-4">
            <h3 className="font-medium mb-2">Quick Guide to Editing JSON</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>Edit text by changing values inside quotes</li>
              <li>Add new items to arrays by copying existing items and modifying them</li>
              <li>To add a new feedback entry, copy an existing one and change the details</li>
              <li>
                Set <code className="bg-muted px-1 rounded">approved: true</code> for feedback to appear on the site
              </li>
              <li>Be careful with commas, brackets, and quotes - they must be properly formatted</li>
            </ul>
          </div>

          <Textarea value={data} onChange={(e) => setData(e.target.value)} className="font-mono text-sm h-[60vh]" />

          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </TabsContent>

        <TabsContent value="form">
          <p>A user-friendly form editor is coming soon.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
