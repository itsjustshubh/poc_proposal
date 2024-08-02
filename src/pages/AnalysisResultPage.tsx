import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, CaretDown, CaretUp } from "phosphor-react";
import { AnalysisResult } from "../types";

interface LocationState {
  result: AnalysisResult[];
}

const AnalysisResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const [result, setResult] = useState<AnalysisResult[]>(state?.result || []);
  const [expandedSections, setExpandedSections] = useState<boolean[]>(
    new Array(result.length).fill(false)
  );
  const [allExpanded, setAllExpanded] = useState(false);

  useEffect(() => {
    if (state?.result) {
      setResult(state.result);
      setExpandedSections(new Array(state.result.length).fill(false));
    } else {
      navigate("/"); // Redirect to main page if no result is found
    }
  }, [state, navigate]);

  const toggleExpandSection = (index: number) => {
    setExpandedSections((prevState) => {
      const newExpandedSections = [...prevState];
      newExpandedSections[index] = !newExpandedSections[index];
      return newExpandedSections;
    });
  };

  const toggleExpandAll = () => {
    setAllExpanded(!allExpanded);
    setExpandedSections(new Array(result.length).fill(!allExpanded));
  };

  if (result.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8">
        <h1 className="text-2xl font-bold">No Analysis Result Found</h1>
        <button
          className="mt-4 bg-[#eb8c00] text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-[#602320] transition duration-300"
          onClick={() => navigate("/")}
        >
          Go Back to Main Page
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-8 px-4">
      <h1 className="text-4xl font-bold text-[#eb8c00] mb-8">
        Analysis Result
      </h1>
      <div className="flex justify-end w-full max-w-4xl">
        <button
          className="bg-[#eb8c00] text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-[#602320] transition duration-300 mb-4"
          onClick={toggleExpandAll}
        >
          {allExpanded ? "Collapse All" : "Expand All"}
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-8">
        {result.map((item, index) => (
          <div
            key={index}
            className="mb-4 pb-4 border-b border-gray-200 last:border-b-0"
          >
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-[#eb8c00]">
                  {item.criterion}
                </h2>
                <p
                  className={`text-xl font-medium flex items-center ${
                    item.eligibility_met === "Yes"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.eligibility_met === "Yes" ? (
                    <CheckCircle size={24} className="mr-2" />
                  ) : (
                    <XCircle size={24} className="mr-2" />
                  )}
                  {`Eligibility Met: ${item.eligibility_met}`}
                </p>
              </div>
              <button onClick={() => toggleExpandSection(index)}>
                {expandedSections[index] ? (
                  <CaretUp size={24} className="text-gray-600" />
                ) : (
                  <CaretDown size={24} className="text-gray-600" />
                )}
              </button>
            </div>
            {expandedSections[index] && (
              <p className="text-lg mt-2">{item.reason}</p>
            )}
          </div>
        ))}
      </div>
      <button
        className="mt-8 bg-[#eb8c00] text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-[#602320] transition duration-300"
        onClick={() => navigate("/")}
      >
        Go Back to Main Page
      </button>
    </div>
  );
};

export default AnalysisResultPage;
