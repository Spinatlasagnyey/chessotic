<script lang="ts">
	import { TestLoad } from '../../scripts/testLoader';

	const board = TestLoad();
	const columns = Array.from({ length: board.boardSize.width }, (_, x) => x);
	const rows = Array.from({ length: board.boardSize.height }, (_, y) => y);
</script>

<svelte:head>
	<title>Board configuration</title>
	<meta
		name="description"
		content="A chessboard rendered from the configured tile layout."
	/>
</svelte:head>

<main>
	<h1>Board configuration</h1>
	<p><code>.</code> is a tile; <code>x</code> is an empty space.</p>

	<div
		class="board"
		role="grid"
		aria-label="Chessboard loaded from the board configuration"
		style={`--columns: ${board.boardSize.width}; --rows: ${board.boardSize.height}`}
	>
		{#each rows as y (y)}
			{#each columns as x (`${x}-${y}`)}
				{@const tile = board.tiles[x]?.[y]}
				{#if tile}
					<div
						class:light={tile.color === 'white'}
						class:dark={tile.color === 'black'}
						class="tile"
						role="gridcell"
						aria-label={`${tile.color} tile at column ${x + 1}, row ${y + 1}`}
					></div>
				{:else}
					<div class="space" aria-hidden="true"></div>
				{/if}
			{/each}
		{/each}
	</div>
</main>

<style>
	main {
		display: grid;
		justify-items: center;
		gap: 0.75rem;
		padding: 2rem 1rem;
	}

	h1,
	p {
		margin: 0;
	}

	.board {
		display: grid;
		grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
		grid-template-rows: repeat(var(--rows), minmax(0, 1fr));
		width: min(100%, 36rem);
		aspect-ratio: var(--columns) / var(--rows);
		background: black;
	}

	.tile,
	.space {
		min-width: 0;
	}

	.light {
		background: #FFFFFF;
	}

	.dark {
		background: green;
	}
</style>