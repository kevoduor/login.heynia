import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Upload, Camera, User } from 'lucide-react';
import heyniaIcon from '@/assets/heynia-icon.png';
import onboarding1 from '@/assets/onboarding-1.png';
import onboarding2 from '@/assets/onboarding-2.png';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    phone: '',
    clinic_name: '',
    avatar_url: ''
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }

      // Get existing profile data
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          phone: data.phone || '',
          clinic_name: data.clinic_name || '',
          avatar_url: data.avatar_url || ''
        });
      }
    };

    getProfile();
  }, [navigate]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${session.user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      setProfile(prev => ({ ...prev, avatar_url: publicUrl }));

      toast({
        title: "Success!",
        description: "Profile picture uploaded successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Upload Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
          clinic_name: profile.clinic_name,
          avatar_url: profile.avatar_url,
          onboarding_completed: true
        })
        .eq('user_id', session.user.id);

      if (error) throw error;

      toast({
        title: "Welcome to HeyNia!",
        description: "Your profile has been set up successfully.",
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundImage = () => {
    switch (step) {
      case 2:
        return onboarding1;
      case 3:
        return onboarding2;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Dynamic Background */}
      {step > 1 && (
        <div 
          className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
          style={{
            backgroundImage: `url(${getBackgroundImage()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
          <div className="relative z-10 flex items-start justify-start p-8">
            <div className="flex items-center space-x-3">
              <img src={heyniaIcon} alt="HeyNia" className="w-8 h-8" />
              <span className="text-2xl font-bold text-white drop-shadow-lg">HeyNia</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Right Panel - Form */}
      <div className={`${step > 1 ? 'lg:w-1/2' : 'w-full'} flex items-center justify-center p-8 bg-background`}>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-4">
            {step === 1 && (
              <div className="flex items-center justify-center space-x-3 mb-4">
                <img src={heyniaIcon} alt="HeyNia" className="w-8 h-8" />
                <span className="text-2xl font-bold">HeyNia</span>
              </div>
            )}
            <CardTitle className="text-2xl font-bold">
              {step === 1 && 'Welcome to HeyNia'}
              {step === 2 && 'Complete Your Profile'}
              {step === 3 && 'Clinic Information'}
            </CardTitle>
            <p className="text-muted-foreground">
              {step === 1 && 'Let\'s set up your profile to get you started with premium dental practice management'}
              {step === 2 && 'Add a professional photo to personalize your experience'}
              {step === 3 && 'Tell us about your dental practice'}
            </p>
            <Progress value={(step / 3) * 100} className="w-full" />
          </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={profile.full_name}
                onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                placeholder="Enter your full name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
                className="mt-1"
              />
            </div>
          </div>
          )}

          {step === 2 && (
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-32 h-32 border-4 border-primary/20">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback className="text-2xl bg-primary/10">
                  <User className="w-16 h-16 text-primary" />
                </AvatarFallback>
              </Avatar>
              
              <div className="flex gap-4">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={loading}
                  />
                  <Button variant="glassy" className="flex items-center gap-2" disabled={loading}>
                    <Upload className="w-4 h-4" />
                    Upload Photo
                  </Button>
                </label>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Upload a professional photo or we'll use your Google profile picture if available
              </p>
            </div>
          </div>
          )}

          {step === 3 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="clinicName">Clinic Name</Label>
              <Input
                id="clinicName"
                value={profile.clinic_name}
                onChange={(e) => setProfile(prev => ({ ...prev, clinic_name: e.target.value }))}
                placeholder="Enter your clinic name"
                className="mt-1"
              />
            </div>
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border border-primary/20">
              <h4 className="font-semibold mb-3 text-primary">Premium Features Included:</h4>
              <ul className="text-sm space-y-2 text-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  AI-powered patient management & insights
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Automated appointment scheduling & reminders  
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Advanced performance analytics & reporting
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Secure patient data management & HIPAA compliance
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Treatment tracking & integrated billing
                </li>
              </ul>
            </div>
          </div>
          )}

          <div className="flex justify-between pt-6">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={loading}
              >
                Back
              </Button>
            )}
            
            {step < 3 ? (
              <Button
                variant="glassy"
                onClick={handleNext}
                disabled={loading || (step === 1 && (!profile.full_name || !profile.phone))}
                className={step === 1 ? 'w-full' : 'ml-auto'}
              >
                Next Step
              </Button>
            ) : (
              <Button
                variant="glassy"
                onClick={handleComplete}
                disabled={loading || !profile.clinic_name}
                className="ml-auto"
              >
                {loading ? 'Setting up...' : 'Complete Setup'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
  );
};

export default Onboarding;