from agents.search_agent import search_agent
from agents.search_chat_agent import search_chat_agent


def router_agent(question):

    research_words = [
        "report",
        "research",
        "analysis",
        "study",
        "detailed"
    ]

    if any(word in question.lower() for word in research_words):

        search_result = search_agent(question)

        return {
            "agent": "research_agent",
            "answer": search_result["report"],
            "pdf_file": search_result["pdf_file"],
            "workflow": [
                "🧠 Router Agent",
                "🔍 Search Agent",
                "📊 Analysis Agent",
                "✍ Writer Agent",
                "📄 PDF Agent"
            ]
        }

    else:

        answer = search_chat_agent(question)

        return {
            "agent": "search_chat_agent",
            "answer": answer,
            "workflow": [
                "🧠 Router Agent",
                "🌐 Search Chat Agent"
            ]
        }