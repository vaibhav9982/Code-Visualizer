import { useEffect, useState } from "react";

const demoSteps = [
  {
    step: 1,
    description: "Initialize array arr with values [10, 20, 30, 40, 50].",
    state: {
      highlights: ["arr"],
    },
  },
  {
    step: 2,
    description: "Set i = 0. Access and output arr[0] (10).",
    state: {
      highlights: ["arr[0]"],
    },
  },
  {
    step: 3,
    description: "Increment i to 1. Access and output arr[1] (20).",
    state: {
      highlights: ["arr[1]"],
    },
  },
  {
    step: 4,
    description: "Increment i to 2. Access and output arr[2] (30).",
    state: {
      highlights: ["arr[2]"],
    },
  },
  {
    step: 5,
    description: "Increment i to 3. Access and output arr[3] (40).",
    state: {
      highlights: ["arr[3]"],
    },
  },
  {
    step: 6,
    description: "Increment i to 4. Access and output arr[4] (50).",
    state: {
      highlights: ["arr[4]"],
    },
  },
];

function Visualizer() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = demoSteps[currentStep];

  useEffect(() => {
    if (!isPlaying) return;

    if (currentStep >= demoSteps.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep]);

  const handlePrevious = () => {
    setIsPlaying(false);

    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setIsPlaying(false);

    setCurrentStep((prev) =>
      Math.min(prev + 1, demoSteps.length - 1)
    );
  };

  const handlePlay = () => {
    if (currentStep === demoSteps.length - 1) {
      setCurrentStep(0);
    }

    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <div>
      <h2>Array Traversal</h2>

      <p>
        Step {currentStep + 1} / {demoSteps.length}
      </p>

      <p>{step.description}</p>

      <div>
        {[10, 20, 30, 40, 50].map((value, index) => {
          const isHighlighted =
            step.state.highlights.includes(`arr[${index}]`);

          return (
            <span
              key={index}
              style={{
                display: "inline-block",
                padding: "20px",
                margin: "5px",
                border: "2px solid black",
                backgroundColor: isHighlighted
                  ? "yellow"
                  : "white",
              }}
            >
              {value}
            </span>
          );
        })}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrevious}>
          Previous
        </button>

        <button onClick={handlePlay}>
          Play
        </button>

        <button onClick={handleStop}>
          Stop
        </button>

        <button onClick={handleNext}>
          Next
        </button>

        <button onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Visualizer;