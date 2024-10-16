import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GithubIcon, Globe, Mail, MessageCircle } from "lucide-react"

export default function ContactUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <ContactCard
          icon={<Globe className="h-6 w-6" />}
          title="Website"
          description="Visit our website"
          link="https://randomwalk.ai/"
        />
        <ContactCard
          icon={<GithubIcon className="h-6 w-6" />}
          title="GitHub"
          description="Check out our repositories"
          link="https://github.com/RandomwalkDev/noise-map-fe"
        />
        <ContactCard
          icon={<Mail className="h-6 w-6" />}
          title="Email"
          description="Send us an email"
          link="cohort@randomwalk.ai"
        />
        <ContactCard
          icon={<MessageCircle className="h-6 w-6" />}
          title="Discord"
          description="Join our community"
          link="Comming soon..."
        />
      </div>
    </div>
  )
}

function ContactCard({ icon, title, description, link }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        {icon}
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {link}
        </a>
      </CardContent>
    </Card>
  )
}