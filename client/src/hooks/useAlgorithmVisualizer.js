import { useState, useEffect, useRef, useCallback } from 'react';

export function useAlgorithmVisualizer(initialArray = [45, 12, 85, 32, 89, 39, 69, 21, 56, 9], algorithmType = 'bubble-sort') {
  const [array, setArray] = useState([...initialArray]);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500); // ms per step
  const timerRef = useRef(null);

  // Generate animation steps based on algorithm
  const generateSteps = useCallback((sourceArray, type) => {
    const recordedSteps = [];
    const arr = [...sourceArray];

    if (type === 'bubble-sort') {
      const n = arr.length;
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          recordedSteps.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapping: [],
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
          });

          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            recordedSteps.push({
              array: [...arr],
              comparing: [],
              swapping: [j, j + 1],
              sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
            });
          }
        }
      }
      recordedSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: arr.length }, (_, k) => k),
      });
    } else if (type === 'quick-sort') {
      function partition(a, low, high) {
        const pivot = a[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
          recordedSteps.push({
            array: [...a],
            comparing: [j, high],
            swapping: [],
            sorted: [],
          });
          if (a[j] <= pivot) {
            i++;
            [a[i], a[j]] = [a[j], a[i]];
            recordedSteps.push({
              array: [...a],
              comparing: [],
              swapping: [i, j],
              sorted: [],
            });
          }
        }
        [a[i + 1], a[high]] = [a[high], a[i + 1]];
        recordedSteps.push({
          array: [...a],
          comparing: [],
          swapping: [i + 1, high],
          sorted: [i + 1],
        });
        return i + 1;
      }

      function qsort(a, low, high) {
        if (low < high) {
          const pi = partition(a, low, high);
          qsort(a, low, pi - 1);
          qsort(a, pi + 1, high);
        }
      }

      qsort(arr, 0, arr.length - 1);
      recordedSteps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: arr.length }, (_, k) => k),
      });
    } else {
      // Default: Simple progressive step simulator
      const sortedCopy = [...arr].sort((a, b) => a - b);
      for (let i = 0; i < arr.length; i++) {
        recordedSteps.push({
          array: [...arr],
          comparing: [i, Math.min(i + 1, arr.length - 1)],
          swapping: [],
          sorted: Array.from({ length: i }, (_, k) => k),
        });
      }
      recordedSteps.push({
        array: sortedCopy,
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: arr.length }, (_, k) => k),
      });
    }

    return recordedSteps;
  }, []);

  // Initialize or reset steps when array or algorithm changes
  const reset = useCallback((newArr = null) => {
    const targetArr = newArr || initialArray;
    setIsPlaying(false);
    clearInterval(timerRef.current);
    const newSteps = generateSteps(targetArr, algorithmType);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    setArray(newSteps.length > 0 ? newSteps[0].array : targetArr);
  }, [initialArray, algorithmType, generateSteps]);

  useEffect(() => {
    reset(initialArray);
  }, [initialArray, algorithmType, reset]);

  // Step Forward
  const stepForward = useCallback(() => {
    setCurrentStepIndex((prev) => {
      if (prev < steps.length - 1) {
        const next = prev + 1;
        setArray(steps[next].array);
        return next;
      }
      setIsPlaying(false);
      return prev;
    });
  }, [steps]);

  // Step Backward
  const stepBackward = useCallback(() => {
    setCurrentStepIndex((prev) => {
      if (prev > 0) {
        const next = prev - 1;
        setArray(steps[next].array);
        return next;
      }
      return prev;
    });
  }, [steps]);

  // Play / Pause toggler
  const togglePlay = useCallback(() => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
      setArray(steps[0]?.array || initialArray);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  }, [currentStepIndex, steps, initialArray]);

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        stepForward();
      }, speed);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, speed, stepForward]);

  const currentStep = steps[currentStepIndex] || {
    array,
    comparing: [],
    swapping: [],
    sorted: [],
  };

  return {
    array: currentStep.array,
    comparing: currentStep.comparing || [],
    swapping: currentStep.swapping || [],
    sorted: currentStep.sorted || [],
    currentStepIndex,
    totalSteps: steps.length,
    isPlaying,
    speed,
    togglePlay,
    stepForward,
    stepBackward,
    reset,
    setSpeed,
  };
}

export default useAlgorithmVisualizer;
