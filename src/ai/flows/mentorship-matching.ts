'use server';

/**
 * @fileOverview An AI agent for matching students with alumni mentors.
 *
 * - mentorshipMatching - A function that matches a student with alumni mentors.
 * - MentorshipMatchingInput - The input type for the mentorshipMatching function.
 * - MentorshipMatchingOutput - The return type for the mentorshipMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MentorshipMatchingInputSchema = z.object({
  studentInterests: z
    .string()
    .describe('The interests of the student seeking a mentor.'),
  studentCareerGoals: z
    .string()
    .describe('The career goals of the student seeking a mentor.'),
  alumniProfiles: z
    .string()
    .describe(
      'A list of alumni profiles, including their interests and career paths.'
    ),
});
export type MentorshipMatchingInput = z.infer<typeof MentorshipMatchingInputSchema>;

const MentorshipMatchingOutputSchema = z.object({
  matchedMentors: z
    .string()
    .describe(
      'A list of alumni mentors who are well-suited to mentor the student, with a short explanation of why they are a good match.'
    ),
});
export type MentorshipMatchingOutput = z.infer<typeof MentorshipMatchingOutputSchema>;

export async function mentorshipMatching(
  input: MentorshipMatchingInput
): Promise<MentorshipMatchingOutput> {
  return mentorshipMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'mentorshipMatchingPrompt',
  input: {schema: MentorshipMatchingInputSchema},
  output: {schema: MentorshipMatchingOutputSchema},
  prompt: `You are an expert in mentorship matching, with a deep understanding of how to connect students with alumni who can provide valuable guidance and support.

  Given the following information about a student and a list of alumni profiles, identify the alumni who would be the best mentors for the student.

  Student Interests: {{{studentInterests}}}
  Student Career Goals: {{{studentCareerGoals}}}
  Alumni Profiles: {{{alumniProfiles}}}

  Provide a list of matched mentors with a short explanation of why each one is a good match for the student.`,
});

const mentorshipMatchingFlow = ai.defineFlow(
  {
    name: 'mentorshipMatchingFlow',
    inputSchema: MentorshipMatchingInputSchema,
    outputSchema: MentorshipMatchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
