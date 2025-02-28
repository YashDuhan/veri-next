export interface FeatureCard {
  img: string;
  title: string;
  sub: string;
  bgColor: string;
  id: number;
}

export interface CardContainerProps {
  cards: FeatureCard[];
  title: string;
} 