import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { upcomingEvents } from "@/lib/placeholder-data";
import { placeHolderImages } from "@/lib/placeholder-images";

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
          Events Calendar
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse upcoming reunions, career fairs, and workshops.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {upcomingEvents.map((event) => {
          const image = placeHolderImages.find(
            (img) => img.id === event.imageId
          );
          return (
            <Card key={event.id} className="flex flex-col overflow-hidden">
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
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 text-muted-foreground mt-2">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {event.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">RSVP Now</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
