export interface Ad {
    id: number;
    authorId?: number;
    category: string;
    title: string;
    description: string;
    dateAdded?: string;
    images: string[];
    comments: Comment[];
}

export interface Comment {
    id: number;
    username: string;
    text: string;
    dateAdded: string;
}
