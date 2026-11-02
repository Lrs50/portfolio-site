import React, { useCallback, useEffect, useRef } from "react";
import ReactWordcloud from 'react-wordcloud';

const words = [
  // PROFESSIONS (strong visual emphasis)
  { text: "AI Engineer", value: 150 },
  { text: "Full Stack Engineer", value: 150 },
  { text: "Data Engineer", value: 150 },

  // CORE STACK (Tractian focus)
  { text: "Python", value: 100 },
  { text: "LLMs", value: 100 },
  { text: "AI Agents", value: 90 },
  { text: "Data Pipelines", value: 85 },
  { text: "Web Scraping", value: 80 },
  { text: "FastAPI", value: 75 },
  { text: "Docker", value: 75 },
  { text: "SQL", value: 70 },

  // SUPPORTING HARD SKILLS
  { text: "Backend", value: 60 },
  { text: "REST APIs", value: 55 },
  { text: "Data Enrichment", value: 55 },
  { text: "CI/CD", value: 55 },
  { text: "Bazel", value: 50 },
  { text: "AWS", value: 50 },
  { text: "Google Cloud", value: 50 },
  { text: "Quantum Computing", value: 50 },
  { text: "Machine Learning", value: 50 },
  { text: "MLOps", value: 50 },
  { text: "ETL Pipelines", value: 50 },
  { text: "React", value: 50 },
  { text: "LLM Evaluation", value: 45 },
  { text: "Fine-Tuning", value: 45 },
  { text: "Tailwind", value: 40 },
  { text: "Playwright", value: 40 },
  { text: "Pydantic", value: 40 },
  { text: "Monorepo", value: 40 },
  { text: "Datasets", value: 40 },
  { text: "Data Scientist", value: 40 },
  { text: "Pandas", value: 45 },
  { text: "NumPy", value: 45 },
  { text: "PyTorch", value: 50 },
  { text: "Scikit-Learn", value: 50 },
  { text: "Streamlit", value: 50 },
  { text: "Airflow", value: 50 },
  { text: "Git", value: 40 },
  { text: "Linux", value: 40 },
  { text: "Selenium", value: 30 },
  { text: "BeautifulSoup", value: 30 },
  { text: "Pennylane", value: 35 },
  { text: "Time Series", value: 30 },
  { text: "Qiskit", value: 25 },
  { text: "Classification", value: 25 },
  { text: "Regression", value: 25 },

  // SOFT SKILLS
  { text: "Ownership", value: 40 },
  { text: "Problem Solving", value: 40 },
  { text: "Communication", value: 35 },
  { text: "Teamwork", value: 35 },
  { text: "Curiosity", value: 35 },
  { text: "Initiative", value: 35 },
  { text: "Leadership", value: 30 },
  { text: "Empathy", value: 30 },
  { text: "Creativity", value: 30 },
  { text: "Learning", value: 30 },
  { text: "Autonomy", value: 28 },

  // LANGUAGES
  { text: "English", value: 40 },
  { text: "Portuguese", value: 30 },
  { text: "French", value: 20 },
  { text: "Spanish", value: 10 },
];

export default function WordCloudSection() {
  const containerRef = useRef(null);
  
  // Add custom callbacks for the word cloud
  const getCallback = useCallback((callback) => {
    return (word, event) => {
      const isActive = callback !== 'onWordMouseOut';
      const element = event.target;
      
      // Apply styling changes but not transform directly
      const transitionDuration = '0.3s';
      const color = isActive ? "#F2789F" : null; // Highlight color when hovered
      const fontWeight = isActive ? "bold" : null;
      const textShadow = isActive ? "0px 0px 5px rgba(242, 120, 159, 0.3)" : null;

      // Apply styles to the element
      element.style.transition = `all ${transitionDuration}`;
      
      if (isActive) {
        // Increase font size
        element.style.fontSize = `${parseInt(getComputedStyle(element).fontSize) * 1.25}px`;
        element.style.color = color;
        element.style.fontWeight = fontWeight;
        element.style.textShadow = textShadow;
        element.style.zIndex = 100; // Bring to front when hovered
      } else {
        // Reset all styles
        element.style.fontSize = null;
        element.style.color = null;
        element.style.fontWeight = null;
        element.style.textShadow = null;
        element.style.zIndex = null;
      }
    };
  }, []);

  const callbacks = {
    onWordMouseOver: getCallback('onWordMouseOver'),
    onWordMouseOut: getCallback('onWordMouseOut'),
    getWordTooltip: word => `${word.text}`,
  };

  const options = {
    fontFamily: 'Inter, sans-serif',
    fontSizes: [8, 40],
    rotations: 1,
    rotationAngles: [0],
    padding: 2,
    enableTooltip: false,
    spiral: 'archimedean',
    transitionDuration: 600,
    deterministic: true,
    colors: [
      "#701438", // main brand color
      "#8C1E4B", // deep rose
      "#B33666", // pink-magenta
      "#DA5B89", // softer pink
      "#F2789F", // bright accent
      "#555555", // neutral dark gray
      "#888888", // medium gray
    ]
  };

  // Using useEffect to remove overflow hidden from all SVG containers after rendering
  useEffect(() => {
    if (containerRef.current) {
      // Give time for the word cloud to render
      setTimeout(() => {
        // Find all SVG elements and their parent containers
        const svgElements = containerRef.current.querySelectorAll('svg');
        const divElements = containerRef.current.querySelectorAll('div');
        
        // Remove overflow hidden from SVG elements
        svgElements.forEach(svg => {
          svg.style.overflow = 'visible';
        });
        
        // Remove overflow hidden from all container divs
        divElements.forEach(div => {
          div.style.overflow = 'visible';
        });
      }, 1000);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[500px] overflow-visible relative"
    >
      <ReactWordcloud
        words={words}
        options={options}
        callbacks={callbacks}
      />
    </div>
  );
}