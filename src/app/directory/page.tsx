import Image from "next/image";
import Link from "next/link";
import { Search, Filter, MapPin, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { alumni } from "@/lib/placeholder-data";
import { placeHolderImages } from "@/lib/placeholder-images";

export default function DirectoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
          Alumni Directory
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse and search the alumni network.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search by name or company..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Major" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cs">Computer Science</SelectItem>
            <SelectItem value="ba">Business Administration</SelectItem>
            <SelectItem value="be">Bioengineering</SelectItem>
            <SelectItem value="fa">Fine Arts</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2020">2020</SelectItem>
            <SelectItem value="2018">2018</SelectItem>
            <SelectItem value="2015">2015</SelectItem>
            <SelectItem value="2012">2012</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {alumni.map((person) => {
          const image = placeHolderImages.find(
            (img) => img.id === person.imageId
          );
          return (
            <Card key={person.id} className="flex flex-col">
              <CardHeader className="items-center text-center">
                <Avatar className="h-24 w-24 mb-2">
                  {image && <AvatarImage src={image.imageUrl} alt={person.name} />}
                  <AvatarFallback>{person.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold font-headline">{person.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Class of {person.graduationYear}
                </p>
              </CardHeader>
              <CardContent className="flex-1 space-y-2">
                 <div className="flex items-start text-sm text-muted-foreground">
                   <Briefcase className="h-4 w-4 mr-2 mt-0.5 shrink-0" />
                   <span>{person.jobTitle} at <strong>{person.company}</strong></span>
                 </div>
                 <div className="flex items-center text-sm text-muted-foreground">
                   <MapPin className="h-4 w-4 mr-2 shrink-0" />
                   <span>{person.location}</span>
                 </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/profile">View Profile</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
