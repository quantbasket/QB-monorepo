import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  User, 
  Upload, 
  MapPin, 
  Phone, 
  Mail, 
  Heart, 
  TrendingUp, 
  DollarSign,
  LogOut,
  Star,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone_number: string | null;
  location: string | null;
  avatar_url: string | null;
}

interface Coin {
  id: string;
  name: string;
  symbol: string;
  coin_type: 'coins' | 'impact_coins' | 'community_coins';
  description: string | null;
  price: number | null;
  market_cap: number | null;
}

interface UserFavorite {
  id: string;
  coin_id: string;
  coins: Coin;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [favorites, setFavorites] = useState<UserFavorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    location: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchProfile();
    fetchCoins();
    fetchFavorites();
  }, [user, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      
      setProfile(data);
      setFormData({
        full_name: data.full_name || '',
        phone_number: data.phone_number || '',
        location: data.location || ''
      });
    } catch (error: any) {
      if (error.code !== 'PGRST116') { // Not found error
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
      }
    }
  };

  const fetchCoins = async () => {
    try {
      const { data, error } = await supabase
        .from('coins')
        .select('*')
        .order('name');

      if (error) throw error;
      setCoins(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load coins",
        variant: "destructive",
      });
    }
  };

  const fetchFavorites = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select(`
          id,
          coin_id,
          coins (*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load favorites",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    if (!user) return;
    
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          full_name: formData.full_name,
          phone_number: formData.phone_number,
          location: formData.location
        });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      fetchProfile();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const toggleFavorite = async (coinId: string) => {
    if (!user) return;
    
    const isFavorited = favorites.some(fav => fav.coin_id === coinId);
    
    try {
      if (isFavorited) {
        const { error } = await supabase
          .from('user_favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('coin_id', coinId);
        
        if (error) throw error;
        
        toast({
          title: "Removed from favorites",
          description: "Coin removed from your favorites",
        });
      } else {
        const { error } = await supabase
          .from('user_favorites')
          .insert({
            user_id: user.id,
            coin_id: coinId
          });
        
        if (error) throw error;
        
        toast({
          title: "Added to favorites",
          description: "Coin added to your favorites",
        });
      }
      
      fetchFavorites();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getCoinsByType = (type: string) => {
    return coins.filter(coin => coin.coin_type === type);
  };

  const formatPrice = (price: number | null) => {
    if (!price) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatMarketCap = (marketCap: number | null) => {
    if (!marketCap) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(marketCap);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-qb-green mx-auto"></div>
          <p className="mt-4 text-qb-navy">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.avatar_url || ''} />
              <AvatarFallback>
                {profile?.full_name?.split(' ').map(n => n[0]).join('') || user?.email?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-qb-navy">
                Welcome, {profile?.full_name || user?.email}
              </h1>
              <p className="text-gray-600">Manage your portfolio and account settings</p>
            </div>
          </div>
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Regular Coins
                  </CardTitle>
                  <CardDescription>Traditional cryptocurrency investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {getCoinsByType('coins').slice(0, 3).map(coin => (
                      <div key={coin.id} className="flex justify-between items-center">
                        <span className="font-medium">{coin.symbol}</span>
                        <span className="text-sm text-gray-600">{formatPrice(coin.price)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Impact Coins
                  </CardTitle>
                  <CardDescription>Environmental and social impact investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {getCoinsByType('impact_coins').slice(0, 3).map(coin => (
                      <div key={coin.id} className="flex justify-between items-center">
                        <span className="font-medium">{coin.symbol}</span>
                        <span className="text-sm text-gray-600">{formatPrice(coin.price)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 mr-2" />
                    Community Coins
                  </CardTitle>
                  <CardDescription>Local community-focused investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {getCoinsByType('community_coins').slice(0, 3).map(coin => (
                      <div key={coin.id} className="flex justify-between items-center">
                        <span className="font-medium">{coin.symbol}</span>
                        <span className="text-sm text-gray-600">{formatPrice(coin.price)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Your Favorite Coins</CardTitle>
                <CardDescription>Coins you've marked as favorites</CardDescription>
              </CardHeader>
              <CardContent>
                {favorites.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No favorites yet. Explore coins and add them to your favorites!
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {favorites.map(favorite => (
                      <Card key={favorite.id} className="border border-gray-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold">{favorite.coins.name}</h3>
                              <Badge variant="outline">{favorite.coins.symbol}</Badge>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleFavorite(favorite.coin_id)}
                            >
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{favorite.coins.description}</p>
                          <div className="flex justify-between text-sm">
                            <span>Price: {formatPrice(favorite.coins.price)}</span>
                            <span>Market Cap: {formatMarketCap(favorite.coins.market_cap)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="explore">
            <div className="space-y-6">
              {(['coins', 'impact_coins', 'community_coins'] as const).map(type => (
                <Card key={type}>
                  <CardHeader>
                    <CardTitle>
                      {type === 'coins' && 'Regular Coins'}
                      {type === 'impact_coins' && 'Impact Coins'}
                      {type === 'community_coins' && 'Community Coins'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {getCoinsByType(type).map(coin => (
                        <Card key={coin.id} className="border border-gray-200">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold">{coin.name}</h3>
                                <Badge variant="outline">{coin.symbol}</Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleFavorite(coin.id)}
                              >
                                <Star 
                                  className={`w-4 h-4 ${
                                    favorites.some(fav => fav.coin_id === coin.id)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-400'
                                  }`}
                                />
                              </Button>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{coin.description}</p>
                            <div className="flex justify-between text-sm">
                              <span>Price: {formatPrice(coin.price)}</span>
                              <span>Market Cap: {formatMarketCap(coin.market_cap)}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={formData.full_name}
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone_number}
                      onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="Enter your location"
                    />
                  </div>
                  <Button 
                    onClick={updateProfile} 
                    disabled={updating}
                    variant="qbPrimary"
                  >
                    {updating ? "Updating..." : "Update Profile"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Avatar</CardTitle>
                  <CardDescription>Upload a profile picture</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profile?.avatar_url || ''} />
                      <AvatarFallback>
                        {profile?.full_name?.split(' ').map(n => n[0]).join('') || user?.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Avatar
                      </Button>
                      <p className="text-sm text-gray-500 mt-1">
                        JPG, PNG or GIF (max 2MB)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;