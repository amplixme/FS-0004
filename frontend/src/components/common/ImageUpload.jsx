import { useState, useRef } from 'react';
import { uploadAPI } from '../../services/upload.service';

function ImageUpload({ value, onChange, disabled }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Solo se permiten imágenes JPG, PNG o WEBP');
    }
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('La imagen no puede pesar más de 5MB');
    }
  };

  const handleFile = async (file) => {
    if (!file || disabled) return;
    
    setError(null);
    try {
      validateFile(file);
      setUploading(true);
      setProgress(0);

      const url = await uploadAPI.uploadImage(file, (pct) => {
        setProgress(pct);
      });

      onChange(url);
    } catch (err) {
      setError(err.message || 'Error al subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
    // Limpiar input para permitir seleccionar la misma imagen de nuevo si la borran
    e.target.value = '';
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className="w-full">
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 group bg-slate-100 flex items-center justify-center">
          <img 
            src={value} 
            alt="Portada" 
            className="w-full h-48 object-cover"
          />
          {!disabled && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-black/60 text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-600 transition-colors"
              title="Eliminar imagen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      ) : (
        <div
          onClick={() => !disabled && !uploading && fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative w-full h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-colors cursor-pointer overflow-hidden
            ${disabled ? 'opacity-50 cursor-not-allowed border-slate-300 bg-slate-50' : ''}
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}
            ${uploading ? 'pointer-events-none' : ''}
          `}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChange}
            accept="image/jpeg, image/png, image/webp"
            className="hidden"
            disabled={disabled || uploading}
          />

          {uploading ? (
            <div className="flex flex-col items-center w-full px-8">
              <span className="text-blue-600 font-medium mb-3">Subiendo... {progress}%</span>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-blue-600 h-2 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-slate-400 mb-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-sm text-slate-600 font-medium">Haz clic para subir o arrastra una imagen</p>
              <p className="text-xs text-slate-400 mt-1">JPG, PNG, WEBP (máx. 5MB)</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
