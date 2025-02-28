'use client';

import type { CardContainerProps } from './types';
import Image from 'next/image';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function CardContainer({ cards, title }: CardContainerProps) {
  return (
    <div className="w-full py-20 bg-primary/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
            Discover how our AI-powered platform revolutionizes brand verification
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {cards.map((card) => (
            <Card
              key={card.id}
              className="feature-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-primary/20"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={card.img}
                  alt={card.title}
                  width={500}
                  height={375}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-primary">{card.title}</CardTitle>
                <CardDescription>{card.sub}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 