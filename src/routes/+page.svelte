<script lang="ts">
	import {
		AcademicCap,
		ArrowDownTray,
		QuestionMarkCircle,
		RectangleStack
	} from '@steeze-ui/heroicons';

	import { cards, type Card } from '$lib/stores';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Button from '$lib/components/Button.svelte';
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	let importingCards = '';
	let importError = '';

	function loadCards() {
		const newCards: Card[] = [];

		const lines = importingCards.split('\n');

		for (const line of lines) {
			const [front, back] = line.split('\t');

			if (!back) {
				if (newCards.length) {
					newCards[newCards.length - 1].back += `\n${front}`;
				} else {
					importError = 'Invalid card format!';
					return;
				}
			}

			newCards.push({
				id: Math.random().toString(36).slice(2),
				front,
				back,
				starred: false
			});
		}

		importError = '';

		$cards = newCards;
	}
</script>

<PageHeader>quiz.re Home</PageHeader>

<SectionHeader>Import Cards</SectionHeader>

<form on:submit|preventDefault={loadCards}>
	<div>
		<textarea
			bind:value={importingCards}
			placeholder="Copy the Quizlet exports into here..."
			class="w-full h-40 p-2 border-2 border-emerald-600 rounded focus:outline-none focus:border-emerald-500 transition-colors"
		/>
	</div>

	<div class="flex items-center gap-4 justify-between">
		<div class="flex items-center gap-2">
			<Button type="submit" icon={ArrowDownTray}>Import</Button>

			{#if importError}
				<p class="text-red-500">{importError}</p>
			{/if}
		</div>

		<ButtonLink href="/how" icon={QuestionMarkCircle}>
			How do I import cards?
		</ButtonLink>
	</div>
</form>

<SectionHeader>Study</SectionHeader>

<div class="flex gap-2">
	<ButtonLink href="/learn" icon={AcademicCap}>Learn</ButtonLink>
	<ButtonLink href="/flashcards" icon={RectangleStack}>Flashcards</ButtonLink>
</div>

<SectionHeader>Your Cards ({$cards.length})</SectionHeader>

<div class="flex flex-col gap-4">
	{#each $cards as card}
		<div class="flex items-center rounded bg-emerald-600 text-white">
			<div class="flex-1 p-4">
				{card.front}
			</div>
			<div class="flex-1 p-4 border-l">
				{card.back}
			</div>
		</div>
	{/each}
</div>
