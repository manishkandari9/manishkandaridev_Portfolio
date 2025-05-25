import type { PortfolioData } from "@/types/portfolio"

// This file contains all the dynamic data for the portfolio
// You can update this file to change the content of your portfolio

export const portfolioData: PortfolioData = {
  hero: {
    name: "Manish Kandari",
    tagline: "CS Student & Freelance Developer",
    cta: {
      primary: {
        text: "Hire Me",
        link: "#contact",
      },
      secondary: {
        text: "View Work",
        link: "#projects",
      },
    },
  },
  about: {
    title: "About Me",
    subtitle:
      "I'm a passionate Computer Science student and freelance developer with a focus on creating beautiful, functional web experiences.",
    description: [
      "I'm a passionate Computer Science student and freelance developer with a focus on creating beautiful, functional web experiences. With a strong foundation in both frontend and backend technologies, I bring ideas to life through clean code and intuitive design.",
      "When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through my blog. I believe in continuous learning and pushing the boundaries of what's possible on the web.",
    ],
    image: "/my.jpg?height=400&width=400",
    counters: [
      {
        id: "coffee",
        icon: "Coffee",
        value: 100,
        label: "Cups of Coffee",
      },
      {
        id: "projects",
        icon: "Code",
        value: 15,
        label: "Projects",
      },
      {
        id: "hours",
        icon: "Clock",
        value: 1000,
        label: "Hours Coded",
      },
    ],
<<<<<<< HEAD
   /* timeline: [
      {
        id: "timeline-1",
        year: "2022",
        title: "Started Computer Science Degree",
        description:
          "Began my formal education in Computer Science, focusing on algorithms, data structures, and software engineering principles.",
      },
      {
        id: "timeline-2",
        year: "2021",
        title: "First Freelance Project",
        description:
          "Completed my first paid project, a responsive website for a local business, which sparked my passion for freelance development.",
      },
      {
        id: "timeline-3",
        year: "2022",
        title: "Internship at Tech Startup",
        description:
          "Gained valuable industry experience working with a team of developers on a SaaS product, honing my skills in modern web technologies.",
      },
      {
        id: "timeline-4",
        year: "2023",
        title: "Launched Freelance Business",
        description:
          "Officially established my freelance business, offering web development, UI/UX design, and consulting services to clients worldwide.",
      },
    ],
  },*/
=======
  },
>>>>>>> 46f0a68 (add authnication in admin page)
  skills: {
    title: "My Skills",
    subtitle:
      "I've developed a diverse set of skills throughout my journey as a developer. Here's a breakdown of my technical expertise and soft skills.",
    skills: [
      { id: "html-css", name: "HTML/CSS", level: 90, category: "frontend" },
      { id: "javascript", name: "JavaScript", level: 85, category: "frontend" },
      { id: "react", name: "React", level: 80, category: "frontend" },
      { id: "nextjs", name: "Next.js", level: 75, category: "frontend" },
      { id: "typescript", name: "TypeScript", level: 70, category: "frontend" },
      { id: "tailwind", name: "Tailwind CSS", level: 85, category: "frontend" },
      { id: "nodejs", name: "Node.js", level: 75, category: "backend" },
      { id: "express", name: "Express", level: 70, category: "backend" },
      { id: "mongodb", name: "MongoDB", level: 65, category: "backend" },
      { id: "sql", name: "SQL", level: 60, category: "backend" },
      { id: "firebase", name: "Firebase", level: 70, category: "backend" },
      { id: "rest-api", name: "REST APIs", level: 80, category: "backend" },
      { id: "git", name: "Git", level: 85, category: "tools" },
      { id: "vscode", name: "VS Code", level: 90, category: "tools" },
      { id: "figma", name: "Figma", level: 75, category: "tools" },
      { id: "docker", name: "Docker", level: 60, category: "tools" },
      { id: "aws", name: "AWS", level: 55, category: "tools" },
      { id: "cicd", name: "CI/CD", level: 65, category: "tools" },
      { id: "communication", name: "Communication", level: 85, category: "soft" },
      { id: "problem-solving", name: "Problem Solving", level: 90, category: "soft" },
      { id: "time-management", name: "Time Management", level: 80, category: "soft" },
      { id: "teamwork", name: "Teamwork", level: 85, category: "soft" },
      { id: "adaptability", name: "Adaptability", level: 80, category: "soft" },
      { id: "client-relations", name: "Client Relations", level: 75, category: "soft" },
    ],
    techIcons: [
      { id: "javascript", name: "JavaScript", icon: "Braces" },
      { id: "react", name: "React", icon: "Layers" },
      { id: "nextjs", name: "Next.js", icon: "Globe" },
      { id: "mongodb", name: "MongoDB", icon: "Database" },
      { id: "tailwind", name: "Tailwind", icon: "Palette" },
      { id: "git", name: "Git", icon: "GitBranch" },
      { id: "nodejs", name: "Node.js", icon: "Cpu" },
      { id: "express", name: "Express", icon: "Server" },
      { id: "sql", name: "SQL", icon: "Database" },
      { id: "firebase", name: "Firebase", icon: "Layers" },
      { id: "figma", name: "Figma", icon: "Palette" },
      { id: "typescript", name: "TypeScript", icon: "MessageSquare" },
    ],
  },
  projects: {
    title: "My Projects",
    subtitle:
      "Here are some of the projects I've worked on. Each one presented unique challenges and opportunities to learn and grow as a developer.",
    projects: [
      {
        id: "project-1",
        title: "E-commerce Platform",
        description:
          "A full-stack e-commerce platform with product management, cart functionality, and payment integration.",
        image: "/placeholder.svg?height=600&width=800",
        category: "web",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
        liveLink: "https://example.com",
        codeLink: "https://github.com",
        challenge:
          "Implementing a secure payment system and optimizing the performance of product filtering and search.",
        solution:
          "Utilized Stripe's secure payment API and implemented server-side filtering with pagination to improve performance.",
      },
      {
        id: "project-2",
        title: "Task Management App",
        description: "A mobile-first task management application with real-time updates and offline capabilities.",
        image: "/placeholder.svg?height=600&width=800",
        category: "mobile",
        technologies: ["React Native", "Firebase", "Redux", "Expo"],
        liveLink: "https://example.com",
        codeLink: "https://github.com",
        challenge: "Ensuring data synchronization between offline and online modes without conflicts.",
        solution: "Implemented a custom synchronization algorithm with timestamp-based conflict resolution.",
      },
      {
        id: "project-3",
        title: "API Gateway Service",
        description:
          "A microservice-based API gateway that handles authentication, rate limiting, and request routing.",
        image: "/placeholder.svg?height=600&width=800",
        category: "backend",
        technologies: ["Node.js", "Express", "Docker", "Redis", "JWT"],
        codeLink: "https://github.com",
        challenge:
          "Designing a scalable architecture that could handle high traffic loads without becoming a bottleneck.",
        solution: "Implemented a horizontally scalable design with Redis for distributed caching and rate limiting.",
      },
      {
        id: "project-4",
        title: "Finance Dashboard UI",
        description:
          "A comprehensive financial dashboard with interactive charts, data visualization, and responsive design.",
        image: "/placeholder.svg?height=600&width=800",
        category: "ui/ux",
        technologies: ["Figma", "React", "Chart.js", "Tailwind CSS"],
        liveLink: "https://example.com",
        challenge: "Creating an intuitive interface that could display complex financial data in an accessible way.",
        solution:
          "Conducted user research to inform the design and used progressive disclosure patterns to manage complexity.",
      },
      {
        id: "project-5",
        title: "Social Media Platform",
        description: "A social networking platform with real-time messaging, post sharing, and user connections.",
        image: "/placeholder.svg?height=600&width=800",
        category: "web",
        technologies: ["React", "Node.js", "Socket.io", "MongoDB", "AWS S3"],
        liveLink: "https://example.com",
        codeLink: "https://github.com",
        challenge:
          "Building a scalable real-time communication system that could support thousands of concurrent users.",
        solution:
          "Implemented a microservice architecture with Socket.io for real-time features and optimized database queries.",
      },
      {
        id: "project-6",
        title: "Fitness Tracking App",
        description:
          "A mobile application for tracking workouts, nutrition, and fitness progress with personalized recommendations.",
        image: "/placeholder.svg?height=600&width=800",
        category: "mobile",
        technologies: ["Flutter", "Firebase", "TensorFlow Lite"],
        liveLink: "https://example.com",
        challenge: "Implementing accurate exercise recognition and providing meaningful insights from user data.",
        solution:
          "Used TensorFlow Lite for on-device pose estimation and developed custom algorithms for progress tracking.",
      },
    ],
  },
  services: {
    title: "My Services",
    subtitle:
      "I offer a range of services to help businesses and individuals establish a strong online presence. From design to development, I've got you covered.",
    services: [
      {
        id: "service-1",
        icon: "Palette",
        title: "UI/UX Design",
        description: "Beautiful, intuitive designs that engage users and elevate your brand.",
        tiers: [
          {
            id: "uiux-basic",
            title: "Basic",
            price: "$499",
            description: "Perfect for small businesses and startups",
            features: ["Responsive design", "3 page designs", "2 revision rounds", "Source files included"],
            cta: "Get Started",
          },
          {
            id: "uiux-standard",
            title: "Standard",
            price: "$999",
            description: "Ideal for growing businesses",
            features: [
              "Responsive design",
              "5-7 page designs",
              "3 revision rounds",
              "Source files included",
              "Interactive prototypes",
              "User flow diagrams",
            ],
            cta: "Get Started",
            popular: true,
          },
          {
            id: "uiux-premium",
            title: "Premium",
            price: "$1,999",
            description: "For established businesses with complex needs",
            features: [
              "Responsive design",
              "10+ page designs",
              "Unlimited revisions",
              "Source files included",
              "Interactive prototypes",
              "User flow diagrams",
              "User testing",
              "Brand style guide",
            ],
            cta: "Get Started",
          },
        ],
      },
      {
        id: "service-2",
        icon: "Code",
        title: "Web Development",
        description: "Custom web applications and websites built with modern technologies.",
        tiers: [
          {
            id: "webdev-basic",
            title: "Basic",
            price: "$999",
            description: "Simple websites for small businesses",
            features: ["Responsive design", "5 pages", "Contact form", "Basic SEO", "CMS integration"],
            cta: "Get Started",
          },
          {
            id: "webdev-standard",
            title: "Standard",
            price: "$2,499",
            description: "Feature-rich websites for growing businesses",
            features: [
              "Responsive design",
              "Up to 10 pages",
              "Advanced contact forms",
              "SEO optimization",
              "CMS integration",
              "E-commerce functionality",
              "Performance optimization",
            ],
            cta: "Get Started",
            popular: true,
          },
          {
            id: "webdev-premium",
            title: "Premium",
            price: "$4,999+",
            description: "Custom web applications with advanced features",
            features: [
              "Responsive design",
              "Unlimited pages",
              "Custom functionality",
              "Advanced SEO",
              "CMS integration",
              "E-commerce with payment processing",
              "Performance optimization",
              "User authentication",
              "API integrations",
            ],
            cta: "Get Started",
          },
        ],
      },
    ],
    ctaTitle: "Need a custom solution?",
    ctaText:
      "I understand that every project is unique. Contact me for a personalized quote tailored to your specific requirements.",
    ctaButton: "Get in Touch",
  },
  feedback: {
    title: "Feedback",
    subtitle: "Your feedback helps me improve and grow. I appreciate your thoughts and suggestions.",
    formTitle: "Leave Feedback",
    formSubtitle:
      "Your feedback helps me improve my services and create better experiences. Please share your thoughts!",
    displayTitle: "What People Say",
    displaySubtitle: "Here's what others have shared about their experience working with me.",
    userFeedback: [
      {
        id: "feedback-1",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        rating: 5,
        message:
          "Working with Manish was a pleasure! He delivered our project on time and exceeded our expectations. His attention to detail and communication skills made the process smooth and enjoyable.",
        date: "2023-05-15",
        approved: true,
      },
      {
        id: "feedback-2",
        name: "Michael Chen",
        email: "michael@example.com",
        rating: 4,
        message:
          "Manish helped us build our company website and did an excellent job. He was responsive to our feedback and made sure everything was perfect before launch.",
        date: "2023-06-22",
        approved: true,
      },
      {
        id: "feedback-3",
        name: "Emily Rodriguez",
        email: "emily@example.com",
        rating: 5,
        message:
          "I hired Manish for a complex web application project, and he delivered beyond my expectations. His technical skills are impressive, and he's great at explaining technical concepts in simple terms.",
        date: "2023-07-10",
        approved: true,
      },
      {
        id: "feedback-4",
        name: "David Kim",
        email: "david@example.com",
        rating: 5,
        message:
          "Manish is a talented developer who truly cares about his clients. He took the time to understand our business needs and created a solution that perfectly matched our requirements.",
        date: "2023-08-05",
        approved: true,
      },
      {
        id: "feedback-5",
        name: "Lisa Patel",
        email: "lisa@example.com",
        rating: 4,
        message:
          "Great experience working with Manish! He's knowledgeable, professional, and delivers high-quality work. Would definitely recommend him to others looking for web development services.",
        date: "2023-09-18",
        approved: true,
      },
      {
        id: "feedback-6",
        name: "James Wilson",
        email: "james@example.com",
        rating: 5,
        message:
          "Manish helped us revamp our outdated website, and the results were amazing. Our site now looks modern, loads faster, and is much more user-friendly. Couldn't be happier with the outcome!",
        date: "2023-10-30",
        approved: true,
      },
    ],
  },
  contact: {
    title: "Get In Touch",
    subtitle:
      "Have a project in mind or want to discuss a potential collaboration? I'd love to hear from you. Fill out the form below or reach out directly.",
    info: {
      email: "manish@example.com",
      phone: "+1 (234) 567-890",
      location: "New Delhi, India",
      whatsapp: "https://wa.me/1234567890",
      socials: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
      },
    },
  },
  siteInfo: {
    name: "Manish Kandari",
    footerText: "Built with Next.js, TailwindCSS, and Framer Motion",
  },
}