from agents.router_agent import router_agent
from agents.rag_agent import rag_answer
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from agents.search_agent import search_agent
from agents.rag_agent import ingest_pdf
import shutil

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Multi-Agent Research Assistant Backend Running!"
    }

@app.get("/chat")
def chat(question: str):
    answer = search_agent(question)

    return {
        "question": question,
        "answer": answer
    }
@app.get("/download")
def download_pdf():
    return FileResponse(
    "reports/report.pdf",
    media_type="application/pdf",
    filename="report.pdf"
)

@app.post("/upload")
def upload_pdf(file: UploadFile = File(...)):

    file_path = f"uploads/{file.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    ingest_pdf(file_path)

    return {
        "message": "PDF uploaded and stored successfully!"
    }
@app.get("/ask")
def ask(question: str):

    result = router_agent(question)

    return result