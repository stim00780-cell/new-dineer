'use server';

/**
 * @fileOverview This file implements an AI-powered recommendation flow that suggests similar items
 * based on a user's previous orders.
 *
 * @exports aiRecommendations - The main function to trigger the recommendation flow.
 * @exports AIRecommendationsInput - The input type for the aiRecommendations function.
 * @exports AIRecommendationsOutput - The output type for the aiRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIRecommendationsInputSchema = z.object({
  previousOrders: z.array(
    z.string().describe('Names of previously ordered dishes')
  ).describe('List of previously ordered dishes for the user.'),
  menuItems: z.array(
    z.string().describe('Names of available dishes')
  ).describe('List of available dishes in the menu.'),
});
export type AIRecommendationsInput = z.infer<typeof AIRecommendationsInputSchema>;

const AIRecommendationsOutputSchema = z.object({
  recommendedItems: z.array(
    z.string().describe('Recommended dishes based on previous orders')
  ).describe('List of recommended dishes based on the user profile.'),
});
export type AIRecommendationsOutput = z.infer<typeof AIRecommendationsOutputSchema>;

export async function aiRecommendations(input: AIRecommendationsInput): Promise<AIRecommendationsOutput> {
  return aiRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiRecommendationsPrompt',
  input: {schema: AIRecommendationsInputSchema},
  output: {schema: AIRecommendationsOutputSchema},
  prompt: `You are a food recommendation expert. Based on the user's previous orders, suggest other items from the menu that they might enjoy.

Previous Orders: {{#each previousOrders}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
Available Menu Items: {{#each menuItems}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Recommend items that are similar in ingredients, cuisine, or dietary restrictions to the previous orders. Only recommend items present in the available menu items list.

Output ONLY the recommended items in a JSON array.
`, // Ensure only JSON array is returned
});

const aiRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiRecommendationsFlow',
    inputSchema: AIRecommendationsInputSchema,
    outputSchema: AIRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
