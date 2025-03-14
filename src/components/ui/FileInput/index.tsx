import cn from 'classnames';
import { ChangeEvent, DragEvent, useRef, useState } from 'react';

import { FormControlError } from '@/components/ui';

import classes from './file.input.module.scss';

interface ImageUploadProps {
  label?: string;
  onChange: (file: File | null) => void;
  className?: string;
  accept?: string;
  maxSizeMB?: number;
  error?: boolean;
  errorText?: string;
}

export function FileInput({
  label,
  onChange,
  className,
  accept = 'image/*',
  maxSizeMB = 5,
  error,
  errorText,
}: Readonly<ImageUploadProps>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setPreview(null);
      onChange(null);
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size exceeds ${maxSizeMB}MB`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      onChange(file);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    handleFileChange(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className={cn(classes.wrapper, className)}>
      {label && <span className={classes.label}>{label}</span>}

      <div
        className={cn(classes.uploadArea, {
          [classes.dragging]: isDragging,
          [classes.hasError]: !!error,
          [classes.hasPreview]: !!preview,
        })}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" accept={accept} onChange={handleInputChange} className={classes.input} />

        {error && <FormControlError className={classes.error}>{errorText}</FormControlError>}

        {preview ? (
          <>
            <img src={preview} alt="Preview" className={classes.preview} />
            <div className={classes.overlay}>
              <span className={classes.overlayText}>Click to change</span>
            </div>
          </>
        ) : (
          <div className={classes.placeholder}>
            <span>Drag & drop or click to upload</span>
          </div>
        )}
      </div>
    </div>
  );
}
