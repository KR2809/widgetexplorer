import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plane, MapPin, Calendar, Star } from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center space-y-8">
          <Badge variant="secondary" className="mb-4">
            <Star className="w-3 h-3 mr-1" />
            Premium Travel Experiences
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance max-w-4xl">
            Discover Your Next
            <span className="text-primary block mt-2">Extraordinary Journey</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
            Curated travel experiences that transform ordinary trips into unforgettable adventures.
            Explore the world with confidence and style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button size="lg" className="text-base">
              <Plane className="mr-2 h-5 w-5" />
              Start Planning
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              Explore Destinations
            </Button>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Find Your Perfect Destination</CardTitle>
            <CardDescription>Search from thousands of curated travel experiences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Where to?" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input type="date" className="pl-9" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Travelers</label>
                <Input type="number" placeholder="2 adults" min="1" />
              </div>
            </div>
            <Button className="w-full mt-6">Search Experiences</Button>
          </CardContent>
        </Card>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Premium Travel</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience travel the way it was meant to be
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Plane className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Curated Experiences</CardTitle>
              <CardDescription>
                Hand-picked destinations and activities tailored to your preferences
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle>Expert Guidance</CardTitle>
              <CardDescription>Local experts and travel specialists available 24/7</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-accent/30 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-accent-foreground" />
              </div>
              <CardTitle>Premium Service</CardTitle>
              <CardDescription>
                Exclusive access to luxury accommodations and experiences
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
}
