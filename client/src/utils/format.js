export const formatJson = (jsonObject) => {
  try {
    const dataToDisplay = jsonObject.data;
    return JSON.stringify(dataToDisplay, null, 2);
  } catch (error) {
    console.error("Error formatting JSON:", error);
    return JSON.stringify(jsonObject, null, 2); 
  }
};