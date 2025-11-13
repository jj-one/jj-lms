"use client"

import {useCallback, useEffect, useState} from 'react'
import {FileRejection, useDropzone} from 'react-dropzone'
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { RenderEmptyState, RenderErrorState, RenderUploadedState, RenderUploadingState } from './render-state';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { file } from 'zod';
import { useConstructUrl } from '@/hooks/use-construct-url';

interface UploaderState {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: 'image' | 'video';
}

interface fieldsProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function Uploader({value, onChange}: fieldsProps) {

    const fileUrl = useConstructUrl(value || "");
    const [fileState, setFileState] =  useState<UploaderState>({
        id: null,
        file: null,
        uploading: false,
        progress: 0,
        error: false,
        fileType: 'image',
        isDeleting: false,
        key: value,
        objectUrl: fileUrl,
    });

    async function uploadFile(file: File) {
      setFileState(prevState => ({
        ...prevState,
        uploading: true,
        progress: 0,
      }));

      try{
        const presignedResponse = await fetch("/api/s3/upload", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type,
            size: file.size,
            isImage: true,
          })
        });

        if(!presignedResponse.ok){
          toast.error(`Presigning failed with error status: ${presignedResponse.status}`);
          setFileState(prevState => ({
            ...prevState,
            uploading: false,
            progress: 0,
            error: true,
          }));

          return;
        }

        const { presignedUrl, key } = await presignedResponse.json();
        console.log("Presigned URL received: ", presignedUrl, "Key:", key);

        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const progress = (event.loaded / event.total) * 100;
              setFileState(prevState => ({
                ...prevState,
                progress: Math.round(progress),
              }));
            } 
          };
          
          xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 204) {
              setFileState(prevState => ({
                ...prevState,
                progress: 100,
                uploading: false,
                key,
              }));

              toast.success("File uploaded successfully!");

              onChange?.(key);

              resolve();
            } else {
              reject(new Error("Upload failed with status"));
            }
          };

          xhr.onerror = () => { 
            reject(new Error("Network error during upload."));
          };

          xhr.open("PUT", presignedUrl);
          xhr.setRequestHeader("Content-Type", file.type);
          xhr.setRequestHeader("x-amz-acl", "public-read"); // 👈 Add this
          xhr.send(file);
        } );  
      } catch {
        console.log("Crashed out of client upload");
        toast.error("An error occurred during the upload process.");
        setFileState(prevState => ({
          ...prevState,
          uploading: false,
          progress: 0,
          error: true,
        }));
      }

    }

      function rejectedFile(fileRejection: FileRejection[]) {
        if(fileRejection && fileRejection.length > 0) {
          const tooManyFiles = fileRejection[0].errors.find(error => error.code === 'too-many-files')
          const fileTooLarge = fileRejection[0].errors.find(error => error.code === 'file-too-large')
          if(tooManyFiles) {
            toast.error("You can only upload one file at a time.")
          }
          if(fileTooLarge) {
            toast.error("The selected file is too large. Maximum size is 5MB.")
          }
        }
      }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
          const file = acceptedFiles[0];

          if(fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
            URL.revokeObjectURL(fileState.objectUrl);
          }
      
          setFileState({
            file,
            uploading: false,
            progress: 0,
            objectUrl: URL.createObjectURL(file),
            error: false,
            id: uuidv4(),
            isDeleting: false,
            fileType: 'image',
          });

          uploadFile(file);
        } 
    }, [fileState.objectUrl]);

    async function handleRemoveFile() {
      if(fileState.isDeleting || !fileState.objectUrl) return;
      try{
        setFileState(prevState => ({
          ...prevState,
          isDeleting: true,
        }));

        if(fileState.key) {
          const deleteResponse = await fetch("/api/s3/delete", {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ key: fileState.key }),
          });

          if(!deleteResponse.ok){
            toast.error(`File deletion failed with status: ${deleteResponse.status}`);
            setFileState(prevState => ({
              ...prevState,
              isDeleting: false,
              error: true,
            }));
            return;
          }

          console.log("File deleted from S3 successfully.");
        }

        if(fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }

        onChange?.('');

        toast.success("File removed successfully.");
        setFileState({
          id: null,
          file: null,
          uploading: false,
          progress: 0,
          isDeleting: false,
          error: false,
          fileType: 'image',
          objectUrl: undefined,
        });
      } catch {
        toast.error("An error occurred while removing the file.");
        setFileState(prevState => ({
          ...prevState,
          uploading: false,
          progress: 0,
          error: true,
          isDeleting: false,
        }));
      }
    }

      

    function renderContent() {
      if (fileState.uploading && fileState.progress < 100) {
        return <RenderUploadingState progress={fileState.progress} file={fileState.file!} />;
      }

      if(fileState.error) {
        return <RenderErrorState />;
      }

      /*if (fileState.progress === 100 && !fileState.uploading) {
        return <h1>✅ Upload complete!</h1>;
      }*/

      if(fileState.objectUrl) {
        return RenderUploadedState({previewUrl: fileState.objectUrl, isDeleting: fileState.isDeleting, handleRemoveFile});
      }

      return <RenderEmptyState isDragActive={false} />;
    }

    useEffect(() => {
      return () => {
        if(fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }
      }
    }, [fileState.objectUrl]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
      onDrop,
      accept: {'image/*': []},
      maxFiles: 1,
      maxSize: 5 * 1024 * 1024, // 5 MB
      multiple: false,
      onDropRejected: rejectedFile,
      disabled: fileState.uploading || !!fileState.objectUrl,
    })

  return (
    <Card {...getRootProps()}
      className={cn(
        "border-dashed border-2 cursor-pointer p-6 text-center",
        isDragActive && "border-primary bg-primary/10"
      )}>
        <CardContent className='flex items-center justify-center h-full w-full p-4'>
            <input {...getInputProps()} />
            {renderContent()}
        </CardContent>
    </Card>
  )
}