'use client';

import { useState, useEffect } from 'react';
import { VotingItem, Category } from '@/types';
import { getVotingItems, getUserVotes, addVote } from '@/lib/voting-data';
import { VotingCard } from '@/components/voting-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { BarChart3 } from 'lucide-react';

export default function Home() {
  const [items, setItems] = useState<VotingItem[]>([]);
  const [userVotes, setUserVotes] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<Category | 'alle'>('alle');

  useEffect(() => {
    // Load data on client side
    const votingItems = getVotingItems();
    const votes = getUserVotes();
    setItems(votingItems);
    setUserVotes(new Set(votes.map(v => v.itemId)));
  }, []);

  const handleVote = (itemId: string) => {
    addVote(itemId);
    setUserVotes(prev => new Set([...prev, itemId]));
    setItems(getVotingItems());
  };

  const filteredItems = selectedCategory === 'alle'
    ? items
    : items.filter(item => item.category === selectedCategory);

  const categories: Array<{ value: Category | 'alle'; label: string }> = [
    { value: 'alle', label: 'Alle' },
    { value: 'prosjekt', label: 'Prosjekter' },
    { value: 'funksjonalitet', label: 'Funksjonalitet' },
    { value: 'forbedring', label: 'Forbedringer' },
    { value: 'annet', label: 'Annet' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F5F4] to-[#C4F2DA]">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[#015945] sm:text-5xl mb-4">
            Avstemming
          </h1>
          <p className="text-lg text-[#247360] max-w-2xl mx-auto">
            Stem på prosjekter og funksjonalitet du ønsker å se i plattformen.
            Din stemme hjelper oss å prioritere hva vi skal jobbe med.
          </p>
          <div className="mt-6">
            <Link href="/resultater">
              <Button variant="outline" size="lg" className="gap-2 border-[#015945] text-[#015945] hover:bg-[#015945] hover:text-white">
                <BarChart3 className="h-4 w-4" />
                Se resultater
              </Button>
            </Link>
          </div>
        </header>

        <Separator className="mb-8 bg-[#C4F2DA]" />

        {/* Category filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(cat => (
              <Badge
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                  selectedCategory === cat.value
                    ? 'bg-[#015945] text-white hover:bg-[#002920]'
                    : 'bg-white text-[#015945] hover:bg-[#C4F2DA] border border-[#C4F2DA]'
                }`}
                variant="outline"
              >
                {cat.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Voting items grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredItems.map(item => (
            <VotingCard
              key={item.id}
              item={item}
              hasVoted={userVotes.has(item.id)}
              onVote={handleVote}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-[#247360]">
            Ingen items i denne kategorien ennå.
          </div>
        )}
      </div>
    </div>
  );
}
