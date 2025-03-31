
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, Users, Calendar, Globe, ArrowLeft, 
  Heart, Share2, MessageSquare, Star, Clock, MapIcon, Thermometer 
} from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { getVillageById, villages, VillageProps } from "@/data/villagesData";

const VillageDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [village, setVillage] = useState<VillageProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Simulate API fetch
    const fetchVillage = async () => {
      try {
        // Short delay to simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (id) {
          const villageData = getVillageById(id);
          if (villageData) {
            setVillage(villageData);
          } else {
            toast.error("Village not found");
            navigate("/villages");
          }
        }
      } catch (error) {
        toast.error("Failed to load village details");
      } finally {
        setLoading(false);
      }
    };

    fetchVillage();
  }, [id, navigate]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Visit ${village?.name} on VillageHub`,
        text: `Check out ${village?.name} in ${village?.location}, ${village?.country} on VillageHub!`,
        url: window.location.href,
      }).catch(() => {
        // Fallback if share fails
        toast.success("Link copied to clipboard");
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  // Simulated related villages
  const relatedVillages = villages
    .filter(v => v.id !== id && (
      v.country === village?.country || 
      v.tags.some(tag => village?.tags.includes(tag))
    ))
    .slice(0, 3);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-[400px] bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-10 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!village) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Village Not Found</h1>
          <p className="mb-6">The village you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/villages")}>Browse All Villages</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            className="mb-4 flex items-center gap-1"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          
          {/* Hero section */}
          <div className="relative h-[500px] rounded-xl overflow-hidden mb-8">
            <img 
              src={village.imageUrl} 
              alt={village.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{village.name}</h1>
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="h-5 w-5" />
                <span>{village.location}, {village.country}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {village.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-card shadow-sm rounded-lg p-6 mb-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">About {village.name}</h2>
                    <div className="flex items-center text-muted-foreground mt-1">
                      <Users className="h-4 w-4 mr-1" />
                      <span className="mr-4">Population: {village.population.toLocaleString()}</span>
                      <Globe className="h-4 w-4 mr-1" />
                      <span>{village.country}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={toggleFavorite}
                      className={isFavorite ? "text-red-500" : ""}
                    >
                      <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {village.description}
                </p>
                
                <hr className="my-6" />
                
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="attractions">Attractions</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-muted p-4 rounded-lg">
                        <h3 className="font-medium flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          Best Time to Visit
                        </h3>
                        <p className="text-sm mt-2 text-muted-foreground">
                          The ideal months to visit {village.name} are from May to September when 
                          the weather is pleasant and all attractions are open.
                        </p>
                      </div>
                      
                      <div className="bg-muted p-4 rounded-lg">
                        <h3 className="font-medium flex items-center gap-2">
                          <MapIcon className="h-4 w-4 text-primary" />
                          Getting There
                        </h3>
                        <p className="text-sm mt-2 text-muted-foreground">
                          The nearest major airport is 45km away. Regular bus services connect 
                          the village to nearby towns and cities.
                        </p>
                      </div>
                      
                      <div className="bg-muted p-4 rounded-lg">
                        <h3 className="font-medium flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-primary" />
                          Climate
                        </h3>
                        <p className="text-sm mt-2 text-muted-foreground">
                          {village.name} has a moderate climate with warm summers and cool winters.
                          Average summer temperature is 25°C and winter is around 5°C.
                        </p>
                      </div>
                      
                      <div className="bg-muted p-4 rounded-lg">
                        <h3 className="font-medium flex items-center gap-2">
                          <Star className="h-4 w-4 text-primary" />
                          Local Specialties
                        </h3>
                        <p className="text-sm mt-2 text-muted-foreground">
                          Don't miss trying the local cuisine, especially the traditional dishes 
                          that have been passed down through generations.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="attractions" className="mt-4">
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        {village.name} offers a variety of attractions for visitors to explore:
                      </p>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>Historic town center with traditional architecture</li>
                        <li>Local craft workshops where you can see artisans at work</li>
                        <li>Scenic hiking trails offering panoramic views</li>
                        <li>Local museum showcasing the village's cultural heritage</li>
                        <li>Traditional marketplace with local products</li>
                      </ul>
                      <p className="text-sm italic">
                        Note: Attraction details are provided as examples. Visit the village's official 
                        tourism website for up-to-date information.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history" className="mt-4">
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        {village.name} has a rich history dating back several centuries. The village was 
                        founded around the 12th century and has preserved much of its historical character.
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-medium">Key Historical Events:</h4>
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                          <li>12th Century: First settlements established in the area</li>
                          <li>15th Century: Development of local crafts and trade</li>
                          <li>18th Century: Major architectural developments</li>
                          <li>20th Century: Recognition as a cultural heritage site</li>
                        </ul>
                      </div>
                      <p className="text-sm italic">
                        Note: Historical information is provided as examples. For accurate historical 
                        details, consult local historical resources.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Reviews section */}
              <div className="bg-card shadow-sm rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Visitor Reviews</h2>
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-lg font-medium">4.8</span>
                  <span className="text-muted-foreground">(124 reviews)</span>
                </div>
                
                <div className="space-y-4 mb-6">
                  {/* Sample reviews */}
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">Sarah Johnson</div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 text-yellow-400" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Visited {village.name} last summer and was blown away by its beauty. 
                      The locals were so welcoming and the traditional architecture was stunning.
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">June 2023</div>
                  </div>
                  
                  <div className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">David Miller</div>
                      <div className="flex">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} className="h-4 w-4 text-yellow-400" fill="currentColor" />
                        ))}
                        <Star className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      A truly authentic experience. The hiking trails around the village offer 
                      breathtaking views. Only downside was the limited public transportation.
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">August 2023</div>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full" onClick={() => toast.info("Sign in to leave a review")}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Write a Review
                </Button>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Map placeholder */}
              <div className="bg-card shadow-sm rounded-lg overflow-hidden">
                <div className="h-60 bg-muted flex items-center justify-center">
                  <MapIcon className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-2">Location</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {village.name} is located in {village.location}, {village.country}.
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => toast.info("Map functionality coming soon")}>
                    View on Map
                  </Button>
                </div>
              </div>
              
              {/* Weather */}
              <div className="bg-card shadow-sm rounded-lg p-4">
                <h3 className="font-medium mb-3">Current Weather</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500">
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                    <div className="ml-3">
                      <div className="text-2xl font-bold">22°C</div>
                      <div className="text-sm text-muted-foreground">Sunny</div>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div>Humidity: 65%</div>
                    <div>Wind: 5 km/h</div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t grid grid-cols-4 gap-2 text-center text-sm">
                  <div>
                    <div className="font-medium">Mon</div>
                    <div>20°C</div>
                  </div>
                  <div>
                    <div className="font-medium">Tue</div>
                    <div>22°C</div>
                  </div>
                  <div>
                    <div className="font-medium">Wed</div>
                    <div>19°C</div>
                  </div>
                  <div>
                    <div className="font-medium">Thu</div>
                    <div>21°C</div>
                  </div>
                </div>
              </div>
              
              {/* Related villages */}
              <div className="bg-card shadow-sm rounded-lg p-4">
                <h3 className="font-medium mb-3">Similar Villages</h3>
                <div className="space-y-3">
                  {relatedVillages.map((relatedVillage) => (
                    <div key={relatedVillage.id} className="flex items-start gap-3">
                      <img 
                        src={relatedVillage.imageUrl} 
                        alt={relatedVillage.name} 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{relatedVillage.name}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {relatedVillage.location}, {relatedVillage.country}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {relatedVillage.tags.slice(0, 2).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="link" 
                  className="w-full mt-2 text-primary"
                  onClick={() => navigate('/villages')}
                >
                  View all villages
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VillageDetails;
