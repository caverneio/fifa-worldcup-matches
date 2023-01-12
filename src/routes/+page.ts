import { dev } from '$app/environment';

export const csr = dev;
export const prerender = true;

import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
	const res = await fetch(
		'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?limit=100&dates=20221011-20221227'
	);

	const data = await res.json();

	const matches = data.events.map((match: any) => {
		let slug = match.season.slug;
		slug =
			slug === 'group-stage'
				? 'Groups'
				: slug === 'round-of-16'
				? 'Last 16'
				: slug === 'quarterfinals'
				? 'Quarter Finals'
				: slug === 'semifinals'
				? 'Semi Finals'
				: slug === '3rd-place'
				? 'Third Place'
				: slug === 'final'
				? 'Final'
				: slug;
		const date = match.competitions[0].startDate;
		const stadium = match.competitions[0].venue.fullName;
		const rawPlayerA = match.competitions[0].competitors[0];
		const rawPlayerB = match.competitions[0].competitors[1];

		const playerA = {
			shortName: rawPlayerA.team.abbreviation,
			name: rawPlayerA.team.displayName,
			logo: rawPlayerA.team.logo,
			score: rawPlayerA.score,
			winner: rawPlayerA.winner,
			penalties: rawPlayerA?.shootoutScore
		};

		const playerB = {
			shortName: rawPlayerB.team.abbreviation,
			name: rawPlayerB.team.displayName,
			logo: rawPlayerB.team.logo,
			score: rawPlayerB.score,
			winner: rawPlayerB.winner,
			penalties: rawPlayerB?.shootoutScore
		};

		return {
			date,
			stadium,
			playerA,
			playerB,
			slug
		};
	});

	const sortedMatches = matches.sort((a: any, b: any) => {
		return new Date(a.date) < new Date(b.date) ? 1 : -1;
	});

	return { matches: sortedMatches };
}) satisfies PageLoad;
