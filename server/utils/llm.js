const fs = require("fs");
const pdfParse = require("pdf-parse");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const API_KEY = process.env.GOOGLE_API_KEY;

const generateContent = async (input) => {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const response = await model.generateContent([input]);
  const responseText = response.response.text();
  return JSON.parse(responseText);
};

// PDF Parsing function
const inputPdfText = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text;
};

module.exports.evaluate = async (jd, filePath) => {
  const resumePath = filePath; // Path to the uploaded resume
  const resumeText = await inputPdfText(resumePath); // Extract text from the resume PDF

  // Constructing the input prompt for the AI
  const inputPrompt = `
      Hey Act Like a skilled or very experienced ATS(Application Tracking System). 
      Your task is to evaluate the resume based on the given job description.
      You must consider the job market is very competitive and you should provide
      best assistance for improving the resumes. Assign the percentage Matching based 
      on Jd and the missing keywords with high accuracy.
      Be accurate about the JD match percentage and missing keywords.
      candidate's resume: ${resumeText}
      job description: ${jd}

      I want the response in one single string having the structure
      {"JD Match":"%","MissingKeywords":[],"Profile Summary":""}
    `;

  // Get the response from Google AI
  const responseText = await generateContent(inputPrompt);
  return responseText;
};
