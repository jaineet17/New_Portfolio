import { Mission } from '../types';

export const missions: Mission[] = [
  // Academic Projects
  {
    id: "speech-recognition",
    title: "End-to-End Speech Recognition",
    objective: "Developed transformer-based model (60M params) using CTC + CE loss, achieving 10.6% CER. Built encoder-decoder with ResNet embedding and pyramidal BiLSTMs.",
    tools: [
      { name: "PyTorch", icon: "pytorch", color: "#EE4C2C" },
      { name: "Transformers", icon: "transformers", color: "#FFB71B" },
      { name: "W&B", icon: "wandb", color: "#FFBE00" },
      { name: "GCP", icon: "gcp", color: "#4285F4" }
    ],
    status: "completed",
    difficulty: 5,
    category: "academic",
    githubUrl: "https://github.com/yourusername/speech-recognition"
  },
  {
    id: "face-classification",
    title: "Face Classification System",
    objective: "Trained ResNet-50 model with custom ArcFace loss, achieving 96.5% validation accuracy and 90% verification accuracy. Implemented real-time face detection pipeline.",
    tools: [
      { name: "PyTorch", icon: "pytorch", color: "#EE4C2C" },
      { name: "OpenCV", icon: "opencv", color: "#5C3EE8" },
      { name: "W&B", icon: "wandb", color: "#FFBE00" },
      { name: "GCP", icon: "gcp", color: "#4285F4" }
    ],
    status: "completed",
    difficulty: 4,
    category: "academic",
    githubUrl: "https://github.com/yourusername/face-classification"
  },
  {
    id: "needle-framework",
    title: "Deep Learning Framework",
    objective: "Built DL framework with NumPy backend, adding CUDA/Metal acceleration. Implemented core ops like Transformers, LSTMs, CNNs, and optimizers.",
    tools: [
      { name: "Python", icon: "python", color: "#3776AB" },
      { name: "CUDA", icon: "nvidia", color: "#76B900" },
      { name: "Metal", icon: "apple", color: "#000000" },
      { name: "C++", icon: "cpp", color: "#00599C" }
    ],
    status: "completed",
    difficulty: 5,
    category: "academic",
    githubUrl: "https://github.com/yourusername/needle"
  },
  {
    id: "movie-recommender",
    title: "Movie Recommendation Engine",
    objective: "Built scalable recommendation system with Kafka and MongoDB, handling 10M+ data points. Implemented CI/CD pipeline with Jenkins and Docker.",
    tools: [
      { name: "Kafka", icon: "apache", color: "#231F20" },
      { name: "Docker", icon: "docker", color: "#2496ED" },
      { name: "MongoDB", icon: "mongodb", color: "#47A248" },
      { name: "Jenkins", icon: "jenkins", color: "#D24939" }
    ],
    status: "completed",
    difficulty: 4,
    category: "academic",
    githubUrl: "https://github.com/yourusername/movie-recommender"
  },

  // Professional Experience
  {
    id: "equiem-rag",
    title: "RAG Pipeline Optimization",
    objective: "Enhanced RAG pipeline with LlamaIndex and GPT-4, improving query performance by 25%. Implemented data cleaning and metadata enrichment system.",
    tools: [
      { name: "LlamaIndex", icon: "ai", color: "#00FF00" },
      { name: "GPT-4", icon: "openai", color: "#00A67E" },
      { name: "Redis", icon: "redis", color: "#DC382D" },
      { name: "Python", icon: "python", color: "#3776AB" }
    ],
    status: "completed",
    difficulty: 4,
    category: "professional",
    date: "Aug 2023 – Dec 2023",
    company: "Equiem Holdings Limited",
    githubUrl: "https://github.com/yourusername/equiem-rag"
  },
  {
    id: "cmu-research",
    title: "Database Optimization Research",
    objective: "Optimized NoSQL database achieving 30% faster processing. Developed large-scale batch processing system using Azure Databricks and PySpark.",
    tools: [
      { name: "Azure", icon: "azure", color: "#0078D4" },
      { name: "Databricks", icon: "databricks", color: "#FF3621" },
      { name: "PySpark", icon: "apache", color: "#E25A1C" },
      { name: "Scikit-learn", icon: "sklearn", color: "#F7931E" }
    ],
    status: "completed",
    difficulty: 4,
    category: "professional",
    date: "Oct 2023 – Mar 2024",
    company: "Carnegie Mellon University",
    githubUrl: "https://github.com/yourusername/cmu-research"
  },
  {
    id: "delemont-chatbot",
    title: "AI Chatbot Development",
    objective: "Built web-based chatbot using BERT and BiLSTM models, achieving 65% accuracy. Deployed on Azure with real-time response capabilities.",
    tools: [
      { name: "BERT", icon: "tensorflow", color: "#FF6F00" },
      { name: "PyTorch", icon: "pytorch", color: "#EE4C2C" },
      { name: "Flask", icon: "flask", color: "#000000" },
      { name: "Azure", icon: "azure", color: "#0078D4" }
    ],
    status: "completed",
    difficulty: 4,
    category: "professional",
    date: "Jan 2022 – May 2022",
    company: "Delemont Studio",
    githubUrl: "https://github.com/yourusername/delemont-chatbot"
  },
  {
    id: "dev-it-data",
    title: "Customer Analytics Platform",
    objective: "Developed ML pipeline for customer segmentation and churn prediction. Built data collection system using Selenium and Azure MariaDB.",
    tools: [
      { name: "Scikit-Learn", icon: "sklearn", color: "#F7931E" },
      { name: "Selenium", icon: "selenium", color: "#43B02A" },
      { name: "Azure", icon: "azure", color: "#0078D4" },
      { name: "MySQL", icon: "mysql", color: "#4479A1" }
    ],
    status: "completed",
    difficulty: 3,
    category: "professional",
    date: "Jun 2021 – Nov 2021",
    company: "Dev Information Technology Limited",
    githubUrl: "https://github.com/yourusername/dev-it-data"
  }
]; 