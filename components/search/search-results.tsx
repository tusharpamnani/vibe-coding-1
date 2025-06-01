'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { searchWithGemini, GeminiSearchResult } from '@/lib/gemini-service';

// Use the GeminiSearchResult interface from our service
type SearchResult = GeminiSearchResult;

const contentTypes = [
  { value: 'all', label: 'All' },
  { value: 'pdf', label: 'PDF' },
  { value: 'ppt', label: 'PPT' },
  { value: 'docx', label: 'DOCX' },
  { value: 'image', label: 'Images' },
  { value: 'video', label: 'Videos' },
];

interface SearchResultsProps {
  query: string;
  selectedType: string;
}

export function SearchResults({ query, selectedType }: SearchResultsProps) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeType, setActiveType] = useState(selectedType || 'all');
  const router = useRouter();

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

  const handleTypeChange = (value: string) => {
    setActiveType(value);
    router.push(`/search?q=${query}&type=${value}`);
  };

  if (!query) return null;

  const filteredResults = activeType === 'all' 
    ? results 
    : results.filter(result => {
        if (activeType === 'video') return result.type === 'video';
        if (activeType === 'image') return result.type === 'image';
        return result.fileType?.toLowerCase() === activeType;
      });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {loading ? 'Searching...' : `Results for "${query}"`}
        </h2>
        
        <Tabs value={activeType} onValueChange={handleTypeChange}>
          <TabsList>
            {contentTypes.map(type => (
              <TabsTrigger key={type.value} value={type.value}>
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      {loading ? (
        <div className="grid gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-[200px] rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredResults.map(result => (
            <Card key={result.id} className="p-6">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">{result.title}</h3>
                  <p className="text-muted-foreground">{result.summary}</p>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{result.source}</Badge>
                    <Badge variant="outline">{result.type}</Badge>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <Button asChild variant="outline">
                    <a href={result.url} target="_blank" rel="noopener noreferrer">
                      View Source
                    </a>
                  </Button>
                  
                  {result.downloadUrl && (
                    <Button asChild>
                      <a href={result.downloadUrl} download>
                        <Download className="h-4 w-4 mr-2" />
                        Download {result.fileType}
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}