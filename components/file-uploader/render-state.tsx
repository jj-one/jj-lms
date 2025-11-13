import { cn } from "@/lib/utils";
import { CloudUploadIcon, ImageIcon, Loader2, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

export function RenderEmptyState({isDragActive}: {isDragActive: boolean}) {
    return (
        <div className="text-center">
            <div className="flex items-center justify-center mx-auto size-12 rounded-full bg-muted/50 mb-4">
                <CloudUploadIcon className={cn(
                    "size-6 text-muted-foreground",
                    isDragActive && "animate-bounce text-primary"
                )} />
            </div>
            <p className="text-base text-foreground font-semibold">Drag and drop your files here or <span className="text-primary font-bold cursor-pointer">Click to select a file</span></p>
            <Button type="button" className="mt-4">Select a file</Button>
        </div>
    );
}

export function RenderErrorState() {
    return (
        <div className="text-center">
            <div className="flex items-center justify-center mx-auto size-12 rounded-full bg-destructive/30 mb-4">
                <ImageIcon className={cn(
                    "size-6 text-destructive animate-bounce"
                )} />
            </div>
            <p className="text-base font-semibold">Upload Failed</p>
            <p className="text-xs mt-1 text-muted-foreground">Something went wrong</p>
            <Button type="button" className="mt-4">Retry filee selection</Button>
        </div>
    );
}

/*export function RenderUploadedState({previewUrl, isDeleting, handleRemoveFile }: {previewUrl: string, isDeleting: boolean, handleRemoveFile: () => void}) {
    return (
        <div>
            <Image src={previewUrl} alt="Uploaded file" fill className="object-contain p-2" />
            <Button type="button" variant="destructive" size="icon" className={cn("abssolute top-4 right-4")}
              onClick={handleRemoveFile}
              disabled={isDeleting} >
                {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <XIcon className="size-4" />}
            </Button>
        </div>
    );
}*/

export function RenderUploadedState({previewUrl, isDeleting, handleRemoveFile }: {previewUrl: string, isDeleting: boolean
  handleRemoveFile: () => void
}) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Thumbnail wrapper */}
      <div className="relative w-40 h-40 overflow-hidden rounded-lg border">
        <Image
          src={previewUrl}
          alt="Uploaded file"
          fill
          className="object-contain bg-muted"
        />
      </div>

      {/* Delete button in the top-right corner of upload box */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation() // 🧠 prevent click bubbling to dropzone
          handleRemoveFile()
        }}
        disabled={isDeleting}
        className={cn(
          "absolute top-3 right-3 z-10 flex items-center justify-center size-8 rounded-full bg-destructive text-white hover:bg-destructive/90 transition",
          isDeleting && "opacity-50 cursor-not-allowed"
        )}
      >
        {isDeleting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <XIcon className="size-4" />
        )}
      </button>
    </div>
  )
}


export function RenderUploadingState({progress, file}: {progress: number, file: File}) {
    return (
        <div className="text-center flex items-center justify-center flex-col gap-4">
            <p>{progress}</p>
            <p className="mt-2 text-sm font-medium text-foreground">Uploading... {progress}%</p>
            <p className="mt-1 text-xs text-muted-foreground truncate max-w-xs">{file.name}</p>
        </div>
    );
}