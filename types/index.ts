export type Category = 'prosjekt' | 'funksjonalitet' | 'forbedring' | 'annet';

export interface VotingItem {
  id: string;
  title: string;
  description: string;
  category: Category;
  votes: number;
  createdAt: string;
}

export interface UserVote {
  itemId: string;
  votedAt: string;
}
