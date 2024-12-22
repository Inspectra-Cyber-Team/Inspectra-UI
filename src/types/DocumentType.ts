// Define types for Document
export type Document = {
    uuid: string;
    documentCategoryName: string;
    title: string;
    description: string;
    createdAt: string;
    documentImages: string[];
}

//Define type for Document Category
export type DocumentCategory = {
    uuid: string;
    name: string;
    description: string;
    documents: Document[];
}

export type DropdownMenuProps = {
    categories?: DocumentCategory[];
    searchTerm?: string;
    onMenuClick: (categoryData: DocumentCategory, documentData?: Document) => void;
};

  