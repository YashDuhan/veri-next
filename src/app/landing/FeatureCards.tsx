'use client';

import type { FeatureCard } from './types';
import CardContainer from './CardContainer';

const cards: FeatureCard[] = [
  {
    img: '/images/FeatureCard1.jpg',
    title: "AI Label Verification",
    sub: "Say goodbye to misleading food labels! Verify brand claims with accuracy and confidence.",
    bgColor: "#ffffff",
    id: 1,
  },
  {
    img: '/images/FeatureCard2.jpg',
    title: "Smart & Reliable Results",
    sub: "Say goodbye to misleading food labels! Verify brand claims with accuracy and confidence.",
    bgColor: "#ffffff",
    id: 2,
  },
  {
    img: '/images/FeatureCard3.jpg',
    title: "Make Informed Choices",
    sub: "Shop smarter and healthier with transparent product information.",
    bgColor: "#ffffff",
    id: 3,
  },
  {
    img: '/images/FeatureCard4.jpg',
    title: "Multi-Input Support",
    sub: "Verify claims using text input, images, or URLs for convenience.",
    bgColor: "#ffffff",
    id: 4,
  },
];

export default function FeatureCards() {
  return <CardContainer cards={cards} title="Features" />;
} 