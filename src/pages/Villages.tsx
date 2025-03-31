
import { useState, useEffect } from "react";
import { villages } from "@/data/villagesData";
import VillageCard from "@/components/VillageCard";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, MapPin, Filter, X, CheckCircle2, 
  TriangleAlert, SlidersHorizontal 
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const Villages = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("alphabetical");
  const [filteredVillages, setFilteredVillages] = useState(villages);

  const allTags: string[] = [];
  const allCountries: string[] = [];
  
  villages.forEach(village => {
    if (!allCountries.includes(village.country)) {
      allCountries.push(village.country);
    }
    
    village.tags.forEach(tag => {
      if (!allTags.includes(tag)) {
        allTags.push(tag);
      }
    });
  });
  
  // Sort countries and tags alphabetically
  allCountries.sort();
  allTags.sort();

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedTags, selectedCountry, sortBy]);

  const applyFilters = () => {
    let result = [...villages];
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(village => 
        village.name.toLowerCase().includes(query) ||
        village.location.toLowerCase().includes(query) ||
        village.country.toLowerCase().includes(query) ||
        village.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      result = result.filter(village => 
        selectedTags.some(tag => village.tags.includes(tag))
      );
    }
    
    // Filter by selected country
    if (selectedCountry !== "all") {
      result = result.filter(village => village.country === selectedCountry);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "alphabetical":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "population_high":
        result.sort((a, b) => b.population - a.population);
        break;
      case "population_low":
        result.sort((a, b) => a.population - b.population);
        break;
      default:
        break;
    }
    
    setFilteredVillages(result);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSelectedCountry("all");
    setSortBy("alphabetical");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Explore Villages</h1>
        <p className="text-muted-foreground mb-8">
          Discover beautiful villages from around the world, each with their own unique charm and history.
        </p>
        
        {/* Filter and search section */}
        <div className="bg-muted/30 rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search villages..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {allCountries.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alphabetical">A-Z</SelectItem>
                <SelectItem value="population_high">Population (High to Low)</SelectItem>
                <SelectItem value="population_low">Population (Low to High)</SelectItem>
              </SelectContent>
            </Select>
            
            {(searchQuery || selectedTags.length > 0 || selectedCountry !== "all" || sortBy !== "alphabetical") && (
              <Button variant="ghost" onClick={clearFilters} className="w-full md:w-auto">
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>
          
          {/* Tags section */}
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Filter className="h-4 w-4 mr-1" />
              Filter by Features:
            </h3>
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <Badge 
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleTagToggle(tag)}
                >
                  {selectedTags.includes(tag) && (
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                  )}
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        {/* Results section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {filteredVillages.length} {filteredVillages.length === 1 ? 'Village' : 'Villages'} Found
            </h2>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <SlidersHorizontal className="h-4 w-4" />
              Sorted by: {sortBy.replace('_', ' ').replace(/^\w/, c => c.toUpperCase())}
            </div>
          </div>
          
          {filteredVillages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVillages.map(village => (
                <VillageCard key={village.id} village={village} />
              ))}
            </div>
          ) : (
            <div className="bg-muted/30 rounded-lg p-8 text-center">
              <TriangleAlert className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Villages Found</h3>
              <p className="text-muted-foreground mb-6">
                Your current filters did not match any villages. Try adjusting your search criteria.
              </p>
              <Button onClick={clearFilters}>Reset All Filters</Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Villages;
