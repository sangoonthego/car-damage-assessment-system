const API_BASE_URL = import.meta.env.VITE_BASE_URL; 

export const runAssessment = async (file, mode) => {
  if (!file || (mode !== "detect" && mode !== "segment")) {
    throw new Error("Invalid file or mode provided.");
  }

  const formData = new FormData();
  formData.append("car_image", file);

  const url = `${API_BASE_URL}/${mode}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Server responded with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};