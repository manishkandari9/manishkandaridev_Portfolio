import type { MetadataRoute } from 'next';

async function getDynamicPages() {
  // Fetch data from backend APIs
  const projectsResponse = await fetch('https://backend-cf0k.onrender.com/api/projects');
  const feedbackResponse = await fetch('https://backend-cf0k.onrender.com/feedback');
  const contactResponse = await fetch('https://backend-cf0k.onrender.com/api/contact');

  const projects = await projectsResponse.json();
  const feedback = await feedbackResponse.json();
  const contact = await contactResponse.json();

  return { projects, feedback, contact };
}

const DOMAIN = 'https://manishkandaridev-portfolio.vercel.app'; // Correct domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects, feedback, contact } = await getDynamicPages();

  const staticPages = [
    {
      url: `${DOMAIN}/`,
      lastModified: new Date('2025-08-28T06:10:00Z'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${DOMAIN}/about`,
      lastModified: new Date('2025-08-28T06:10:00Z'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN}/skills`,
      lastModified: new Date('2025-08-28T06:10:00Z'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN}/services`,
      lastModified: new Date('2025-08-28T06:10:00Z'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const dynamicPages = [
    ...projects.map((project: any) => ({
      url: `${DOMAIN}/projects/${project._id}`,
      lastModified: project.date ? new Date(project.date) : new Date('2025-08-28T06:10:00Z'),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
    ...feedback
      .filter((item: any) => item.approved)
      .map((item: any) => ({
        url: `${DOMAIN}/feedback/${item._id}`,
        lastModified: item.date ? new Date(item.date) : new Date('2025-08-28T06:10:00Z'),
        changeFrequency: 'weekly',
        priority: 0.6,
      })),
    {
      url: `${DOMAIN}/contact`,
      lastModified: contact.date ? new Date(contact.date) : new Date('2025-08-28T06:10:00Z'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  return [...staticPages, ...dynamicPages];
}
