// src/ai/flows/ai-auto-translate.ts
'use server';

/**
 * @fileOverview Automatically translates new menu items into a target language.
 *
 * - autoTranslate - A function that translates a menu item's name and description.
 * - AutoTranslateInput - The input type for the autoTranslate function.
 * - AutoTranslateOutput - The return type for the autoTranslate function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutoTranslateInputSchema = z.object({
  name: z.string().describe('The name of the menu item to translate.'),
  description: z.string().describe('The description of the menu item to translate.'),
  targetLanguage: z.string().describe('The target language code (e.g., \'nl\' for Dutch).'),
});
export type AutoTranslateInput = z.infer<typeof AutoTranslateInputSchema>;

const AutoTranslateOutputSchema = z.object({
  translatedName: z.string().describe('The translated name of the menu item.'),
  translatedDescription: z.string().describe('The translated description of the menu item.'),
});
export type AutoTranslateOutput = z.infer<typeof AutoTranslateOutputSchema>;

export async function autoTranslate(input: AutoTranslateInput): Promise<AutoTranslateOutput> {
  return autoTranslateFlow(input);
}

const translatePrompt = ai.definePrompt({
  name: 'translatePrompt',
  input: {schema: AutoTranslateInputSchema},
  output: {schema: AutoTranslateOutputSchema},
  prompt: `You are a professional translator. Translate the following menu item name and description into {{targetLanguage}}.

Menu Item Name: {{name}}
Menu Item Description: {{description}}

Ensure the translated content is accurate and appealing to native speakers of the target language.

Output the translated name and description in the specified JSON format.`,
});

const autoTranslateFlow = ai.defineFlow(
  {
    name: 'autoTranslateFlow',
    inputSchema: AutoTranslateInputSchema,
    outputSchema: AutoTranslateOutputSchema,
  },
  async input => {
    const {output} = await translatePrompt(input);
    return output!;
  }
);
