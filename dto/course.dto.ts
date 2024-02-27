export interface ICourseCreateDto {
    title:string;
    description:string;
    price?:string;
    duration?: string;
    authorId: string
}

export type CourseUpdateDto= Partial<ICourseCreateDto>;
