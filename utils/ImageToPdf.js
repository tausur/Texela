import jsPDF from "jspdf";

// Convert images to PDF and return a Blob (instead of downloading)
export async function convertImagesToPdf(files) {
  if (!files || files.length === 0) return null;

  const pdf = new jsPDF("p", "mm", "a4");

  for (let i = 0; i < files.length; i++) {
    const imgData = await readFileAsDataURL(files[i]);

    if (i > 0) pdf.addPage();

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const img = new Image();
    img.src = imgData;
    await new Promise((res) => (img.onload = res));

    const imgWidth = img.width;
    const imgHeight = img.height;

    // Scale image to fit A4 while keeping aspect ratio
    let width = pdfWidth - 20; // 10mm margin each side
    let height = (imgHeight * width) / imgWidth;

    if (height > pdfHeight - 20) {
      height = pdfHeight - 20;
      width = (imgWidth * height) / imgHeight;
    }

    const x = (pdfWidth - width) / 2;
    const y = (pdfHeight - height) / 2;

    pdf.addImage(imgData, "JPEG", x, y, width, height);
  }

  // Return PDF as Blob
  const pdfBlob = pdf.output("blob");
  return pdfBlob;
}

// Helper to read file as Data URL
const readFileAsDataURL = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });