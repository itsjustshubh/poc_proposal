// src/api.ts

export const analyzeDocuments = async (rfpFile: File, proposalFile: File): Promise<{
  eligibility_criteria: any; result: any 
}> => {
  const formData = new FormData();
  formData.append('rfp_file', rfpFile);
  formData.append('proposal_file', proposalFile);

  try {
    const response = await fetch('http://localhost:8000/analyze/', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during document analysis:', error);
    throw error;
  }
};
