from agents.rag_agent import load_pdf

chunks = load_pdf("reports/report.pdf")

print("First Chunk:")
print(chunks[0])

print("\nTotal Chunks:", len(chunks))