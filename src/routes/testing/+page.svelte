<script lang="ts">
	import '../layout.css';
	import { TestLoad } from '../../scripts/testLoader';
	import type Piece from '../../scripts/board/piece.svelte';

	let board = $state(TestLoad());
	let selectedTile: { x: number; y: number } | null = $state(null);
	const columns = $derived(Array.from({ length: board.boardSize.width }, (_, x) => x));
	const rows = $derived(Array.from({ length: board.boardSize.height }, (_, y) => y));
	
	// // Beispiel: später von irgendwo aufrufen (Button, WebSocket, Spiellogik ...)
	// function addEffect(x: number, y: number, effect: string) {
	// 	board.tiles[x][y]?.effects.push(effect);
	// }
	function pieceSrc(piece: Piece): string {
		return `/pieces/${piece.type}.img`;
	}
</script>

<svelte:head>
	<title>Board configuration</title>
	<meta
		name="description"
		content="A chessboard rendered from the configured tile layout."
	/>
</svelte:head>

<main class="flex flex-col items-center gap-3 p-8">
	<h1>Board configuration</h1>
	<p><code>.</code> is a tile; <code>x</code> is an empty space.</p>

		<div
		class="relative w-[min(100%,36rem)] bg-gray-800"
		style="aspect-ratio: {board.boardSize.width} / {board.boardSize.height};"
		>
			<!-- Schicht 1: Tiles -->
			<div
				class="absolute inset-0 grid bg-black"
				style="grid-template-columns: repeat({board.boardSize.width}, minmax(0, 1fr));
					grid-template-rows: repeat({board.boardSize.height}, minmax(0, 1fr));"
			>
				{#each rows as y (y)}
					{#each columns as x (`${x}-${y}`)}
						{@const tile = board.tiles[x]?.[y]}
						<div class='{tile ? (tile.color === 'white' ? 'bg-board-light' : 'bg-board-dark') : ''}{selectedTile?.x === x && selectedTile?.y === y ? " border-2 border-board-highlight" : ""}'></div>
					{/each}
				{/each}
			</div>

			<!-- Schicht 2: Effekte -->
			<div class="pointer-events-none absolute inset-0"></div>

			<!-- Schicht 3: Pieces -->
			<div class="pointer-events-none absolute inset-0">
				{#each board.pieces as piece (piece.id)}
					{#if piece.position !== null}
					<img
						src={pieceSrc(piece)}
						alt="{piece.team} {piece.type}"
						class="absolute select-none object-contain p-[1%] transition-[left,top] duration-300"
						style="
							left: {(piece.position.x / board.boardSize.width) * 100}%;
							top: {(piece.position.y / board.boardSize.height) * 100}%;
							width: {100 / board.boardSize.width}%;
							height: {100 / board.boardSize.height}%;
						"
						draggable="false"
					/>
					{/if}
				{/each}
			</div>
			<!-- Schicht 4: Pieces Piece Status-->
			<div class="pointer-events-none absolute inset-0"></div>
			<!-- Schicht 5: Clickable Area -->
			<div
				class="absolute inset-0 bg-amber-50/10"
				role="presentation"
				onclick={(e) => {
					const rect = e.currentTarget.getBoundingClientRect();
					const x = Math.floor(((e.clientX - rect.left) / rect.width) * board.boardSize.width);
					const y = Math.floor(((e.clientY - rect.top) / rect.height) * board.boardSize.height);
					console.log('Klick auf', x + 1, y + 1);
					if (selectedTile) {
						//board.tiles[selectedTile.x][selectedTile.y].effects.push('highlight');
						try {
							let tile = board.tiles[selectedTile.x][selectedTile.y];
							if (tile?.piece)
								board.movePiece(tile?.piece, { x: x, y: y });
						} catch (error) {
							console.error('Error moving piece:', error);
						}
						selectedTile = null;
					}
					else {
						selectedTile = { x, y };
					}
				}}
			></div>
		</div>
</main>