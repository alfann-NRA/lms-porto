'use client';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File, X } from 'lucide-react';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/msword': ['.doc', '.docx'],
    }
  });

  return (
    <div className="w-full font-sans">
      {!file ? (
        <div
          {...getRootProps()}
          className={`border-4 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? 'border-primary bg-primary/10 scale-105'
              : 'border-border bg-card hover:border-primary/50 hover:bg-muted'
          }`}
        >
          <input {...getInputProps()} />
          <UploadCloud className={`w-16 h-16 mx-auto mb-4 ${isDragActive ? 'text-primary' : 'text-muted-foreground'}`} />
          <h3 className="text-xl font-heading font-bold text-foreground mb-2">
            {isDragActive ? 'Lepaskan file di sini' : 'Tarik & Letakkan Tugas'}
          </h3>
          <p className="text-muted-foreground text-sm">
            Atau klik untuk memilih file dari komputer (PDF, Word, Image)
          </p>
        </div>
      ) : (
        <div className="bg-card border-2 border-border rounded-xl p-6 flex items-center shadow-sm">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
            <File className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-foreground font-bold truncate">{file.name}</h4>
            <p className="text-muted-foreground text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button
            onClick={() => setFile(null)}
            className="w-10 h-10 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive flex items-center justify-center transition-colors ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
