export interface IReviewCreateDto {
    title:string;
    message:string;
    authorId:string;
    courseId:string;
}

export type ReviewUpdateDto= Partial<IReviewCreateDto>;
