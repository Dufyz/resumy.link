import LinkSection from "@/app/[user]/components/link-section";
import Profile from "@/app/[user]/components/profile";
import {
  Briefcase,
  Code,
  User,
  GraduationCap,
  Trophy,
  Globe,
} from "lucide-react";

export default function UserPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 py-8 lg:py-12 flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row lg:items-start lg:gap-8">
        <div className="lg:sticky lg:top-8 lg:w-1/4 mb-8 lg:mb-0">
          <Profile
            name="John Doe"
            title="Senior Software Engineer"
            image="/placeholder.svg"
          />
        </div>
        <div className="w-full lg:w-3/4 space-y-6">
          <LinkSection
            icon={<User className="w-5 h-5" />}
            title="About Me"
            items={[
              {
                main: true,
                title: "Full-stack Developer",
                subtitle: "5+ years of experience",
                content:
                  "Passionate about building scalable web applications with clean code and great UX.",
              },
            ]}
          />

          <LinkSection
            icon={<Code className="w-5 h-5" />}
            title="Projects"
            items={[
              {
                main: true,
                title: "E-commerce Platform",
                subtitle: "Next.js • TypeScript • Stripe",
                link: "https://project1.com",
              },
              {
                main: false,
                title: "AI Chat Application",
                subtitle: "React • OpenAI • Node.js",
                link: "https://project2.com",
              },
              {
                main: false,
                title: "Task Management Dashboard",
                subtitle: "Vue.js • Firebase • Material UI",
                link: "https://project3.com",
              },
            ]}
          />

          <LinkSection
            icon={<Briefcase className="w-5 h-5" />}
            title="Experience"
            items={[
              {
                main: true,
                title: "Senior Full Stack Developer",
                subtitle: "Tech Corp • 2021 - Present",
                content: "Leading development of enterprise applications",
              },
              {
                main: false,
                title: "Frontend Developer",
                subtitle: "StartUp Inc • 2019 - 2021",
                content: "Developed modern web applications",
              },
            ]}
          />

          <LinkSection
            icon={<GraduationCap className="w-5 h-5" />}
            title="Education"
            items={[
              {
                main: true,
                title: "Master of Computer Science",
                subtitle: "Tech University • 2018 - 2020",
                content: "Machine Learning Specialization",
              },
              {
                main: false,
                title: "Bachelor of Software Engineering",
                subtitle: "State University • 2014 - 2018",
                content: "First Class Honors",
              },
            ]}
          />

          <LinkSection
            icon={<Trophy className="w-5 h-5" />}
            title="Certifications"
            items={[
              {
                main: true,
                title: "AWS Certified Solutions Architect",
                subtitle: "Amazon Web Services • 2023",
              },
              {
                main: false,
                title: "Google Cloud Professional Developer",
                subtitle: "Google • 2022",
              },
            ]}
          />

          <LinkSection
            icon={<Globe className="w-5 h-5" />}
            title="Connect"
            items={[
              {
                main: true,
                title: "GitHub",
                link: "https://github.com",
              },
              {
                main: false,
                title: "LinkedIn",
                link: "https://linkedin.com",
              },
              {
                main: false,
                title: "Email",
                link: "mailto:contact@example.com",
              },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
