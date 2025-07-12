"use server";

export default async function AIcontent({text,customInstructions="",contentGen=false}){
   let basePrompt;
   
   if(contentGen){
    basePrompt=` You are a senior and experineced content writer, tou are asked to compose a elborated fact check content.\
    The content should be properly bulleted using numberss , headings.\
    The content topic is given as follows: ${text}
    Below are some custom instructions for the content: ${customInstructions} 
    `
   }else{
    basePrompt=`You are a senior content reviewer. Your task will be to go through with given content and reqwite in easy tounderstand language.\
    The contet you need to rephrase is as follows:${text}
    Some custom instructions are : ${customInstructions}
    `
   }
   
   try {
    const res=await fetch(`https://openrouter.ai/api/v1/chat/completions`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
           "Authorization":`Bearer ${process.env.OPENROUTER_API_KEY}`
        },
        body:JSON.stringify({
            model:"gpt-3.5-turbo-0613",
            messages:[{role:"user" , content:basePrompt}],
            max_tokens: contentGen ? 1700: 600
        })
    })
    if(!res.ok){
        throw new Error("Response not found");
    }
    const data=await res.json();
    const returnVal=data.choices[0].message.content;
    console.log(returnVal,"ai");
    return returnVal;
   } catch (error) {
    console.error(error.message)
   }
   
}