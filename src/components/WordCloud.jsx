import React, { useCallback, useEffect, useRef } from "react";
import ReactWordcloud from 'react-wordcloud';

const words = [
  // 🌟 PROFISSÕES (destaque visual forte)
  { text: "Full Stack Engineer", value: 150 },
  { text: "Data Scientist", value: 150 },
  { text: "Data Engineer", value: 150 },
  { text: "AI Engineer", value: 100 },
  { text: "MLOps", value: 100 },

  // 🔧 HARD SKILLS relevantes
  { text: "Time Series", value: 70 },
  { text: "Classification", value: 70 },
  { text: "Regression", value: 70 },
  { text: "Python", value: 70 },
  { text: "SQL", value: 65 },
  { text: "Docker", value: 60 },
  { text: "Airflow", value: 60 },
  { text: "FastAPI", value: 55 },
  { text: "PyTorch", value: 50 },
  { text: "Scikit-Learn", value: 50 },
  { text: "Streamlit", value: 50 },
  { text: "ETL Pipelines", value: 50 },
  { text: "LLM", value: 50 },
  { text: "REST APIs", value: 45 },
  { text: "Pandas", value: 45 },
  { text: "NumPy", value: 45 },
  { text: "Git", value: 40 },
  { text: "Linux", value: 40 },
  { text: "Cloud", value: 40 },
  { text: "Google Cloud", value: 35 },
  { text: "AWS", value: 35 },
  { text: "TinyDB", value: 30 },
  { text: "Selenium", value: 30 },
  { text: "BeautifulSoup", value: 30 },
  { text: "Qiskit", value: 28 },
  { text: "Pennylane", value: 28 },
  { text: "Machine Learning", value: 50 },
  { text: "APIs", value: 40 },

  // 💬 SOFT SKILLS & DIFERENCIAIS
  { text: "Communication", value: 35 },
  { text: "Problem Solving", value: 40 },
  { text: "Teamwork", value: 35 },
  { text: "Leadership", value: 30 },
  { text: "Curiosity", value: 35 },
  { text: "Empathy", value: 30 },
  { text: "Creativity", value: 30 },
  { text: "Initiative", value: 28 },
  { text: "Learning", value: 30 },
  { text: "Autonomy", value: 28 },

  // 🌎 IDIOMAS
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