import { SearchResults } from '@/components/search/search-results';
import { StickySearchBar } from '@/components/search/sticky-search-bar';

export default function SearchPage({
  searchParams
}: {
  searchParams?: { q?: string; type?: string }
}) {
  const query = searchParams?.q || '';
  const type = searchParams?.type || '';
  
  return (
    <div className="min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Academic Search</h1>
        
        {!query && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-medium mb-4">Search for scholarly articles and research</h2>
            <p className="text-muted-foreground mb-4">
              Enter a topic, research area, or specific question to discover relevant academic resources.
            </p>
            <p className="text-sm text-muted-foreground">
              Example searches: &quot;climate change effects on coral reefs&quot;, &quot;quantum computing applications&quot;,
              &quot;early childhood development theories&quot;
            </p>
          </div>
        )}
        
        <SearchResults query={query} selectedType={type} />
      </div>
      
      <StickySearchBar initialQuery={query} />
    </div>
  );
}