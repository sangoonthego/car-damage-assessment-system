// const API_BASE_URL = import.meta.env.VITE_BASE_URL; 

// export const runAssessment = async (file, mode) => {
//   if (!file || (mode !== "detect" && mode !== "segment")) {
//     throw new Error("Invalid file or mode provided.");
//   }

//   const formData = new FormData();
//   formData.append("car_image", file);

//   const url = `${API_BASE_URL}/${mode}`;

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error || `Server responded with status ${response.status}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("API Error:", error);
//     throw error;
//   }
// };

const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_BASE_URL) || 'http://localhost:3636';

export const runAssessment = async (
  file: File,
  mode: 'detect' | 'segment'
): Promise<AssessmentResult> => {
  if (!file || (mode !== "detect" && mode !== "segment")) {
    throw new Error("Invalid file or mode provided.");
  }

  const formData = new FormData();
  formData.append("car_image", file);

  const url = `${API_BASE_URL}/api/ai/${mode}`;

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

export interface AssessmentResult {
  type: 'detect' | 'segment';
  imagePath: string;
  predictions: any[];
  [key: string]: any;
}