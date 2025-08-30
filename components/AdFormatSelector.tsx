
import React from 'react';
import type { AdFormat } from '../types';

interface AdFormatSelectorProps {
  adFormats: AdFormat[];
  selectedFormat: AdFormat | null;
  onSelectFormat: (format: AdFormat) => void;
  disabled: boolean;
}

const AdFormatSelector: React.FC<AdFormatSelectorProps> = ({ adFormats, selectedFormat, onSelectFormat, disabled }) => {
  const baseClasses = "p-4 border rounded-lg cursor-pointer transition-all duration-200";
  const disabledClasses = "bg-gray-100 cursor-not-allowed opacity-50";
  const enabledClasses = "hover:shadow-md hover:border-indigo-400 hover:bg-indigo-50";
  const selectedClasses = "bg-indigo-100 border-indigo-500 ring-2 ring-indigo-500 shadow-md";

  return (
    <div className={`w-full max-h-[20rem] overflow-y-auto pr-2 space-y-3 ${disabled ? 'pointer-events-none' : ''}`}>
      {adFormats.map((format) => (
        <div
          key={format.id}
          onClick={() => !disabled && onSelectFormat(format)}
          className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses} ${selectedFormat?.id === format.id ? selectedClasses : 'bg-white'}`}
        >
          <p className={`font-semibold ${selectedFormat?.id === format.id ? 'text-indigo-800' : 'text-gray-700'}`}>
            {format.name}
          </p>
          <p className={`text-sm ${selectedFormat?.id === format.id ? 'text-indigo-600' : 'text-gray-500'}`}>
            {format.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AdFormatSelector;
