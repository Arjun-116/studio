import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { recentNews } from "@/lib/placeholder-data";
import { placeHolderImages } from "@/lib/placeholder-images";

export default function NewsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
          News Feed
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Updates and announcements from the institution and fellow alumni.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {recentNews.map((item) => {
          const image = placeHolderImages.find(
            (img) => img.id === item.imageId
          );
          return (
            <Card key={item.id} className="flex flex-col overflow-hidden">
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
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-4">
                  {item.excerpt}
                </p>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div className="flex w-full justify-between items-center">
                    <Badge variant="secondary">{item.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                        {item.date}
                    </span>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href="#">Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
