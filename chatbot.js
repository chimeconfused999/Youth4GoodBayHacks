import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: mySecret,
});
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const GPT4Message = [
        {
          role: "system",
          content: `Use the Data from ${data} to tell the user about event information. Respond in brief sentences that contain enough information.`,
        },
        {
          role: "user",
          content: document.getElementById("chatbox"),
        }
      ];
    
      let GPT4 = async (message) => {
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: message,
        });
    
        return response.choices[0].message.content;
      };
    
      const allcode = (GPT4(GPT4Message)) || "";
    
    
  
  })
  .catch(error => {
    console.error('Error fetching or parsing JSON:', error);
});