import React, { useState, useCallback } from 'react';
import { generateAdImage } from './services/geminiService';
import type { AdFormat } from './types';
import { AD_FORMATS } from './constants';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import AdFormatSelector from './components/AdFormatSelector';
import SloganInput from './components/SloganInput';
import Loader from './components/Loader';

// Define child components outside the parent component to prevent re-renders
const GeneratedResult: React.FC<{ original: string; generated: string; onDownload: () => void }> = ({ original, generated, onDownload }) => (
  <div className="mt-12 w-full">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Your Ad is Ready!</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-600 mb-3">Original Product</h3>
        <img src={original} alt="Original product" className="rounded-xl shadow-lg object-contain h-80 w-auto" />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-full mb-3">
            <h3 className="text-lg font-semibold text-gray-600">Generated Ad</h3>
            <button
              onClick={onDownload}
              className="ml-3 p-2 bg-indigo-100 text-indigo-600 rounded-full hover:bg-indigo-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label="Download generated ad"
              title="Download generated ad"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
        </div>
        <img src={generated} alt="Generated advertisement" className="rounded-xl shadow-lg object-contain h-80 w-auto" />
      </div>
    </div>
  </div>
);


export default function App() {
  const [productImage, setProductImage] = useState<File | null>(null);
  const [productImagePreview, setProductImagePreview] = useState<string | null>(null);
  const [selectedAdFormat, setSelectedAdFormat] = useState<AdFormat | null>(null);
  const [slogan, setSlogan] = useState<string>('');
  const [useAiSlogan, setUseAiSlogan] = useState<boolean>(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File, preview: string) => {
    setProductImage(file);
    setProductImagePreview(preview);
    setGeneratedImage(null);
    setError(null);
    setSlogan('');
    setUseAiSlogan(false);
  };

  const handleGenerateClick = useCallback(async () => {
    if (!productImage || !productImagePreview || !selectedAdFormat) {
      setError("Please upload an image and select an ad format.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    let finalPrompt = selectedAdFormat.prompt;

    if (useAiSlogan) {
      finalPrompt += ". Also, come up with a short, catchy marketing slogan for the product and incorporate it naturally into the ad image as text.";
    } else if (slogan.trim() !== '') {
      finalPrompt += `. Please incorporate the following text as a marketing slogan into the ad image: "${slogan.trim()}". Make sure the text is clearly visible and well-integrated.`;
    }

    try {
      const base64Data = productImagePreview.split(',')[1];
      const result = await generateAdImage(base64Data, productImage.type, finalPrompt);
      
      if(result) {
        setGeneratedImage(`data:image/png;base64,${result}`);
      } else {
        setError("The AI could not generate an image. Please try a different product or ad style.");
      }
    } catch (e) {
      console.error(e);
      setError("An error occurred while generating the ad. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  }, [productImage, productImagePreview, selectedAdFormat, slogan, useAiSlogan]);

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `ad-${selectedAdFormat?.id || 'generated'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-700">
      <main className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        <Header />
        
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 md:p-12 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Upload Your Product</h2>
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>

            <div className="flex flex-col">
               <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">2. Choose Ad Style</h2>
               <AdFormatSelector
                adFormats={AD_FORMATS}
                selectedFormat={selectedAdFormat}
                onSelectFormat={setSelectedAdFormat}
                disabled={!productImage}
              />
            </div>
          </div>
          
          <div className="mt-10 border-t pt-10">
            <SloganInput
              slogan={slogan}
              setSlogan={setSlogan}
              useAiSlogan={useAiSlogan}
              setUseAiSlogan={setUseAiSlogan}
              disabled={!productImage}
            />
          </div>


          <div className="mt-12 text-center">
            <button
              onClick={handleGenerateClick}
              disabled={!productImage || !selectedAdFormat || isLoading}
              className="bg-indigo-600 text-white font-bold text-lg py-3 px-10 rounded-full shadow-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              {isLoading ? 'Generating...' : '✨ Generate Ad'}
            </button>
          </div>
        </div>

        {isLoading && <Loader />}

        {error && (
          <div className="mt-8 w-full max-w-4xl bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
            <strong className="font-bold">Oops! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {generatedImage && productImagePreview && (
          <GeneratedResult original={productImagePreview} generated={generatedImage} onDownload={handleDownload} />
        )}

      </main>
    </div>
  );
}