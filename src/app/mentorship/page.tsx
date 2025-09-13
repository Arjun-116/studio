"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wand2, Loader2, User, BrainCircuit, Briefcase } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { getMentorMatches } from "./actions";

const formSchema = z.object({
  studentInterests: z
    .string()
    .min(10, { message: "Please describe your interests in at least 10 characters." })
    .max(500, { message: "Please keep your interests under 500 characters." }),
  studentCareerGoals: z
    .string()
    .min(10, { message: "Please describe your career goals in at least 10 characters." })
    .max(500, { message: "Please keep your career goals under 500 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

type MatchResult = {
  matchedMentors: string;
};

export default function MentorshipPage() {
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentInterests: "",
      studentCareerGoals: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setMatchResult(null);

    const result = await getMentorMatches(values);

    if (result.success && result.data) {
      setMatchResult(result.data);
      toast({
        title: "Success!",
        description: "We've found some potential mentors for you.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.error || "There was a problem with your request.",
      });
    }

    setIsLoading(false);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
          Mentorship Matching
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Our AI tool will connect you with alumni mentors based on your shared
          interests and career goals.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Find Your Mentor</CardTitle>
            <CardDescription>
              Tell us about yourself, and we'll find the best match from our alumni network.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="studentInterests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><BrainCircuit className="w-4 h-4"/> Your Interests</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'Software development, artificial intelligence, sustainable tech, and public speaking.'"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        What are your hobbies, passions, and academic interests?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studentCareerGoals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> Your Career Goals</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., 'Become a product manager at a tech company, start my own non-profit, or pursue a PhD in biotech.'"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Where do you see yourself professionally in 5-10 years?
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  Find Matches
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight font-headline">Your Mentor Matches</h2>
          {isLoading && (
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4 h-96">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-lg font-semibold">Finding your perfect match...</p>
                <p className="text-muted-foreground">Our AI is analyzing profiles. This may take a moment.</p>
              </CardContent>
            </Card>
          )}

          {matchResult && (
            <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><User className="w-5 h-5" /> Matched Mentors</CardTitle>
                </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p>{matchResult.matchedMentors}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {!isLoading && !matchResult && (
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-4 h-96">
                <Wand2 className="h-12 w-12 text-muted-foreground" />
                <p className="text-lg font-semibold">Your results will appear here</p>
                <p className="text-muted-foreground">Fill out the form to get started.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
