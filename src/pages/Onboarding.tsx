import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Upload, Camera, User } from 'lucide-react';
import heyniaIcon from '@/assets/heynia-icon.png';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={heyniaIcon} alt="HeyNia" className="w-16 h-16 rounded-xl" />
          </div>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i <= step ? 'bg-green-600' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-center">Personal Information</h3>
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
              <h3 className="text-lg font-semibold text-center">Profile Picture</h3>
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={profile.avatar_url} />
                  <AvatarFallback className="text-2xl">
                    <User className="w-16 h-16" />
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
                    <Button variant="outline" className="flex items-center gap-2" disabled={loading}>
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
              <h3 className="text-lg font-semibold text-center">Clinic Information</h3>
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
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">What you'll get with HeyNia:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• AI-powered patient management</li>
                  <li>• Automated appointment scheduling</li>
                  <li>• Performance analytics and insights</li>
                  <li>• Secure patient data management</li>
                  <li>• Treatment tracking and billing</li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1 || loading}
            >
              Back
            </Button>
            
            {step < 3 ? (
              <Button
                onClick={handleNext}
                className="bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                className="bg-green-600 hover:bg-green-700"
                disabled={loading}
              >
                {loading ? 'Setting up...' : 'Complete Setup'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;