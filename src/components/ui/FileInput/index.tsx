import cn from 'classnames';
import { ChangeEvent, DragEvent, forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { FormControlError } from '@/components/ui';

import classes from './file.input.module.scss';

export interface FileInputHandle {
  getValue: () => { base64: string; size: number; type: string } | null;
}

interface ImageUploadProps {
  label?: string;
  onChange?: (file: { base64: string; size: number; type: string } | null) => void;
  className?: string;
  accept?: string;
  error?: boolean;
  errorText?: string;
}

export const FileInput = forwardRef<FileInputHandle, ImageUploadProps>(
  ({ label, onChange, className, accept = 'image/*', error, errorText }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [fileInfo, setFileInfo] = useState<{
      base64: string;
      size: number;
      type: string;
    } | null>(null);

    console.log(errorText);

    useImperativeHandle(ref, () => ({
      getValue: () => fileInfo,
    }));

    const handleFileChange = (file: File | null) => {
      if (!file) {
        setPreview(null);
        setFileInfo(null);
        onChange?.(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setPreview(base64);
        const fileData = {
          base64,
          size: file.size,
          type: file.type,
        };
        setFileInfo(fileData);
        onChange?.(fileData);
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
);

FileInput.displayName = 'FileInput';
