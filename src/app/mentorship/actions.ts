"use server";

import { z } from "zod";
import { mentorshipMatching } from "@/ai/flows/mentorship-matching";
import type { MentorshipMatchingOutput } from "@/ai/flows/mentorship-matching";
import { alumni } from "@/lib/placeholder-data";

const formSchema = z.object({
  studentInterests: z.string(),
  studentCareerGoals: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export async function getMentorMatches(
  values: FormValues
): Promise<{ success: boolean; data?: MentorshipMatchingOutput; error?: string }> {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid input.",
    };
  }

  const { studentInterests, studentCareerGoals } = validatedFields.data;

  // Convert alumni data to a string format for the AI prompt
  const alumniProfiles = alumni
    .map(
      (p) =>
        `Name: ${p.name}, Job: ${p.jobTitle} at ${p.company}, Interests: ${p.interests}, Career Path: ${p.careerPath}`
    )
    .join("\n---\n");

  try {
    const result = await mentorshipMatching({
      studentInterests,
      studentCareerGoals,
      alumniProfiles,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error("Error in mentorship matching AI flow:", error);
    return {
      success: false,
      error: "Failed to get mentor matches from AI. Please try again later.",
    };
  }
}
