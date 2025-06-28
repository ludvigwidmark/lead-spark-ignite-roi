
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import ClyoLogo from '@/components/ClyoLogo';

interface AuthForm {
  email: string;
  password: string;
}

const Landing = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const form = useForm<AuthForm>({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onSubmit'
  });

  const handleSubmit = async (data: AuthForm) => {
    console.log('Form submitted with data:', data);
    
    // Validate that we have both email and password
    if (!data.email || !data.password) {
      toast({
        title: "Validation Error",
        description: "Please provide both email and password.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      if (isSignUp) {
        console.log('Attempting signup...');
        const { error } = await signUp(data.email, data.password);
        
        if (error) {
          console.error('Signup error:', error);
          toast({
            title: "Sign Up Failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Account Created",
            description: "Please check your email to verify your account.",
          });
          form.reset();
        }
      } else {
        console.log('Attempting signin...');
        const { error } = await signIn(data.email, data.password);
        
        if (error) {
          console.error('Signin error:', error);
          toast({
            title: "Login Failed",
            description: error.message,
            variant: "destructive"
          });
        }
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
    
    setLoading(false);
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    form.reset(); // Clear the form when switching modes
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <ClyoLogo size="lg" className="text-black dark:text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white">Clyo</h1>
            <p className="text-titanium-600 dark:text-titanium-400 mt-2">
              AI-Powered Lead Management Platform
            </p>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="border-titanium-300 dark:border-titanium-600">
          <CardHeader>
            <CardTitle className="text-center text-black dark:text-white">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </CardTitle>
            <CardDescription className="text-center text-titanium-600 dark:text-titanium-400">
              {isSignUp 
                ? 'Sign up to start managing your leads with AI' 
                : 'Welcome back! Please sign in to continue'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black dark:text-white">Email</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email" 
                          placeholder="Enter your email" 
                          autoComplete="email"
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black dark:text-white">Password</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="password" 
                          placeholder={isSignUp ? "Create a password" : "Enter your password"}
                          autoComplete={isSignUp ? "new-password" : "current-password"}
                          disabled={loading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? (isSignUp ? 'Creating Account...' : 'Signing In...') : (isSignUp ? 'Create Account' : 'Sign In')}
                </Button>
              </form>
            </Form>

            {/* Toggle between login and signup */}
            <div className="mt-6 text-center">
              <Button
                variant="link"
                onClick={toggleMode}
                className="text-titanium-600 dark:text-titanium-400 hover:text-black dark:hover:text-white"
                disabled={loading}
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : "Don't have an account? Sign up"
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Landing;
