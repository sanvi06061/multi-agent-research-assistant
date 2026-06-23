from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

groq_client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)
from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
import chromadb

# Embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# ChromaDB
client = chromadb.PersistentClient(path="./vectorstore")

collection = client.get_or_create_collection(
    name="documents"
)


def load_pdf(pdf_path):

    reader = PdfReader(pdf_path)

    text = ""

    for page in reader.pages:
        page_text = page.extract_text()

        if page_text:
            text += page_text

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )

    chunks = splitter.split_text(text)

    return chunks


def ingest_pdf(pdf_path):

    chunks = load_pdf(pdf_path)

    embeddings = model.encode(chunks)

    for i, chunk in enumerate(chunks):

        collection.add(
            documents=[chunk],
            embeddings=[embeddings[i].tolist()],
            ids=[str(i)]
        )
    print("PDF stored successfully!")

def retrieve(query):

    query_embedding = model.encode(query).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=3
    )

    return results["documents"][0]

def rag_answer(question):

    docs = retrieve(question)

    context = "\n\n".join(docs)

    prompt = f"""
You are a document assistant.

Use ONLY the information present in the context below.

If the answer is not found in the context, reply exactly:

"I could not find this information in the uploaded document."

Do not use your own knowledge.
Do not make assumptions.
Do not hallucinate.

Context:
{context}

Question:
{question}

Answer:
"""

    response = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    answer = response.choices[0].message.content

    return {
        "answer": answer,
        "sources": docs
    }