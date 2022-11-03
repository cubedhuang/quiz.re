<script lang="ts">
	import type { IconSource } from '@steeze-ui/svelte-icon/types';

	import Button from './Button.svelte';

	export let href: string;
	export let target: string | undefined = undefined;
	export let icon: IconSource | undefined = undefined;

	let className = '';

	export { className as class };
</script>

<a {href} {target} rel="noopener noreferrer" class="contents">
	<Button class={className} {icon}>
		<slot />
	</Button>
</a>
