export interface ILessonCreateDto {
    title:string;
    description:string;
    authorId:string;
    courseId: string;
    videoUrl?:string;
    pdfUrl?:string;
}

export type LessonUpdateDto= Partial<ILessonCreateDto>;
