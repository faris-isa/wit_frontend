<script>
	import "../app.css";
	import { onMount } from "svelte";
	import { navigating } from "$app/stores";
	import { writable } from "svelte/store";

	let activeLink = {
		dashboard: false,
		employee: false,
	};

	const hideMenu = writable(false);

	$: if ($navigating) {
		let splitOld = $navigating.from?.url.pathname.split("/");
		let oldPath = null;
		if (splitOld) {
			let maxArrayOld = splitOld?.length;
			oldPath = splitOld[maxArrayOld - 1];
		}

		let splitNew = $navigating.to?.url.pathname.split("/");
		let newPath = null;
		if (splitNew) {
			let maxArrayNew = splitNew.length;
			newPath = splitNew[maxArrayNew - 1];
		}
		if (oldPath !== newPath) {
			//@ts-ignore
			activeLink[oldPath] = false;
			//@ts-ignore
			activeLink[newPath] = true;
		}
	}

	onMount(() => {
		let split = window.location.pathname.split("/");
		let maxArray = split.length;
		let earlyPath = split[maxArray - 1];
		// @ts-ignore
		activeLink[earlyPath] = true;
	});
</script>

<div class="flex h-screen bg-gray-100">
	<!-- sidebar -->
	<div class="{$hideMenu ? 'hidden' : 'flex'} flex-col w-64 bg-gray-800">
		<div class="flex items-center justify-center h-16 bg-gray-900 gap-2">
			<img
				class="w-10"
				src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhd1AOe8mMMOB3OP1r4F2q5UEyLu3X0pryyQ&s"
				alt=""
			/>
			<span class="text-white font-bold uppercase">Human Resource</span>
		</div>
		<div class="flex flex-col flex-1 overflow-y-auto">
			<nav class="flex-1 px-2 py-4 bg-gray-800">
				<a
					href={activeLink["dashboard"] ? "javascript:void(0)" : "/dashboard"}
					class="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 {activeLink[
						'dashboard'
					]
						? 'bg-blue-600'
						: ''}"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6 mr-2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
						/>
					</svg>

					Dashboard
				</a>
				<a
					href={activeLink["employee"] ? "javascript:void(0)" : "/employee"}
					class="flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 {activeLink[
						'employee'
					]
						? 'bg-blue-600'
						: ''}"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6 mr-2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
						/>
					</svg>

					Employee
				</a>
			</nav>
		</div>
	</div>

	<!-- Main content -->
	<div class="flex flex-col flex-1 overflow-y-auto">
		<div
			class="flex items-center justify-between h-16 bg-white border-b border-gray-200"
		>
			<div class="flex items-center px-4">
				<button
					class="text-gray-500 focus:outline-none focus:text-gray-700"
					on:click={() => hideMenu.set(!$hideMenu)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
				<!-- <input
					class="mx-4 w-full border rounded-md px-4 py-2"
					type="text"
					placeholder="Search"
				/> -->
			</div>
		</div>

		<slot />
	</div>
</div>
