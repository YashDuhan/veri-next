'use client';

import type { FeatureCard, CardContainerProps } from './types.d';

export default function CardContainer({ cards, title, bgcolor }: CardContainerProps) {
  return (
    <div className="w-full py-20" style={{ backgroundColor: bgcolor }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
            Discover how our AI-powered platform revolutionizes brand verification
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {cards.map((card) => (
            <div 
              key={card.id}
              className="group relative bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-t-2xl">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6" style={{ backgroundColor: card.bgColor }}>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-6">
                  {card.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 