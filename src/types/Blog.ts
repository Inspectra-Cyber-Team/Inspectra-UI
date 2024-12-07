// Define the User type
type User = {
    uuid: string;
    firstName: string;
    lastName: string;
    profile: string ;
    bio: string;
  };
  
  // Define the Content type
export  type Blog = {
    uuid: string;
    title: string;
    likesCount: number;
    viewsCount: number;
    countComments: number;
    isVerified: boolean;
    description: string;
    thumbnail: string[]; // Array of URLs
    user: User; // Nested User type
    createdAt: string; // ISO date string
    lastModifiedAt: string; // ISO date string
  };

export type Reply = {
    uuid: string;
    content: string;
    createdAt: string; // ISO date string
    countLikes: number;
    user: User;
}

// Main Content Interface
export type Content = {
    uuid: string;
    content: string;
    countLikes: number;
    createdAt: string;
    user: User;
    replies: Reply[];
}