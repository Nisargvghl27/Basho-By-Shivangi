// "use client";

// import React, { createContext, useContext, useState } from 'react';

// export const SearchContext = createContext();

// export const SearchProvider = ({ children }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);

//   const performSearch = async (query) => {
//     setSearchQuery(query);
//     setIsSearching(true);
    
//     try {
//       // Add your search logic here
//       // For now, setting empty results
//       setSearchResults([]);
//     } catch (error) {
//       console.error('Search error:', error);
//       setSearchResults([]);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const clearSearch = () => {
//     setSearchQuery('');
//     setSearchResults([]);
//     setIsSearching(false);
//   };

//   return (
//     <SearchContext.Provider
//       value={{
//         searchQuery,
//         searchResults,
//         isSearching,
//         performSearch,
//         clearSearch,
//         setSearchQuery,
//       }}
//     >
//       {children}
//     </SearchContext.Provider>
//   );
// };

// export const useSearch = () => {
//   const context = useContext(SearchContext);
//   if (!context) {
//     throw new Error('useSearch must be used within a SearchProvider');
//   }
//   return context;
// };
"use client";

import React, { createContext, useContext, useState } from 'react';
import { generateSearchTags } from '../lib/gemini'; 

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [semanticKeywords, setSemanticKeywords] = useState([]); // Store AI keywords
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (query) => {
    setSearchQuery(query);
    setSemanticKeywords([]); // Reset previous AI results
    
    if (!query.trim()) return;

    setIsSearching(true);
    
    try {
      // 1. Basic check: if query is short (e.g., "mug"), no need for AI.
      // 2. If query is complex (e.g., "gift for a sad friend"), use AI.
      if (query.split(' ').length > 2) {
        console.log("Creating vibe search for:", query);
        const aiKeywords = await generateSearchTags(query);
        console.log("AI suggested keywords:", aiKeywords);
        setSemanticKeywords(aiKeywords);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSemanticKeywords([]);
    setIsSearching(false);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        semanticKeywords, // Expose this to the UI
        isSearching,
        performSearch,
        clearSearch,
        setSearchQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};