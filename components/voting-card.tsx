'use client';

import { VotingItem } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp } from 'lucide-react';

interface VotingCardProps {
  item: VotingItem;
  hasVoted: boolean;
  onVote: (itemId: string) => void;
}

const categoryColors = {
  prosjekt: 'bg-[#015945] text-white hover:bg-[#002920]',
  funksjonalitet: 'bg-[#02A67F] text-white hover:bg-[#247360]',
  forbedring: 'bg-[#7BEFB2] text-[#015945] hover:bg-[#C4F2DA]',
  annet: 'bg-[#C4F2DA] text-[#015945] hover:bg-[#F7F5F4]',
};

const categoryLabels = {
  prosjekt: 'Prosjekt',
  funksjonalitet: 'Funksjonalitet',
  forbedring: 'Forbedring',
  annet: 'Annet',
};

export function VotingCard({ item, hasVoted, onVote }: VotingCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl">{item.title}</CardTitle>
            <CardDescription className="mt-2">{item.description}</CardDescription>
          </div>
          <Badge className={categoryColors[item.category]} variant="secondary">
            {categoryLabels[item.category]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ThumbsUp className="h-4 w-4" />
            <span className="font-medium">{item.votes} stemmer</span>
          </div>
          <Button
            onClick={() => onVote(item.id)}
            disabled={hasVoted}
            variant={hasVoted ? 'secondary' : 'default'}
            size="sm"
          >
            {hasVoted ? 'Stemt' : 'Stem'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
