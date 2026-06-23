import chromadb
from sentence_transformers import SentenceTransformer

# Embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Persistent database
client = chromadb.PersistentClient(path="./memory_store")

collection = client.get_or_create_collection(
    name="chat_memory"
)


def store_memory(question, answer):

    text = f"User: {question}\nAssistant: {answer}"

    embedding = model.encode(text).tolist()

    collection.add(
        documents=[text],
        embeddings=[embedding],
        ids=[str(collection.count())]
    )


def retrieve_memory(question):

    if collection.count() == 0:
        return ""

    query_embedding = model.encode(question).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=3
    )

    memories = results["documents"][0]

    return "\n\n".join(memories)