# Proposal Analyzer

Proposal Analyzer is a web application that allows users to upload RFP (Request for Proposal) and Proposal documents for analysis. The app provides insights and eligibility criteria based on the uploaded documents.

## Features

- Upload and analyze RFP and Proposal documents
- Display detailed analysis results
- Animated loading screen with interesting facts
- Responsive and user-friendly interface

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS, Framer Motion
- Backend: FastAPI, Python
- Deployment: Vercel (Frontend), Heroku (Backend)

## Installation

### Prerequisites

- Node.js and npm
- Python and pip

### Frontend

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/proposal-analyzer.git
   cd proposal-analyzer/frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

### Backend

1. Navigate to the backend directory:

   ```bash
   cd ../backend
   ```

2. Create a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\\Scripts\\activate`
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the backend server:

   ```bash
   uvicorn main:app --reload
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Upload your RFP and Proposal documents.
3. Wait for the analysis to complete.
4. View the analysis results.

## License

This project is licensed under the MIT License.
