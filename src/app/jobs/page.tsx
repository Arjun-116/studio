import Image from "next/image";
import { Search, MapPin, Briefcase, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { jobBoard } from "@/lib/placeholder-data";
import { placeHolderImages } from "@/lib/placeholder-images";

export default function JobsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
          Job Board
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find your next career opportunity within the alumni network.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search by title, company, or keyword..." className="pl-10" />
        </div>
        <Button>Search</Button>
        <Button variant="secondary">Post a Job</Button>
      </div>

      <div className="space-y-6">
        {jobBoard.map((job) => {
          const image = placeHolderImages.find((img) => img.id === job.imageId);
          return (
            <Card key={job.id} className="transition-shadow hover:shadow-md">
                <div className="flex flex-col md:flex-row">
                    <div className="p-6 flex-1">
                        <div className="flex items-start gap-4">
                            {image && (
                                <Image
                                src={image.imageUrl}
                                alt={job.company}
                                width={56}
                                height={56}
                                className="rounded-lg border hidden sm:block"
                                data-ai-hint="company logo"
                                />
                            )}
                            <div className="flex-1">
                                <CardTitle className="text-xl">{job.title}</CardTitle>
                                <CardDescription className="text-base">{job.company}</CardDescription>
                                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin className="h-4 w-4" />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Briefcase className="h-4 w-4" />
                                        <span>{job.type}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="h-4 w-4" />
                                        <span>{job.datePosted}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-6 flex items-center border-t md:border-t-0 md:border-l">
                         <Button className="w-full md:w-auto">Apply Now</Button>
                    </div>
                </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
