// public/script.js
async function submitQuestion() {
  const pdfFile = document.getElementById("pdfFile").files[0];
  const question = document.getElementById("question").value;

  if (!pdfFile || !question) {
    alert("Please upload a PDF file and enter a question.");
    return;
  }

  const formData = new FormData();
  formData.append("file", pdfFile);
  formData.append("question", question);

  try {
    const response = await fetch(
      "https://vercel.com/bradybloughs-projects/gptpdf/Gw2kjLYw8MiV2HfeNcyc5wdFA1yu",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      document.getElementById("answer").innerText = `Answer: ${data.answer}`;
    } else {
      alert("Failed to get answer from server.");
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred. Please try again.");
  }
}
