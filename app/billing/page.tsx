'use client';

import { useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, annual: 0 },
    description: 'Basic academic search for students and casual researchers.',
    features: [
      'Basic search functionality',
      '10 searches per day',
      'Basic article information',
      'Web-based access only',
    ],
    buttonText: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: { monthly: 19, annual: 190 },
    description: 'Enhanced features for serious researchers and academics.',
    features: [
      'Everything in Free',
      'Unlimited searches',
      'AI-generated summaries',
      'Citation export',
      'Mobile app access',
    ],
    buttonText: 'Subscribe to Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: { monthly: 49, annual: 490 },
    description: 'Complete solution for institutions and research teams.',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'API access',
      'Custom integrations',
      'Priority support',
      'Admin dashboard',
    ],
    buttonText: 'Contact Sales',
    popular: false,
  },
];

export default function BillingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const handleSubscribe = (plan: string) => {
    // In a real app, this would trigger Stripe checkout
    toast({
      title: "Subscription",
      description: `You selected the ${plan} plan. Stripe integration coming soon.`,
    });
  };
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-6">Pricing Plans</h1>
        <p className="text-lg text-muted-foreground mb-10">
          Choose the right plan for your research needs. All plans include our core search functionality.
        </p>
        
        <div className="flex items-center justify-center space-x-4">
          <span className={!isAnnual ? "font-medium" : "text-muted-foreground"}>Monthly</span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
          />
          <span className={isAnnual ? "font-medium" : "text-muted-foreground"}>
            Annual <span className="text-xs text-primary">(Save 20%)</span>
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.name} 
            className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg relative' : ''}`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="mt-4">
                <span className="text-4xl font-bold">
                  ${isAnnual ? plan.price.annual : plan.price.monthly}
                </span>
                {plan.price.monthly > 0 && (
                  <span className="text-muted-foreground ml-2">
                    / {isAnnual ? 'year' : 'month'}
                  </span>
                )}
              </div>
              <CardDescription className="mt-4">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-primary flex-shrink-0 mr-3" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleSubscribe(plan.name)}
                className="w-full" 
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="mt-20 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Need a custom plan?</h2>
        <p className="text-muted-foreground mb-6">
          We offer tailored solutions for institutions, libraries, and large research teams.
          Contact our sales team to discuss your specific requirements.
        </p>
        <Button variant="outline" size="lg">
          Contact Sales
        </Button>
      </div>
    </div>
  );
}