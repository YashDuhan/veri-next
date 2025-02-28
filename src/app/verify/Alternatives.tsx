import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { AlertCircle, CheckCircle2, Info, Star, ShoppingBag, Award, Package } from "lucide-react";
import { AlternativeProduct } from '@/app/integration/integration-types';

interface AlternativesProps {
  alternatives: AlternativeProduct[];
}

interface AlternativeCardProps {
  alternative: AlternativeProduct;
}

const AlternativeCard = ({ alternative }: AlternativeCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-full">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 rounded-md overflow-hidden bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-base">{alternative.product_name}</h3>
                <p className="text-sm text-muted-foreground">{alternative.brand}</p>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="text-xs mr-2">
                    {alternative.trust_score}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{alternative.user_reviews}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{alternative.product_name}</DialogTitle>
          <DialogDescription>{alternative.brand}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                Description
              </h4>
              <p className="text-sm">{alternative.description}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                Health Benefits
              </h4>
              <p className="text-sm">{alternative.health_benefits}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                Ingredient Comparison
              </h4>
              <p className="text-sm">{alternative.ingredient_comparison}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Award className="h-4 w-4 text-primary" />
                Certifications
              </h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {alternative.certifications.map((cert, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Trust Score
                </h4>
                <p className="text-sm font-bold">{alternative.trust_score}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  User Reviews
                </h4>
                <p className="text-sm">{alternative.user_reviews}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-primary" />
                Price Range
              </h4>
              <p className="text-sm">{alternative.price_range}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-primary" />
                Availability
              </h4>
              <p className="text-sm">{alternative.availability}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function Alternatives({ alternatives }: AlternativesProps) {
  if (!alternatives || alternatives.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Healthier Alternatives</CardTitle>
        <CardDescription>
          Consider these healthier alternatives with better ingredients and higher trust scores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {alternatives.map((alternative, index) => (
            <AlternativeCard key={index} alternative={alternative} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
