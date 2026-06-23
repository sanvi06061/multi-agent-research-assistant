from agents.rag_agent import retrieve

results = retrieve("What are the benefits of AI?")

print("Retrieved Chunks:\n")

for chunk in results:
    print(chunk)
    print("\n" + "="*80 + "\n")