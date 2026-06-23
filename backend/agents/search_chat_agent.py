from groq import Groq
from dotenv import load_dotenv
from agents.web_search_agent import web_search
from agents.memory_agent import store_memory, retrieve_memory
import os

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def search_chat_agent(question):

    # Retrieve memory
    history = retrieve_memory(question)

    # Use memory only for follow-up questions
    followup_words = [
        "what about",
        "and",
        "then",
        "also",
        "its",
        "their",
        "that",
        "those",
        "they",
        "he",
        "she"
    ]

    use_memory = any(
        question.lower().startswith(word)
        for word in followup_words
    )

    if not use_memory:
        history = ""

    # Fresh information keywords
    search_keywords = [
        "latest",
        "today",
        "news",
        "current",
        "weather",
        "stock",
        "price",
        "score",
        "ipl",
        "live"
    ]

    use_search = any(
        word in question.lower()
        for word in search_keywords
    )

    context = ""

    if use_search:

        search_results = web_search(question)

        context = "\n\n".join(
            [result["content"] for result in search_results]
        )

    prompt = f"""
You are a helpful AI assistant.

Previous Conversation:
{history}

Web Search Results:
{context}

Current Question:
{question}

Instructions:

- Use previous conversation ONLY if it is relevant.
- Ignore previous conversation for unrelated questions.
- Answer briefly and conversationally.
- If web search results are empty, use your own knowledge.

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

    answer = response.choices[0].message.content

    store_memory(question, answer)

    return answer