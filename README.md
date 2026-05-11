# AI-Based Mental Health Monitoring System

![Project Banner](https://via.placeholder.com/1200x400.png?text=AI-Based+Mental+Health+Monitoring+System)

An advanced, full-stack application designed to proactively monitor, analyze, and assist with users' mental well-being using Artificial Intelligence. This system provides personalized insights, mood tracking, journaling, stress assessment, and an interactive AI chatbot to offer mental health support and analytics.

## ✨ Features

* **Secure Authentication:** Robust user authentication and authorization using JWT (JSON Web Tokens).
* **AI Chatbot Support:** Real-time conversational AI assistant to provide immediate guidance and support.
* **Mood Tracking:** Intuitive daily mood logging to identify patterns and triggers over time.
* **Digital Journaling:** Private, secure space for users to express thoughts and reflect on their day.
* **Stress Assessment:** Machine learning-based stress prediction and analysis to proactively alert users.
* **Comprehensive Analytics:** Visual dashboards summarizing mental health metrics and progress over weeks and months.
* **Emergency Resources:** Quick access to emergency contacts and professional help when critical intervention is needed.
* **Admin Dashboard:** Centralized management portal for administrators to oversee platform usage and maintain safety standards.

## 🛠️ Technology Stack

### Frontend
* **React.js** (via Vite)
* **Tailwind CSS** for responsive, modern UI design
* **Context API** for state management
* **Axios** for API communication

### Backend
* **Python / Flask** 
* **Machine Learning:** Scikit-learn, Pandas (for stress modeling and AI integration)
* **Authentication:** PyJWT, bcrypt

## 📁 Project Structure

```text
├── backend/                  # Flask REST API and Machine Learning Models
│   ├── app/
│   │   ├── controllers/      # Route logic
│   │   ├── ml/               # Machine Learning models (stress_model.py)
│   │   ├── models/           # Database models (User, Mood, Journal)
│   │   ├── routes/           # API endpoints routing
│   │   ├── services/         # Business logic and AI services
│   │   └── utils/            # Helpers and DB connection
│   ├── .env                  # Backend environment variables
│   ├── run.py                # Backend entry point
│   └── requirements.txt      # Python dependencies (or Pipfile)
│
├── frontend/                 # React Application
│   ├── src/
│   │   ├── components/       # Reusable UI components (Navbar, Sidebar)
│   │   ├── context/          # React context (Auth, Theme)
│   │   ├── layouts/          # Page layouts (Dashboard, Public)
│   │   ├── pages/            # Application views (Dashboard, Chatbot, etc.)
│   │   ├── services/         # API integration
│   │   └── utils/            # Frontend helper functions
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js    # Tailwind configuration
│   └── vite.config.js        # Vite build configuration
└── README.md                 # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- Node.js (v16.0.0 or higher)
- Python (v3.9 or higher)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/santunandi95/AI-Based-Mental-Health-Monitoring-System.git
cd AI-Based-Mental-Health-Monitoring-System
```

### 2. Backend Setup

Open a terminal and navigate to the `backend` directory:

```bash
cd backend
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies (assuming a requirements file exists)
# pip install -r requirements.txt

# Run the backend development server
python run.py
```

### 3. Frontend Setup

Open a new terminal and navigate to the `frontend` directory:

```bash
cd frontend

# Install Node.js dependencies
npm install

# Start the frontend development server
npm run dev
```

The application will typically be available at `http://localhost:5173`.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/santunandi95/AI-Based-Mental-Health-Monitoring-System/issues) if you want to contribute.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
