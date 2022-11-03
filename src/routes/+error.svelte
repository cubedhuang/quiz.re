<script lang="ts">
	import { page } from '$app/stores';

	import SectionHeader from '$lib/components/SectionHeader.svelte';
</script>

<SectionHeader>{$page.status}</SectionHeader>

<p>
	{$page.error?.message}
</p>
