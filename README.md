# 🤖 Multi-Agent AI Research Assistant

An intelligent multi-agent AI assistant that can answer questions, chat with uploaded PDFs, search the web for current information, and remember previous conversations.
Built using FastAPI, Next.js, Groq LLM, ChromaDB, and Hugging Face Embeddings.

## 🚀 Features

- 💬 AI Chat Assistant
- 📄 Chat with PDF (RAG)
- 🌐 Live Web Search
- 🧠 Conversation Memory
- 🤖 Multi-Agent Architecture
- 📊 Agent Workflow Visualization
- ⚡ Groq Llama 3.3 70B Integration
- 🔍 ChromaDB Vector Database
- 📱 Responsive Next.js Frontend

## 🏗️ Project Architecture
User
   │
   ▼
Next.js Frontend
   │
   ▼
FastAPI Backend
   │
   ├── Router Agent
   ├── Search Chat Agent
   ├── PDF Agent
   ├── Memory Agent
   ├── Web Search Agent
   └── Writer Agent
   │
   ▼
Groq + ChromaDB + Tavily + HuggingFace


## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- FastAPI
- Python
- Groq API
- ChromaDB
- Sentence Transformers
- Hugging Face Embeddings
- Tavily Search

## 📂 Project Structure
multi-agent-research-assistant
│
├── backend
│   ├── agents
│   ├── uploads
│   ├── vectorstore
│   ├── memory_store
│   ├── main.py
│   └── requirements.txt
│
├── frontend
│   ├── app
│   ├── components
│   ├── context
│   └── services
│
└── README.md

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/sanvi06061/multi-agent-research-assistant.git
```

```
cd multi-agent-research-assistant
```

### Backend

```
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt
```

Create a `.env` file:

```
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
```

Run the backend:
uvicorn main:app --reload


### Frontend

```
cd frontend

npm install

npm run dev
```

Open

```
http://localhost:3000
```


## 🧠 Multi-Agent Workflow

1. User asks a question.
2. Router Agent selects the correct workflow.
3. Memory Agent retrieves previous conversations.
4. Search Chat Agent answers general questions.
5. PDF Agent retrieves information from uploaded PDFs.
6. Web Search Agent searches the internet when required.
7. Writer Agent generates the final response.

## 📸 Screenshots

### Home
<img width="1920" height="1140" alt="home" src="https://github.com/user-attachments/assets/e383a242-4e46-4b6d-a481-fda7e90b366e" />

### Chat
<img width="1920" height="1140" alt="chat" src="https://github.com/user-attachments/assets/5ad06631-f4c6-426d-a7e1-c4d7d20724a5" />

### Agent Workflow
<img width="1920" height="1140" alt="agentworkflow" src="https://github.com/user-attachments/assets/a6d8550c-b158-4569-bbd4-59553e83289a" />


## 🔮 Future Improvements

- User Authentication
- AWS Deployment
- Docker Support
- Multiple PDF Upload
- Streaming Responses
- Voice Assistant
- Image Understanding
- Multi-language Support

## 👩‍💻 Author

**Sanvi Rai**

Information Science & Engineering Student

GitHub:
https://github.com/sanvi06061

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
