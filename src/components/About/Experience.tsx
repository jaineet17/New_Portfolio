import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendar } from 'react-icons/fa';

const experiences = [
  {
    title: "Machine Learning Engineer",
    company: "Equiem Holdings Limited",
    type: "Student Worker",
    date: "Aug 2024 – Dec 2024",
    achievements: [
      "Improved RAG pipeline using LlamaIndex with GPT-4o mini, resulting in 25% performance increase",
      "Integrated session-based memory with Redis store for context-aware interactions",
      "Developed QA pairs as benchmarking tool to boost pipeline's accuracy"
    ],
    technologies: ["LlamaIndex", "GPT-4", "Redis", "RAG"]
  },
  {
    title: "Data Engineer Research Assistant",
    company: "School of Computer Science, Carnegie Mellon",
    date: "Oct 2023 – Mar 2024",
    achievements: [
      "Optimized NoSQL database project using Azure CosmosDB, achieving 30% faster processing",
      "Developed Large-Scale Batch Processing project with Azure Databricks & PySpark",
      "Refined data engineering & ML project using Selenium, PdfMiner, & Scikit-learn"
    ],
    technologies: ["Azure CosmosDB", "Databricks", "PySpark", "Selenium", "Scikit-learn"]
  },
  {
    title: "Machine Learning Intern",
    company: "Delemont Studio",
    date: "Jan 2022 – May 2022",
    achievements: [
      "Developed web-based chatbot prototype using Flask and JavaScript",
      "Engineered chatbot with BERT, Bi-Directional LSTM, and Attention models",
      "Achieved 65% accuracy with fine-tuned BERT model deployed on Azure"
    ],
    technologies: ["BERT", "PyTorch", "Flask", "Azure ML", "TensorFlow"]
  },
  {
    title: "Data Science Intern",
    company: "Dev Information Technology Limited",
    date: "Jun 2021 – Nov 2021",
    achievements: [
      "Extracted data using Selenium and BeautifulSoup, stored in Azure MariaDB",
      "Implemented ML models for customer segmentation and churn prediction",
      "Enhanced targeted marketing efforts using data-driven insights"
    ],
    technologies: ["Scikit-Learn", "Selenium", "Azure", "MySQL", "Pandas"]
  }
];

export default function Experience() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-orbitron text-neon-blue mb-6">Mission History</h2>
      
      <div className="relative border-l-2 border-neon-blue pl-8 space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className="relative"
          >
            {/* Timeline dot */}
            <div className="absolute left-[-2.35rem] top-0 w-4 h-4 bg-neon-blue rounded-full" />
            
            <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm
                         border border-transparent hover:border-neon-blue
                         transition-all group">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-orbitron text-white group-hover:text-neon-blue">
                    {exp.title}
                  </h3>
                  <div className="flex items-center text-gray-400 mt-1">
                    <FaBriefcase className="mr-2" />
                    {exp.company}
                  </div>
                </div>
                <div className="flex items-center text-neon-blue font-mono mt-2 md:mt-0">
                  <FaCalendar className="mr-2" />
                  {exp.date}
                </div>
              </div>

              <ul className="list-disc list-inside space-y-2 text-gray-300 mb-4">
                {exp.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (index * 0.2) + (i * 0.1) }}
                  >
                    {achievement}
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, techIndex) => (
                  <motion.span
                    key={techIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: (index * 0.2) + (techIndex * 0.1) }}
                    className="px-3 py-1 text-sm bg-neon-blue/10 rounded-full text-neon-blue"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 
