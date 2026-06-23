from agents.pdf_agent import pdf_agent
from groq import Groq
from dotenv import load_dotenv
from agents.web_search_agent import web_search
from agents.analysis_agent import analysis_agent
from agents.writer_agent import writer_agent
import os

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def search_agent(question):

    # Step 1: Search
    search_results = web_search(question)

    context = "\n\n".join(
        [result["content"] for result in search_results]
    )

    prompt = f"""
Use the following search results to answer accurately.

Search Results:
{context}

Question:
{question}

Answer:
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    search_answer = response.choices[0].message.content

    # Step 2: Analysis
    analysis = analysis_agent(search_answer)

    # Step 3: Professional report
    final_report = writer_agent(analysis)

    # Step 4: Generate PDF
    pdf_path = pdf_agent(final_report)

    return {
        "answer": search_answer,
        "report": final_report,
        "pdf_file": pdf_path
    }