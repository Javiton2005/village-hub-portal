
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";
import VillageCard from "@/components/VillageCard";
import { villages } from "@/data/villagesData";
import { Search, MapPin, Map, Globe, Users, Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const featuredVillages = villages.slice(0, 4);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/90 to-accent/90 text-white py-20">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1516870332782-58bdd413a38e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
            alt="Village landscape"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Beautiful Villages Around the World</h1>
            <p className="text-lg mb-8">
              Explore unique communities, connect with locals, and experience the charm of village life.
            </p>
            <form onSubmit={handleSearch} className="max-w-md mx-auto relative">
              <Input
                type="search"
                placeholder="Search for a village..."
                className="w-full pl-10 pr-20 py-6 text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <Button type="submit" className="h-10">
                  Explore
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Use VillageHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Hidden Gems</h3>
              <p className="text-muted-foreground">Find beautiful villages off the beaten path that tourists often miss.</p>
            </div>
            
            <div className="bg-background rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Map className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Plan Your Visits</h3>
              <p className="text-muted-foreground">Get detailed information to help you plan your perfect village getaway.</p>
            </div>
            
            <div className="bg-background rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Community</h3>
              <p className="text-muted-foreground">Connect with village enthusiasts from around the world.</p>
            </div>
            
            <div className="bg-background rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-primary/10 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Support Local Culture</h3>
              <p className="text-muted-foreground">Help preserve the unique traditions and lifestyles of villages worldwide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Villages Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Villages</h2>
            <Button variant="outline" onClick={() => navigate('/villages')}>View All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVillages.map((village) => (
              <VillageCard key={village.id} village={village} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Next Destination?</h2>
            <p className="text-lg mb-8 text-muted-foreground">
              Join our community of village enthusiasts and start exploring today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => navigate('/register')}>
                Sign Up Now
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/villages')}>
                Browse Villages
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
