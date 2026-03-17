import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {z} from 'zod';

// This is a dummy model for demo purposes.
const localLLM = async (request: any) => {
  console.log('Local LLM Request:', JSON.stringify(request, null, 2));

  let responseText =
    "I am a demo AI assistant. I can help you with questions about Dinner O'Clock.";
  let output: any = {
    response: responseText,
  };

  const lastMessage = request.messages[request.messages.length - 1];
  const userQuery = lastMessage.content[0].text.toLowerCase();

  if (userQuery.includes('recommend')) {
     output = { recommendedItems: ['Spaghetti Carbonara', 'Beef Burger'] };
  } else if (userQuery.includes('translate')) {
     output = { translatedName: "Vertaalde naam", translatedDescription: "Vertaalde omschrijving" };
  } else if (userQuery.includes('menu')) {
    output = { response: "Our menu features Breakfast, Lunch, and Dinner. Some popular items include Avocado Toast, Chicken Caesar Salad, and Salmon Teriyaki." };
  } else if (userQuery.includes('plan')) {
    output = { response: "We offer Prepaid and Postpaid plans, including Weekly Solo, Monthly Duo, and Family Feast. Which one are you interested in?" };
  }


  return {
    candidates: [
      {
        message: {
          role: 'model',
          content: [{text: JSON.stringify(output)}],
        },
        finishReason: 'stop',
      },
    ],
  };
};

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
  // Uncomment the following line to use the local dummy model for testing
  // customModel: { model: 'local/dummy-llm', fn: localLLM },
});
