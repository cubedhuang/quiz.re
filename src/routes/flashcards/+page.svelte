<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { fade, fly, type TransitionConfig } from 'svelte/transition';
	import { Icon } from '@steeze-ui/svelte-icon';
	import {
		ArrowPath,
		ChevronLeft,
		ChevronRight,
		Star
	} from '@steeze-ui/heroicons';

	import { cards, starredCards } from '$lib/stores';

	import Button from '$lib/components/Button.svelte';
	import Key from '$lib/components/Key.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import SubHeader from '$lib/components/SubHeader.svelte';

	const defaultFlipState = false;

	let currentCard = 0;
	let flipped = defaultFlipState;

	const enum FlashcardAction {
		Flip,
		Next,
		Previous
	}

	let lastAction = FlashcardAction.Flip;

	const keyHandlers: Record<string, () => void> = {
		Space: flipCard,
		ArrowLeft: previousCard,
		ArrowRight: nextCard,
		ArrowUp: () => starCard(true),
		ArrowDown: () => starCard(false)
	};

	function handleKey(event: KeyboardEvent) {
		if (keyHandlers[event.code]) {
			event.preventDefault();
			keyHandlers[event.code]();
		}
	}

	function nextCard() {
		if (currentCard < $cards.length - 1) {
			currentCard++;
			flipped = defaultFlipState;
			lastAction = FlashcardAction.Next;
		}
	}

	function previousCard() {
		if (currentCard > 0) {
			currentCard--;
			flipped = defaultFlipState;
			lastAction = FlashcardAction.Previous;
		}
	}

	function flipCard() {
		flipped = !flipped;
		lastAction = FlashcardAction.Flip;
	}

	function starCard(value?: boolean) {
		$cards[currentCard].starred =
			value === undefined ? !$cards[currentCard].starred : value;
	}

	const turnTransition: TransitionConfig = {
		delay: 0,
		easing: cubicOut,
		duration: 400,
		css: t => `
			transform-origin: center;
			transform: rotateX(${t * 180 + 180}deg);
			${t < 0.5 ? 'color: transparent' : 'color: white'};
		`
	};

	function dynamicTransition(node: HTMLElement): TransitionConfig {
		return lastAction === FlashcardAction.Flip
			? turnTransition
			: fly(node, {
					x: lastAction === FlashcardAction.Next ? 24 : -24,
					opacity: 0.8
			  });
	}
</script>

<svelte:window on:keydown={handleKey} />

<PageHeader>Flashcards</PageHeader>

{#if !$cards.length}
	<p>You need to have cards to use this!</p>
{:else}
	<div class="relative mb-8 flex flex-col gap-1 [perspective:1600px]">
		{#key [currentCard, flipped]}
			<div
				in:dynamicTransition
				on:click={flipCard}
				class="flex-1 min-h-[24em] relative flex flex-col items-center justify-center bg-emerald-600 text-white rounded p-4 cursor-pointer"
			>
				<p class="flex-1 flex items-center text-4xl font-bold w-fit">
					{#if flipped}
						{$cards[currentCard].back}
					{:else}
						{$cards[currentCard].front}
					{/if}
				</p>

				<div class="w-full flex gap-1">
					{#if currentCard > 0}
						<button
							on:click={previousCard}
							type="button"
							class="flex-1 flex justify-center p-1 border-2 border-current rounded hover:bg-white hover:text-emerald-600 hover:border-white transition-colors"
						>
							<Icon src={ChevronLeft} class="w-6 h-6" />
						</button>
					{/if}

					{#if currentCard < $cards.length - 1}
						<button
							on:click={nextCard}
							type="button"
							class="flex-1 flex justify-center p-1 border-2 border-current rounded hover:bg-white hover:text-emerald-600 hover:border-white transition-colors"
						>
							<Icon src={ChevronRight} class="w-6 h-6" />
						</button>
					{/if}
				</div>

				{#key $cards[currentCard].starred}
					<button
						on:click|stopPropagation={() => starCard()}
						class="absolute top-4 left-4 text-white hover:opacity-80 transition-opacity"
						transition:fade|local={{ duration: 100 }}
					>
						<Icon
							src={Star}
							class="w-6 h-6"
							theme={$cards[currentCard].starred ? 'solid' : 'outline'}
						/>
					</button>
				{/key}

				<p class="absolute top-4 right-4 text-sm">
					{currentCard + 1}/{$cards.length}
					{flipped ? 'back' : 'front'}
				</p>
			</div>
		{/key}
	</div>
{/if}

<SectionHeader>Settings</SectionHeader>

<div class="grid lg:grid-cols-2">
	<div>
		<SubHeader>Starred Cards ({$starredCards.length})</SubHeader>

		{#if !$starredCards.length}
			<p>You have no starred cards.</p>
		{:else}
			<ul class="flex flex-col gap-1">
				{#each $starredCards as card}
					<li class="flex items-center gap-1">
						<Icon src={Star} class="w-6 h-6" />
						{card.front}
					</li>
				{/each}
			</ul>
		{/if}

		<div class="mt-2 flex gap-2">
			<Button
				on:click={() => {
					cards.set($cards.map(card => ({ ...card, starred: false })));
				}}
				icon={ArrowPath}>Reset Starred Cards</Button
			>
		</div>
	</div>

	<div>
		<SubHeader>Keybinds</SubHeader>

		<ul>
			<li><Key>Click</Key> or <Key>Space</Key> to flip card!</li>
			<li><Key>&rarr;</Key> Next card.</li>
			<li><Key>&larr;</Key> Previous card.</li>
			<li><Key>&uarr;</Key> Star current card.</li>
			<li><Key>&darr;</Key> Unstar current card.</li>
		</ul>
	</div>
</div>
