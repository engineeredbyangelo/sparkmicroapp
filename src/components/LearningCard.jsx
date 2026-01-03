import React from 'react';
import HeroCard from './cards/HeroCard';
import TextFocusedCard from './cards/TextFocusedCard';
import ComparisonCard from './cards/ComparisonCard';
import StatHighlightCard from './cards/StatHighlightCard';
import QuoteCard from './cards/QuoteCard';
import TimelineCard from './cards/TimelineCard';
import QuizCard from './cards/QuizCard';
import CompletionCard from './cards/CompletionCard';

const LearningCard = ({ card }) => {
  switch (card.type) {
    case 'hero':
      return <HeroCard card={card} />;
    case 'text-focused':
      return <TextFocusedCard card={card} />;
    case 'comparison':
      return <ComparisonCard card={card} />;
    case 'stat-highlight':
      return <StatHighlightCard card={card} />;
    case 'quote':
      return <QuoteCard card={card} />;
    case 'timeline':
      return <TimelineCard card={card} />;
    case 'interactive-quiz':
      return <QuizCard card={card} />;
    case 'completion':
      return <CompletionCard card={card} />;
    default:
      return <TextFocusedCard card={card} />;
  }
};

export default LearningCard;
