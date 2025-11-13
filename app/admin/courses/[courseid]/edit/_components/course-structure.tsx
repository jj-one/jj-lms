"use client";

import { AdminSingleCourseType } from "@/app/data/admin/admin-get-course";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { DndContext, DraggableSyntheticListeners, KeyboardSensor, PointerSensor, rectIntersection, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Collapsible } from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight, FileText, GripVertical, Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import { ReactNode, useState } from "react";

interface CourseStructureProps {
    data: AdminSingleCourseType
}

interface SortableItemsProps {
    id: string;
    children: (listeners: DraggableSyntheticListeners) => ReactNode;
    className?: string;
    data?: {
        type: "chapter" | "lesson",
        chapterId?: string,
    };
}

export function CourseStructure({ data }: CourseStructureProps) {

    const initialItems = data.chapters.map((chapter) => ({
        id: chapter.id,
        title: chapter.title,
        order: chapter.position,
        isOpen: true,

        lessions: chapter.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            order: lesson.position,
        }))
    })) || [];

    const [items, setItems] = useState(initialItems);

    function SortableItem({id, children, data, className}: SortableItemsProps) {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
            isDragging,
        } = useSortable({id: id, data: data});
        
        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };
        
        return (
            <div ref={setNodeRef} style={style} {...attributes} className={cn("touch-none", className, isDragging ? "z-10" : "")}>
                {children(listeners)}
            </div>
        );
    }

    function handleDragEnd(event: any) {
        const {active, over} = event;
        
        if (active.id !== over.id) {
        setItems((items) => {
            const oldIndex = items.indexOf(active.id);
            const newIndex = items.indexOf(over.id);
            
            return arrayMove(items, oldIndex, newIndex);
        });
        }
    }

    function toggleChapter(chapterId: string) {
        setItems(items.map((chapter) => chapter.id === chapterId ? {...chapter, isOpen: !chapter.isOpen} : chapter));
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    return (
        <DndContext collisionDetection={rectIntersection} onDragEnd={handleDragEnd} sensors={sensors}>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between border-bottom border-r-border">
                    <CardTitle>Chapters</CardTitle>
                </CardHeader>

                <CardContent>
                    <SortableContext items={items} strategy={verticalListSortingStrategy}>
                        {items.map((item) => (
                            <SortableItem key={item.id} id={item.id} data={{type: "chapter"}}>
                                {(listeners) => (
                                    <Card>
                                        <Collapsible open={item.isOpen} onOpenChange={() => toggleChapter(item.id)}>
                                            <div className="flex items-center justify-between p-3 border-b border-border">
                                                <div className="flex items-center gap-3">
                                                    <Button size="icon" variant="ghost" {...listeners}>
                                                        <GripVertical className="size-4" />
                                                    </Button>
                                                    <CollapsibleTrigger asChild>
                                                        <Button size="icon" variant="ghost">
                                                            {item.isOpen ? (
                                                                <ChevronDown className="size-4" />
                                                            ) : (
                                                                <ChevronRight className="size-4" />
                                                            )}
                                                        </Button>
                                                    </CollapsibleTrigger>

                                                    <p className="cursor-pointer hover:text-primary pl-2">
                                                        {item.title}
                                                    </p>
                                                </div>

                                                <Button size="icon" variant="destructive">
                                                    <Trash2 className="size-4" />
                                                </Button>
                                            </div>

                                            <CollapsibleContent>
                                                <div className="p-1">
                                                    <SortableContext items={item.lessions.map((lesson) => lesson.id)}
                                                        strategy={verticalListSortingStrategy}>
                                                        {item.lessions.map((lesson) => (
                                                            <SortableItem key={lesson.id} id={lesson.id} data={{type: "lesson", chapterId: item.id}}>
                                                                {(lessonListeners) => (
                                                                    <div className="flex items-center justify-between p-2 hover:bg-accent rounded-sm">
                                                                        <div className="flex items-center gap-2">
                                                                            <Button size="icon" variant="ghost" {...lessonListeners}>
                                                                                <GripVertical className="size-4" />
                                                                            </Button>
                                                                            <FileText className="size-4" />

                                                                            <Link href={`/admin/courses/${data.id}/${item.id}/${lesson.id}`}>
                                                                                {lesson.title}
                                                                            </Link>
                                                                        </div>

                                                                        <Button size="icon" variant="destructive">
                                                                            <Trash className="size-4" />
                                                                        </Button>
                                                                    </div>
                                                                )}
                                                            </SortableItem>
                                                        ))}
                                                    </SortableContext>

                                                    <div className="p-2">
                                                        <Button variant="outline" className="w-full">
                                                            Create New Lesson
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    </Card>
                                )}
                            </SortableItem>
                            ))}
                    </SortableContext>
                </CardContent>
            </Card>
        </DndContext>
    );
}