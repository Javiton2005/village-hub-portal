
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search as SearchIcon, Filter, X } from "lucide-react";
import { searchVillages } from "@/data/villagesData";
import VillageCard, { VillageProps } from "@/components/VillageCard";
import Layout from "@/components/Layout";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState<VillageProps[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    country: "all",
    tags: [] as string[],
    populationRange: [0, 15000]
  });

  const allCountries = ["Austria", "Greece", "Japan", "United Kingdom", "Italy", "Netherlands", "Norway"];
  const allTags = ["Alpine", "Lakeside", "Historical", "UNESCO", "Coastal", "Scenic", "Mediterranean", 
                  "Island", "Traditional", "Mountain", "Countryside", "Quaint", "Colorful", "Waterways", 
                  "Peaceful", "Car-free", "Arctic", "Fishing", "Unique", "Trulli"];

  useEffect(() => {
    // Initial search when component mounts
    if (initialQuery) {
      const initialResults = searchVillages(initialQuery);
      setResults(initialResults);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update URL query parameter
    setSearchParams({ q: searchQuery });
    
    // Perform search
    const searchResults = searchVillages(searchQuery);
    setResults(searchResults);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const applyFilters = () => {
    // Start with the base search results
    let filteredResults = searchVillages(searchQuery);
    
    // Apply country filter
    if (filters.country !== "all") {
      filteredResults = filteredResults.filter(village => 
        village.country === filters.country
      );
    }
    
    // Apply tags filter
    if (filters.tags.length > 0) {
      filteredResults = filteredResults.filter(village => 
        filters.tags.some(tag => village.tags.includes(tag))
      );
    }
    
    // Apply population range filter
    filteredResults = filteredResults.filter(village => 
      village.population >= filters.populationRange[0] && 
      village.population <= filters.populationRange[1]
    );
    
    setResults(filteredResults);
  };

  const handleTagToggle = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag) 
        : [...prev.tags, tag]
    }));
  };

  const clearFilters = () => {
    setFilters({
      country: "all",
      tags: [],
      populationRange: [0, 15000]
    });
    
    // Re-run the search with just the query
    const searchResults = searchVillages(searchQuery);
    setResults(searchResults);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Search Villages</h1>
        
        {/* Search form */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search villages, locations, or features..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
          
          <Button variant="outline" onClick={toggleFilter} className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        
        {/* Filters panel */}
        {isFilterOpen && (
          <div className="bg-muted/30 border rounded-lg p-4 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filter Results</h2>
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                Clear All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Country filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Country</label>
                <Select
                  value={filters.country}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, country: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {allCountries.map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Population range filter */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Population: {filters.populationRange[0]} - {filters.populationRange[1]}
                </label>
                <Slider
                  value={filters.populationRange}
                  min={0}
                  max={15000}
                  step={100}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, populationRange: value as [number, number] }))}
                  className="py-4"
                />
              </div>
              
              {/* Apply filters button */}
              <div className="flex items-end">
                <Button onClick={applyFilters} className="w-full">Apply Filters</Button>
              </div>
            </div>
            
            {/* Tags filter */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Features & Characteristics</label>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <Badge 
                    key={tag}
                    variant={filters.tags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                    {filters.tags.includes(tag) && (
                      <X className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Search results */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {results.length} {results.length === 1 ? 'Result' : 'Results'} 
            {initialQuery && ` for "${initialQuery}"`}
          </h2>
          
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map(village => (
                <VillageCard key={village.id} village={village} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-medium mb-2">No villages found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <Button variant="outline" onClick={clearFilters}>Clear All Filters</Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
