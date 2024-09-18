// chatbot.js
import OpenAI from "openai";
import fetch from "node-fetch"; // Install with: npm install node-fetch

// Define the chatbotMessage function and export it
export async function chatbotMessage(message,curchat) {
    if (!process.env.OPENAI_API_KEY) {
        console.error(`You haven't set up your API key yet.

        Then, open the Secrets Tool and add OPENAI_API_KEY as a secret.`);
        process.exit(1);
    }
    if(curchat != "general"){
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        try {
            // Fetch the data from the local JSON file
            const response = await fetch("data.json");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Parse the JSON data
            const data = await response.json();
            const pesponse = await fetch(curchat + ".txt")
            if(!pesponse.ok){
                throw new Error("Network response was not ok");
            }
            const pata = await pesponse.json();
            const formatterTime = new Intl.DateTimeFormat('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false, // Use 24-hour format
              });
            
              // Get the formatted date in MM/DD/YYYY format
              
              const formattedTime = formatterTime.format(now);
            // Create the message payload for GPT-4
            const GPT4Message = [
                {
                    role: "system",
                    content: `Here is all of the Event Calendar Data: ${JSON.stringify(data)}. Ignore this one if empty, but it contains information relative to the event chatroom you are in: ${JSON.stringify(pata)}. If you are prompted, the current time is ${JSON.stringify(formattedTime)}`,
                },
                {
                    role: "user",
                    content: message,
                },
            ];

            // Call GPT-4
            const GPT4Response = await openai.chat.completions.create({
                model: "gpt-4",
                messages: GPT4Message,
            });

            // Return GPT-4's response
            return GPT4Response.choices[0].message.content;
        } catch (error) {
            console.error("Error in fetching data or calling GPT-4:", error);
            return "There was an error processing your request.";
        }
    }
}
