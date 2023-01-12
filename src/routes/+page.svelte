<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>FIFA WordCup Matches | @cuevatnt</title>
</svelte:head>

<section class="mx-auto">
	<h1 class="font-bold text-2xl mb-4 text-center">¡Argentina Campeón!</h1>
	<p class="text-center mb-6">
		All the matches of the Fifa World Cup sourced from the <a
			class="font-bold"
			href="https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?limit=100&dates=20221011-20221227"
			>ESPN API</a
		>
	</p>

	<div class="">
		{#each data.matches as match, i}
			<div class={'flex items-center py-2 ' + (i !== 0 ? 'border-t' : 'text-blue-700')}>
				<span class="tabular-nums w-16"
					>{new Date(match.date).getMonth() +
						', ' +
						('0' + new Date(match.date).getDate()).slice(-2)}</span
				>
				<span class="w-64">{match.stadium}</span>
				<div class="flex items-center">
					<span class="w-8 mr-2 text-right"
						>{match.playerA.penalties ? `(${match.playerA.penalties})` : ''}</span
					>
					<img src={match.playerA.logo} alt={match.playerA.name} class="w-6 h-6" />

					<span class={'ml-2 w-12 ' + (match.playerA.winner ? 'font-bold' : '')}
						>{match.playerA.shortName}</span
					>
					<span class="tabular-nums">{match.playerA.score}</span>
				</div>
				<span class="px-2">-</span>
				<div class="flex items-center">
					<span class="tabular-nums">{match.playerB.score}</span>
					<span class={'mr-2 w-12 text-right ' + (match.playerB.winner ? 'font-bold' : '')}
						>{match.playerB.shortName}</span
					>
					<img src={match.playerB.logo} alt={match.playerB.name} class="w-6 h-6" />
					<span class="w-8 ml-2"
						>{match.playerB.penalties ? `(${match.playerB.penalties})` : ''}</span
					>
				</div>

				<span class="ml-8 w-64">{match.slug}</span>
			</div>
		{/each}
	</div>
</section>
