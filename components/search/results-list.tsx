'use client';

import { useState, useEffect } from 'react';
import { ResultCard, SearchResult } from './result-card';
import { searchWithGemini } from '@/lib/gemini-service';

interface ResultsListProps {
  query: string;
}

export function ResultsList({ query }: ResultsListProps) {
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      
      try {
        // Use the Gemini API service to get search results
        const searchResults = await searchWithGemini(query);
        setResults(searchResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
        // If there's an error, the service will return mock data
      } finally {
        setLoading(false);
      }
    };
    
    if (query) {
      fetchResults();
    }
  }, [query]);
  
  if (!query) {
    return null;
  }
  
  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-2xl font-semibold">
        {loading ? 'Searching...' : `Results for "${query}"`}
      </h2>
      
      {loading ? (
        <div className="grid grid-cols-1 gap-4 mt-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-[200px] rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {results.map(result => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>
      )}
    </div>
  );
}