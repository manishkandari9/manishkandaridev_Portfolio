import type { MetadataRoute } from "next";

const DOMAIN = "https://manishkandaridev-portfolio.vercel.app";

async function getDynamicPages() {
  try {
    const [projectsResponse, feedbackResponse, contactResponse] = await Promise.all([
      fetch("https://backend-cf0k.onrender.com/api/projects", { cache: "no-store" }),
      fetch("https://backend-cf0k.onrender.com/feedback", { cache: "no-store" }),
      fetch("https://backend-cf0k.onrender.com/api/contact", { cache: "no-store" }),
    ]);

    const [projects, feedback, contact] = await Promise.all([
      projectsResponse.json(),
      feedbackResponse.json(),
      contactResponse.json(),
    ]);

    return { projects, feedback, contact };
  } catch (error) {
    console.error("Error fetching dynamic pages:", error);
    return { projects: [], feedback: [], contact: {} };
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects, feedback, contact } = await getDynamicPages();

  // ✅ Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${DOMAIN}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${DOMAIN}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${DOMAIN}/skills`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${DOMAIN}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // ✅ Dynamic Projects
  const projectPages: MetadataRoute.Sitemap = projects.map((project: any) => ({
    url: `${DOMAIN}/projects/${project._id}`,
    lastModified: project.updatedAt
      ? new Date(project.updatedAt)
      : project.date
      ? new Date(project.date)
      : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // ✅ Dynamic Feedback (only approved)
  const feedbackPages: MetadataRoute.Sitemap = feedback
    .filter((item: any) => item.approved)
    .map((item: any) => ({
      url: `${DOMAIN}/feedback/${item._id}`,
      lastModified: item.updatedAt
        ? new Date(item.updatedAt)
        : item.date
        ? new Date(item.date)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));

  // ✅ Contact Page (if exists)
  const contactPage: MetadataRoute.Sitemap = contact
    ? [
        {
          url: `${DOMAIN}/contact`,
          lastModified: contact.updatedAt
            ? new Date(contact.updatedAt)
            : contact.date
            ? new Date(contact.date)
            : new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        },
      ]
    : [];

  return [...staticPages, ...projectPages, ...feedbackPages, ...contactPage];
}
