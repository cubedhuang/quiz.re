<script lang="ts">
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
</script>

<PageHeader>How do I import cards?</PageHeader>

<ol
	class="mb-4 marker:text-4xl marker:text-emerald-600 marker:font-bold list-decimal list-inside"
>
	<li>Find a Quizlet that you want to import.</li>
	<li>
		Export data from the Quizlet using this dropdown.
		<div class="mt-2 ml-10 mr-4 w-full max-w-xl">
			<img
				src="/step2.png"
				alt="The export option on a Quizlet page"
				class="w-full rounded"
			/>
		</div>
	</li>
	<li>
		Copy the exported text into the import box on the home page.
		<div class="mt-2 ml-10 mr-4 w-full max-w-xl">
			<img
				src="/step3.png"
				alt="The copy button on the export page"
				class="w-full rounded"
			/>
		</div>
	</li>
	<li>Done! Your cards should now be imported.</li>
</ol>

<ButtonLink href="/">Home</ButtonLink>
