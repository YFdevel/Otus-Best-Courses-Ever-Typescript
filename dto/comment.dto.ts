export interface ICommentCreateDto {
    title:string;
    message:string;
    authorId:string;
    lessonId:string;
    courseId:string;
}

export type CommentUpdateDto= Partial<ICommentCreateDto>;
