"use client";

import React, { useState } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ExploreCard from './ExploreCard';
import ExploreCardExpanded from './ExploreCardExpanded';
import productsData from './data.json';
import { AnimatePresence } from 'framer-motion';

export default function Explore() {
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);

  // Find the expanded product data
  const expandedProductData = expandedProduct 
    ? productsData.products.find(product => product.id === expandedProduct) 
    : null;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6 bg-primary/10 border-0">
          <CardHeader>
            <CardTitle className="text-3xl">Explore Products</CardTitle>
            <CardDescription className="text-base">
              Discover new products and see what others are verifying.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productsData.products.map((product) => (
            <ExploreCard
              key={product.id}
              title={product.title}
              brand={product.brand}
              images={product.images}
              onExpand={() => setExpandedProduct(product.id)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {expandedProductData && (
          <ExploreCardExpanded
            title={expandedProductData.title}
            brand={expandedProductData.brand}
            images={expandedProductData.images}
            overview={expandedProductData.overview}
            nutrition={expandedProductData.nutrition}
            ingredients={expandedProductData.ingredients}
            claims={expandedProductData.claims}
            personalizedOverview={expandedProductData.personalizedOverview}
            suitability={expandedProductData.suitability}
            safeConsumption={expandedProductData.safeConsumption}
            nutrientHighlights={expandedProductData.nutrientHighlights}
            matchScore={expandedProductData.matchScore}
            onClose={() => setExpandedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 