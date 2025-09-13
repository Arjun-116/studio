import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  Newspaper,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { upcomingEvents, recentNews } from "@/lib/placeholder-data";
import { placeHolderImages } from "@/lib/placeholder-images";

export default function Dashboard() {
  const eventImage = placeHolderImages.find((img) => img.id === "event1");
  const newsImage1 = placeHolderImages.find((img) => img.id === "news1");
  const newsImage2 = placeHolderImages.find((img) => img.id === "news2");

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
          Welcome to Nexus Alumni
        </h1>
        <p className="text-lg text-muted-foreground">
          Your portal to connect, engage, and grow with your fellow alumni.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Don't miss out on these opportunities to connect.
              </CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/events">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="grid gap-6">
            {upcomingEvents.slice(0, 2).map((event) => (
              <div key={event.id} className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <Calendar className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
                <Button asChild variant="outline" size="sm" className="ml-auto">
                  <Link href="/events">RSVP</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mentorship Program</CardTitle>
            <CardDescription>
              Connect with students and give back to the community.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Use our AI-powered tool to find the perfect mentee based on
              shared interests and career goals.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/mentorship">
                Find a Mentee <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold tracking-tight font-headline">Recent News</h2>
          <Button asChild variant="ghost" size="sm">
            <Link href="/news">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {recentNews.slice(0, 2).map((item, index) => {
            const image = index === 0 ? newsImage1 : newsImage2;
            return (
              <Card key={item.id} className="overflow-hidden">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    data-ai-hint={image.imageHint}
                  />
                )}
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {item.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Badge variant="secondary">{item.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {item.date}
                  </span>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  );
}
