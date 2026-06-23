const API_URL = "http://127.0.0.1:8000";

export async function uploadPDF(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  return response.json();
}

export async function askQuestion(question: string) {

  const response = await fetch(
    `${API_URL}/ask?question=${encodeURIComponent(question)}`
  );

  console.log("Status:", response.status);

  const data = await response.json();

  console.log("Data:", data);

  return data;
}