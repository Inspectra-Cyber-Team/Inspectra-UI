"use client"

import DropdownMenu from "@/components/DropDownDocs/DropDownComponent";
import React, { useState } from "react";
import { HiDocumentSearch } from "react-icons/hi";
import { AiOutlineMenu } from "react-icons/ai";
import { GoHomeFill } from "react-icons/go";
import Image from "next/image";
import imagePlaceholder from "../../../public/placeholder/placeholder.png";

type Document = {
  uuid: string;
  documentCategoryName: string;
  title: string;
  description: string;
  createdAt: string;
  documentImages: string[];
};

type DocumentCategory = {
  uuid: string;
  name: string;
  description: string;
  documents: Document[];
};

export default function Document() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState<DocumentCategory | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dynamically calculate breadcrumb
  const breadcrumbDisplay = [
    <GoHomeFill key="home" />,
    ...(selectedCategory ? [selectedCategory.name] : []),
    ...(selectedDocument ? [selectedDocument.title] : []),
  ];

  // Function to handle menu clicks
  const handleMenuClick = (category: DocumentCategory, document?: Document) => {
    setSelectedCategory(category);
    setSelectedDocument(document || null);
  };

  // Handle breadcrumb clicks
  const handleBreadcrumbClick = (index: number) => {
    if (index === 0) {
      setSelectedCategory(null);
      setSelectedDocument(null);
    } else if (index === 1) {
      setSelectedDocument(null);
    }
  };

  return (
    <main className="w-[90%] m-auto flex flex-col lg:flex-row">

      {/* Toggle Button for Small and Medium Screens */}
      <button
        className="lg:hidden fixed top-15 left-5 bg-blue-500 text-white p-2 rounded-full shadow-md z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <AiOutlineMenu size={16} />
      </button>

      {/* Sidebar Overlay */}
      <section
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          } lg:hidden`}
        onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking outside
      >
        <div className={`fixed top-0 left-0 w-3/5 max-w-xs bg-card_color_light h-full p-5 transition-transform duration-200 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
          onClick={(e) => e.stopPropagation()} >
          <div className="w-full max-w mx-auto mb-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-2.5 pl-10 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
                <HiDocumentSearch />
              </span>
            </div>
          </div>
          <DropdownMenu
            onMenuClick={(category, document) => {
              handleMenuClick(category, document); // Update content and breadcrumb

              // Close sidebar only if a document is selected
              if (document) {
                setIsSidebarOpen(false);
              }
            }} searchTerm={""} />
        </div>
      </section>

      {/* Sidebar for Larger Screens */}
      <section
        className={`hidden lg:block w-full lg:w-[30%] bg-card_color_light rounded h-auto p-5 my-10 dark:bg-card_color_dark`}
      >
        <div className="w-full max-w mx-auto mb-5">
          <div className="relative">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search..."
              className="w-full p-2.5 pl-10 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-400">
              <HiDocumentSearch />
            </span>
          </div>
        </div>
        <DropdownMenu searchTerm={searchTerm} onMenuClick={handleMenuClick} />
      </section>

      {/* Main Content */}
      <section
        className={`${isSidebarOpen ? "hidden" : "block"
          } lg:block w-full lg:w-[70%] bg-card_color_light rounded h-auto p-5 my-10 lg:ml-5 dark:bg-card_color_dark`}
      >
        {/* handle breadcrumb in the main content */}
        <nav className="mb-5 text-sm text-text_color_desc_light">
          {breadcrumbDisplay.map((crumb, index) => (
            <span key={index}>
              {index > 0 && " > "}
              <button
                className="hover:underline"
                onClick={() => handleBreadcrumbClick(index)}
              >
                {crumb}
              </button>
            </span>
          ))}
        </nav>

        {/* Display the content */}
        <div className="text-gray-700 dark:text-gray-300">
          {selectedDocument ? (
            <div>
              <h2 className="text-2xl font-bold">{selectedDocument.title}</h2>
              <p className="mt-3">{selectedDocument.description}</p>

              {/* Render images if they exist or show a placeholder */}
              <div className="w-[100%] mt-3 ">
                {selectedDocument.documentImages && selectedDocument.documentImages.length > 0 ? (
                  selectedDocument.documentImages.map((imageUrl, index) => (
                    <Image
                      unoptimized
                      height={100}
                      width={100}
                      key={index}
                      src={imageUrl ? imageUrl : imagePlaceholder}
                      alt={`${selectedDocument.title} Image ${index + 1}`}
                      className="w-full h-auto rounded shadow"
                      onError={(e) => (e.currentTarget.src = `${imagePlaceholder}`)}
                    />
                  ))
                ) : null}
              </div>
            </div>
          ) : selectedCategory ? (
            <div id="document">
              <h2 className="text-2xl font-bold mb-3">{selectedCategory.name}</h2>
              <ul className="mt-3">
                {selectedCategory.documents.map((doc) => (
                  <li key={doc.uuid} className="mt-1" >
                    <h2 className="text-2xl font-bold">
                      {doc.title}
                    </h2>
                    <p className="mt-3 mb-3">{doc.description}</p>

                    {/* Render images if they exist or show a placeholder */}
                    <div className="w-[100%] mt-5 mb-5">
                      {doc.documentImages && doc.documentImages.length > 0 ? (
                        doc.documentImages.map((imageUrl, index) => (
                          <Image
                            unoptimized
                            height={100}
                            width={100}
                            key={index}
                            src={imageUrl ? imageUrl : imagePlaceholder}
                            alt={`${doc.title} Image ${index + 1}`}
                            className="w-full h-auto rounded shadow"
                            onError={(e) => (e.currentTarget.src = `${imagePlaceholder}`)}
                          />
                        ))
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>

            </div>
          ) : (
            <div>
              <h2 className="text-lg lg:text-2xl font-bold">Welcome to Inspectra documents</h2>
              <p className="mt-3">Select a category or document to view its details.</p>
              <div className="w-[100%] mt-5 mb-5">
                <Image height={100}
                  width={100}
                  src={imagePlaceholder}
                  alt="Image"
                  className="w-full h-auto rounded shadow"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}


