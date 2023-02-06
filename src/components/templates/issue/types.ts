export interface TIssues {
    issues : Array<Issue>
}

type Issue = {
    id: string,
    title: string,
    requirements: string,
    criteria: string,
    createdAt: string,
    updatedAt: string,
    authorId: string,
    author: string
}