'use client';

import { useState, useEffect } from 'react';
import { VotingItem } from '@/types';
import { getVotingItems } from '@/lib/voting-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { ArrowLeft, Trophy, TrendingUp } from 'lucide-react';

const categoryColors = {
  prosjekt: 'bg-[#015945] text-white',
  funksjonalitet: 'bg-[#02A67F] text-white',
  forbedring: 'bg-[#7BEFB2] text-[#015945]',
  annet: 'bg-[#C4F2DA] text-[#015945]',
};

const categoryLabels = {
  prosjekt: 'Prosjekt',
  funksjonalitet: 'Funksjonalitet',
  forbedring: 'Forbedring',
  annet: 'Annet',
};

export default function ResultsPage() {
  const [items, setItems] = useState<VotingItem[]>([]);
  const [maxVotes, setMaxVotes] = useState(0);

  useEffect(() => {
    const votingItems = getVotingItems();
    // Sort by votes descending
    const sorted = [...votingItems].sort((a, b) => b.votes - a.votes);
    setItems(sorted);
    setMaxVotes(sorted[0]?.votes || 0);
  }, []);

  const totalVotes = items.reduce((sum, item) => sum + item.votes, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F5F4] to-[#C4F2DA]">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-12">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6 gap-2 text-[#015945] hover:bg-[#C4F2DA]">
              <ArrowLeft className="h-4 w-4" />
              Tilbake til avstemming
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#015945] sm:text-5xl mb-4">
              Resultater
            </h1>
            <p className="text-lg text-[#247360] max-w-2xl mx-auto">
              Her ser du hva brukerne ønsker seg mest. Resultatene oppdateres i sanntid.
            </p>
          </div>
        </header>

        <Separator className="mb-8 bg-[#C4F2DA]" />

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totalt antall stemmer</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalVotes}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Antall forslag</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{items.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mest populære</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold truncate">{items[0]?.title || 'N/A'}</div>
              <p className="text-xs text-muted-foreground">{items[0]?.votes || 0} stemmer</p>
            </CardContent>
          </Card>
        </div>

        {/* Results list */}
        <div className="space-y-4">
          {items.map((item, index) => {
            const percentage = maxVotes > 0 ? (item.votes / maxVotes) * 100 : 0;

            return (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {index < 3 && (
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          index === 0 ? 'bg-[#015945] text-white' :
                          index === 1 ? 'bg-[#02A67F] text-white' :
                          'bg-[#7BEFB2] text-[#015945]'
                        } font-bold text-sm`}>
                          {index + 1}
                        </div>
                      )}
                      {index >= 3 && (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#C4F2DA] text-[#015945] font-medium text-sm">
                          {index + 1}
                        </div>
                      )}
                      <div className="flex-1">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription className="mt-1">{item.description}</CardDescription>
                      </div>
                    </div>
                    <Badge className={categoryColors[item.category]} variant="secondary">
                      {categoryLabels[item.category]}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.votes} stemmer</span>
                      <span className="text-muted-foreground">
                        {totalVotes > 0 ? Math.round((item.votes / totalVotes) * 100) : 0}% av totalt
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 text-[#247360]">
            Ingen stemmer registrert ennå.
          </div>
        )}
      </div>
    </div>
  );
}
