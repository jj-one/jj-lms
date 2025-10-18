"use client"

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface SubmitButtonProps {
    statusStr: {
        pendStr: string;
        subStr: string;
        fit: string
    }
}

export function SubmitButton({ statusStr }: SubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className={`${statusStr.fit}`}>
            {pending ? statusStr.pendStr : statusStr.subStr}
        </Button>
    )
}