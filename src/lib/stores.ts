import { browser } from '$app/environment';
import { derived, writable } from 'svelte/store';

export interface Card {
	id: string;
	front: string;
	back: string;
	starred: boolean;
}

const storedCards = browser ? localStorage.getItem('cards') : null;

export const cards = writable<Card[]>(
	storedCards ? JSON.parse(storedCards) : []
);

export const starredCards = derived(cards, $cards =>
	$cards.filter(card => card.starred)
);

if (browser) {
	cards.subscribe(cards => {
		localStorage.setItem('cards', JSON.stringify(cards));
	});
}
