<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import type { IconSource } from '@steeze-ui/svelte-icon/types';

	export let type = 'button';
	export let icon: IconSource | undefined = undefined;

	let className = '';

	export { className as class };
</script>

<button
	on:click
	{type}
	class="flex items-center gap-2 border-2 border-emerald-600 text-emerald-600 px-2 py-1 rounded focus:outline-none hover:bg-emerald-600 hover:text-white transition-colors {className}"
>
	{#if icon}
		<Icon src={icon} theme="mini" class="w-4 h-4" />
	{/if}

	<span>
		<slot />
	</span>
</button>
