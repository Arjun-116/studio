import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Briefcase,
  GraduationCap,
  Mail,
  Phone,
  Linkedin,
  Pencil,
} from "lucide-react";
import { placeHolderImages } from "@/lib/placeholder-images";

const currentUser = {
  name: "Sarah Adams",
  title: "Product Manager at TechSolutions",
  location: "San Francisco, CA",
  avatarId: "currentUser",
  bannerId: "profileBanner",
  email: "sarah.adams@example.com",
  phone: "(123) 456-7890",
  linkedin: "linkedin.com/in/sarahadams",
  about:
    "Driven and creative Product Manager with over 8 years of experience in the tech industry. Passionate about building user-centric products that solve real-world problems. Skilled in agile methodologies, market research, and cross-functional team leadership. Always open to connecting with fellow alumni and mentoring students.",
  employment: [
    {
      role: "Product Manager",
      company: "TechSolutions",
      period: "2020 - Present",
    },
    {
      role: "Associate Product Manager",
      company: "Innovate Inc.",
      period: "2018 - 2020",
    },
    {
      role: "Business Analyst",
      company: "DataCorp",
      period: "2016 - 2018",
    },
  ],
  education: {
    degree: "B.S. in Business Administration",
    university: "Nexus University",
    period: "2012 - 2016",
    honors: "Magna Cum Laude, Dean's List",
  },
};

export default function ProfilePage() {
  const avatarImage = placeHolderImages.find(
    (img) => img.id === currentUser.avatarId
  );
  const bannerImage = placeHolderImages.find(
    (img) => img.id === currentUser.bannerId
  );

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden">
        <div className="relative">
          {bannerImage && (
            <Image
              src={bannerImage.imageUrl}
              alt="Profile banner"
              width={1200}
              height={300}
              className="w-full h-48 object-cover"
              data-ai-hint={bannerImage.imageHint}
            />
          )}
          <div className="absolute bottom-0 left-6 translate-y-1/2">
            <Avatar className="h-32 w-32 border-4 border-card">
              {avatarImage && (
                <AvatarImage
                  src={avatarImage.imageUrl}
                  alt={currentUser.name}
                />
              )}
              <AvatarFallback className="text-4xl">
                {currentUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          <Button variant="outline" size="icon" className="absolute top-4 right-4 bg-card/70">
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
        <div className="pt-20 p-6">
          <h1 className="text-3xl font-bold font-headline">{currentUser.name}</h1>
          <p className="text-muted-foreground">{currentUser.title}</p>
          <p className="text-sm text-muted-foreground">{currentUser.location}</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{currentUser.about}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Employment History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentUser.employment.map((job, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                    <Briefcase className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">{job.role}</p>
                    <p className="text-muted-foreground">{job.company}</p>
                    <p className="text-sm text-muted-foreground">{job.period}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{currentUser.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{currentUser.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{currentUser.linkedin}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <GraduationCap className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div>
                  <p className="font-semibold">{currentUser.education.degree}</p>
                  <p className="text-muted-foreground">
                    {currentUser.education.university}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentUser.education.period}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
