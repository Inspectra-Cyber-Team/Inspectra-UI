'use client'
import React, { useRef, useState } from 'react'
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
import { useUploadFileMutation } from '@/redux/service/faqs';
import { CgAttachment } from 'react-icons/cg';

const MODEL_NAME = "gemini-1.5-flash-8b"  //"gemini-1.0-pro";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;


export default function FileUpload() {
    
    const generateImageText = async (image: File, retryCount: number = 0) => {
      const maxRetries = 10; // Max retries to avoid infinite loops
      const delay = 2000; // Delay in milliseconds between retries (2 seconds)
  
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
      const generationConfig:any = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      };
  
      const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ];
  
      const reader = new FileReader();
  
      reader.onloadend = async () => {
        const base64String = reader.result as string;
  
        const request = {
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: "Write code like this images", // Your prompt
                },
                {
                  inlineData: {
                    mimeType: image.type, 
                    data: base64String.split(",")[1], 
                  },
                },
              ],
            },
          ],
        };
  
        try {
          
          const result = await model.generateContent(request, {
            // @ts-ignore
            generationConfig,
            safetySettings,
          });
  
          const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

          if (responseText) {
            setExtractedText(responseText);
          }
  
        } catch (error:any) {
          if (retryCount < maxRetries) {

            setTimeout(() => generateImageText(image, retryCount + 1), delay);

          } 
        }
      };
  
      if (image) {
        reader.readAsDataURL(image);
      }
    };
    
    
       const [uploadSingleFile] = useUploadFileMutation();
    
      const handleFileSingleUpload = async (file: any) => {
        const formData = new FormData();
    
        formData.append("file", file);
    
        try {
          const response = await uploadSingleFile({ file: formData }).unwrap();
    
          // Check the response structure to ensure `fullUrl` exists
          if (response?.data?.fullUrl) {
            return response.data.fullUrl; // Return the full URL
          }
        } catch {
          return ""; // Return an empty string if an error occurs
        }
      };
    
    
    
       const [extractedText, setExtractedText] = useState("");
    
       const fileInputRef = useRef<HTMLInputElement>(null);
    
       const [image, setImage] = useState<string>("");
    
    
      // file upload in this 
       const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
             
              const fileUrl = await handleFileSingleUpload(file);
              setImage(fileUrl);
    
              if (fileUrl) {
                generateImageText(file); // Call the function to extract text
              }

            }
          };
      
          // Trigger file input click on icon click
      const handleClick = () => {
        fileInputRef.current?.click();
      };

  return (
    <section className='w-[88%] mx-auto flex flex-col h-screen'>
        {/* <input type="file" onChange={handleImageChange} /> */}
      {extractedText && <p>Extracted Text: {extractedText}</p>}

      <CgAttachment onClick={handleClick} className=" w-5 h-5 cursor-pointer "/>
                {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleImageChange} // Handle file selection
        className="hidden" // Hide the input element
      />

      {image && <img src={image} alt="Uploaded Image" className="w-1/2 h-1/2" />}
  
    </section>
  )
}
