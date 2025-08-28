import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import type { Content } from "@shared/schema";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: searchResults, isLoading } = useQuery<Content[]>({
    queryKey: ["/api/search", query],
    queryFn: () => fetch(`/api/search?q=${encodeURIComponent(query)}`).then(res => res.json()),
    enabled: query.length > 2,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Handle search logic here
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSearch} className="relative">
        <Input
          type="text"
          placeholder="Pesquisar conteúdo..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.length > 2);
          }}
          className="bg-muted border-border rounded-lg pl-10 pr-4 py-2 w-full focus:ring-2 focus:ring-ring focus:border-transparent"
          data-testid="input-search"
        />
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      </form>

      {/* Search Results Dropdown */}
      {isOpen && query.length > 2 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground" data-testid="text-searching">
              Buscando...
            </div>
          ) : searchResults && searchResults.length > 0 ? (
            <div className="max-h-64 overflow-y-auto">
              {searchResults.map((content) => (
                <Link
                  key={content.id}
                  href={`/content/${content.id}`}
                  className="block p-3 hover:bg-muted transition-colors border-b border-border last:border-b-0"
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  data-testid={`link-search-result-${content.id}`}
                >
                  <div className="flex items-center space-x-3">
                    <img 
                      src={content.poster || ''} 
                      alt={content.title} 
                      className="w-10 h-14 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium text-foreground">{content.title}</h4>
                      <p className="text-sm text-muted-foreground capitalize">{content.type} • {content.year}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground" data-testid="text-no-results">
              Nenhum resultado encontrado
            </div>
          )}
        </div>
      )}
    </div>
  );
}
