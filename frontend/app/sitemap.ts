import type { MetadataRoute } from 'next';

export const dynamic = "force-dynamic"; // Force server-side rendering

async function getDynamicPages() {
  try {
    const projectsResponse = await fetch('https://backend-cf0k.onrender.com/api/projects', {
      cache: "no-store",
    });
    const feedbackResponse = await fetch('https://backend-cf0k.onrender.com/feedback', {
      cache: "no-store",
    });
    const contactResponse = await fetch('https://backend-cf0k.onrender.com/api/contact', {
      cache: "no-store",
    });

    const projects = await projectsResponse.json();
    const feedback = await feedbackResponse.json();
    const contact = await contactResponse.json();

    return { projects, feedback, contact };
  } catch (err) {
    console.error("Error fetching dynamic pages:", err);
    return { projects: [], feedback: [], contact: {} };
  }
}

const DOMAIN = 'https://manishkandaridev-portfolio.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects, feedback, contact } = await getDynamicPages();

  const staticPages = [
    {
      url: `${DOMAIN}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${DOMAIN}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN}/skills`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN}/services`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const dynamicPages = [
    ...projects.map((project: any) => ({
      url: `${DOMAIN}/projects/${project._id}`,
      lastModified: project.date ? new Date(project.date).toISOString() : new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
    ...feedback
      .filter((item: any) => item.approved)
      .map((item: any) => ({
        url: `${DOMAIN}/feedback/${item._id}`,
        lastModified: item.date ? new Date(item.date).toISOString() : new Date().toISOString(),
        changeFrequency: 'weekly',
        priority: 0.6,
      })),
    {
      url: `${DOMAIN}/contact`,
      lastModified: contact?.date ? new Date(contact.date).toISOString() : new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  return [...staticPages, ...dynamicPages];
}
