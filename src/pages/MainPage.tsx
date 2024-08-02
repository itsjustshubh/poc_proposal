import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import WelcomeAnimation from "../components/WelcomeAnimation";
import LoadingPageAnimation from "../components/LoadingPageAnimation";
import DropBox from "../components/DropBox";
import { FilePdf, FileText } from "phosphor-react";
import { Tooltip } from "@mui/material";
import { analyzeDocuments } from "../api";

const MainPage: React.FC = () => {
  const [showMainContent, setShowMainContent] = useState(false);
  const [rfpFile, setRFPFile] = useState<File | null>(null);
  const [proposalFile, setProposalFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleAnimationComplete = () => {
    setTimeout(() => {
      setShowMainContent(true);
    }, 800); // Add a buffer of 0.8 seconds before showing the main content
  };

  const handleRFPDrop = (files: File[]) => {
    if (files.length > 0) {
      setRFPFile(files[0]);
    }
  };

  const handleProposalDrop = (files: File[]) => {
    if (files.length > 0) {
      setProposalFile(files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!rfpFile || !proposalFile) {
      alert("Please upload both RFP and Proposal documents.");
      return;
    }

    setLoading(true);

    try {
      const analysisResponse = await analyzeDocuments(rfpFile, proposalFile);
      setLoading(false);
      console.log("Analysis eligibility_criteria:", analysisResponse.eligibility_criteria);
      navigate("/analysis-result", {
        state: { result: analysisResponse.eligibility_criteria },
      });
    } catch (error) {
      console.error("Error during document analysis:", error);
      alert("There was an error analyzing the documents.");
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingPageAnimation factsFile="/facts.json" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
      {!showMainContent ? (
        <WelcomeAnimation onAnimationComplete={handleAnimationComplete} />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-center w-full px-4"
        >
          <h1 className="text-4xl font-bold text-left mt-8 text-[#eb8c00] mb-4">
            Welcome to the Proposal Analyzer
          </h1>
          <h2 className="text-2xl font-medium text-left mb-8 text-[#eb8c00]">
            Please upload your RFP (Request for Proposal) and Proposal documents
            for analysis.
          </h2>
          <div className="flex justify-center mt-4 mb-8 flex-wrap gap-4">
            <div className="w-full max-w-xs mx-2">
              <DropBox
                title="Upload RFP Document (PDF)"
                description="Drop your RFP PDF file here."
                icon={FilePdf}
                accept={["application/pdf"]}
                maxFiles={1}
                height={384} // 96*4
                width={384} // 96*4
                onDrop={handleRFPDrop}
              />
            </div>
            <div className="w-full max-w-xs mx-2">
              <DropBox
                title="Upload Proposal (PDF)"
                description="Drop your Proposal PDF here."
                icon={FileText}
                accept={["application/pdf"]}
                maxFiles={1}
                height={384} // 96*4
                width={384} // 96*4
                onDrop={handleProposalDrop}
              />
            </div>
          </div>
          <Tooltip title="Click to analyze the uploaded documents" arrow>
            <button
              className="bg-[#eb8c00] text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-[#602320] transition duration-300"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze Documents"}
            </button>
          </Tooltip>
        </motion.div>
      )}
    </div>
  );
};

export default MainPage;
