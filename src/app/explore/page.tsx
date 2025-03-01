"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ExploreCard from './ExploreCard';
import ExploreCardExpanded from './ExploreCardExpanded';
import { getExploreProducts } from '@/app/integration/integration-core';
import { ExploreProduct } from '@/app/integration/integration-types';
import { AnimatePresence } from 'framer-motion';

export default function Explore() {
  const [expandedProduct, setExpandedProduct] = useState<number | null>(null);
  const [products, setProducts] = useState<ExploreProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsData = await getExploreProducts();
        setProducts(productsData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Find the expanded product data
  const expandedProductData = expandedProduct 
    ? products.find(product => product.id === expandedProduct) 
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

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ExploreCard
                key={product.id}
                title={product.title}
                brand={product.brand}
                images={product.images}
                onExpand={() => setExpandedProduct(product.id)}
              />
            ))}
          </div>
        )}
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