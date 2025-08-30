import React from 'react';

interface SloganInputProps {
  slogan: string;
  setSlogan: (slogan: string) => void;
  useAiSlogan: boolean;
  setUseAiSlogan: (use: boolean) => void;
  disabled: boolean;
}

const SloganInput: React.FC<SloganInputProps> = ({ slogan, setSlogan, useAiSlogan, setUseAiSlogan, disabled }) => {
  
  const handleToggleAiSlogan = () => {
    if (disabled) return;
    const newUseAiSlogan = !useAiSlogan;
    setUseAiSlogan(newUseAiSlogan);
    if (newUseAiSlogan) {
      setSlogan(''); // Clear manual slogan when AI is selected
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">3. Add a Slogan (Optional)</h2>
      
      <div className="relative">
        <textarea
          value={slogan}
          onChange={(e) => setSlogan(e.target.value)}
          disabled={disabled || useAiSlogan}
          placeholder="e.g., 'Experience the future of...' or leave blank"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
          rows={2}
          aria-label="Enter a marketing slogan"
        />
      </div>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm font-semibold">OR</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      
      <button
        onClick={handleToggleAiSlogan}
        disabled={disabled}
        type="button"
        className={`w-full p-4 border rounded-lg transition-all duration-200 flex items-center justify-center gap-3 text-left
          ${useAiSlogan
            ? 'bg-indigo-100 border-indigo-500 ring-2 ring-indigo-500 shadow-md'
            : 'bg-white hover:shadow-md hover:border-indigo-400 hover:bg-indigo-50'
          } 
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-50' : 'cursor-pointer'}`
        }
      >
        <span className={`text-2xl transition-transform duration-300 ${useAiSlogan ? 'rotate-12 scale-110' : ''}`}>✨</span>
        <div>
            <p className={`font-semibold ${useAiSlogan ? 'text-indigo-800' : 'text-gray-700'}`}>
            Let AI Create a Slogan
            </p>
            <p className={`text-sm ${useAiSlogan ? 'text-indigo-600' : 'text-gray-500'}`}>
            The model will generate and add a slogan for you.
            </p>
        </div>
      </button>
    </div>
  );
};

export default SloganInput;
