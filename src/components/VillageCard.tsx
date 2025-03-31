
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export interface VillageProps {
  id: string;
  name: string;
  location: string;
  country: string;
  description: string;
  population: number;
  imageUrl: string;
  tags: string[];
}

interface VillageCardProps {
  village: VillageProps;
}

const VillageCard = ({ village }: VillageCardProps) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={village.imageUrl}
          alt={village.name}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{village.name}</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Add to favorites</span>
          </Button>
        </div>
        <CardDescription className="flex items-center gap-1 text-sm">
          <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
          {village.location}, {village.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{village.description}</p>
        <div className="flex items-center mt-3 text-sm text-muted-foreground">
          <Users className="h-4 w-4 mr-1" />
          <span>Population: {village.population.toLocaleString()}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
          {village.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/village/${village.id}`} className="w-full">
          <Button variant="outline" className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default VillageCard;
