"use client"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { useGetAllDocumentCategoriesQuery } from "@/redux/service/document";
import { Document, DocumentCategory, DropdownMenuProps } from "@/types/DocumentType";

export default function DropdownMenu({categories, searchTerm = "" ,onMenuClick, }: DropdownMenuProps) {
    const { data: documentData } = useGetAllDocumentCategoriesQuery({});
    const documentCategoryResult = categories || documentData?.data || [];

    // Filter categories based on the search term
      const filteredCategories = documentCategoryResult?.map((category: DocumentCategory) => ({
        ...category,
        documents: category.documents.filter(
          (doc) =>
            doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.description.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      })).filter((category: DocumentCategory) => category.documents.length > 0);
    return (
        <Accordion type="single" collapsible>
            {
            filteredCategories.length > 0 ? (
                filteredCategories?.map((category: DocumentCategory) => (
                <AccordionItem key={category.uuid} value={category.uuid} className="p-1">
                    <AccordionTrigger className="text-[18px] leading-4" onClick={() => onMenuClick(category)}>
                        {category.name}
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul className="ml-2 leading-9 text-text_body_16 text-text_color_desc_light">
                            {category?.documents?.map((item: Document) => (         
                                <li
                                    key={item?.uuid}
                                    className="hover:text-text_color_light flex items-center cursor-pointer transition ease-in-out delay-150 hover:border-l-2 p-2"
                                    onClick={() => onMenuClick(category, item)}
                                >
                                    {item?.title}
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            ))
            ) : (
                <div className="text-center text-text_color_desc_light">No documents found</div>
            )
            }
        </Accordion>
    )
}

