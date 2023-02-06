export type TIssue = {
    id: string,
    title: string,
    requirements: string,
    criteria: string,
    createdAt: string,
    updatedAt: string,
    authorId: string,
    author: string
    categories: TCategory[],
}

export type TCategory = {
    id: number;
    name: string;
}