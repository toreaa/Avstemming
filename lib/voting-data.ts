import { VotingItem, UserVote } from '@/types';

const VOTING_ITEMS_KEY = 'voting-items';
const USER_VOTES_KEY = 'user-votes';

// Initial data med eksempler for IT-bedrift
export const initialVotingItems: VotingItem[] = [
  {
    id: '1',
    title: 'Mørk modus i hele plattformen',
    description: 'Implementer dark mode for å redusere øyebelastning ved langt arbeid',
    category: 'funksjonalitet',
    votes: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Mobilapp for iOS og Android',
    description: 'Utvikle native mobilapp for bedre tilgjengelighet på farten',
    category: 'prosjekt',
    votes: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Slack-integrasjon',
    description: 'Automatiske notifikasjoner og oppdateringer direkte i Slack',
    category: 'funksjonalitet',
    votes: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Forbedret søkefunksjon',
    description: 'Mer avansert søk med filtre og autocomplete',
    category: 'forbedring',
    votes: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'API for tredjeparts integrasjoner',
    description: 'Åpent API for å koble til eksterne systemer',
    category: 'prosjekt',
    votes: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Eksport til Excel/CSV',
    description: 'Mulighet for å eksportere data til regneark',
    category: 'funksjonalitet',
    votes: 0,
    createdAt: new Date().toISOString(),
  },
];

// Hent voting items fra localStorage
export function getVotingItems(): VotingItem[] {
  if (typeof window === 'undefined') return initialVotingItems;

  const stored = localStorage.getItem(VOTING_ITEMS_KEY);
  if (!stored) {
    // First time - initialize with default data
    localStorage.setItem(VOTING_ITEMS_KEY, JSON.stringify(initialVotingItems));
    return initialVotingItems;
  }
  return JSON.parse(stored);
}

// Lagre voting items til localStorage
export function saveVotingItems(items: VotingItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(VOTING_ITEMS_KEY, JSON.stringify(items));
}

// Hent brukerens stemmer
export function getUserVotes(): UserVote[] {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(USER_VOTES_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
}

// Sjekk om bruker har stemt på en item
export function hasUserVoted(itemId: string): boolean {
  const votes = getUserVotes();
  return votes.some(vote => vote.itemId === itemId);
}

// Legg til en stemme
export function addVote(itemId: string): void {
  if (typeof window === 'undefined') return;

  // Check if already voted
  if (hasUserVoted(itemId)) return;

  // Add user vote
  const votes = getUserVotes();
  votes.push({ itemId, votedAt: new Date().toISOString() });
  localStorage.setItem(USER_VOTES_KEY, JSON.stringify(votes));

  // Increment vote count
  const items = getVotingItems();
  const item = items.find(i => i.id === itemId);
  if (item) {
    item.votes += 1;
    saveVotingItems(items);
  }
}

// Fjern en stemme (hvis bruker vil angre)
export function removeVote(itemId: string): void {
  if (typeof window === 'undefined') return;

  // Check if voted
  if (!hasUserVoted(itemId)) return;

  // Remove user vote
  const votes = getUserVotes();
  const filtered = votes.filter(vote => vote.itemId !== itemId);
  localStorage.setItem(USER_VOTES_KEY, JSON.stringify(filtered));

  // Decrement vote count
  const items = getVotingItems();
  const item = items.find(i => i.id === itemId);
  if (item && item.votes > 0) {
    item.votes -= 1;
    saveVotingItems(items);
  }
}

// Reset all data (for testing)
export function resetAllData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(VOTING_ITEMS_KEY);
  localStorage.removeItem(USER_VOTES_KEY);
}
