<script>
	import {
		Button,
		Card,
		Dropdown,
		DropdownItem,
		Pagination,
		PaginationItem,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
	} from "flowbite-svelte";
	import {
		ArrowLeftOutline,
		ArrowRightOutline,
		ChevronDownOutline,
		FilterOutline,
		SortOutline,
	} from "flowbite-svelte-icons";
	import { writable } from "svelte/store";

	let items = [
		{ id: 1, maker: "Toyota", type: "ABC", make: 2017 },
		{ id: 2, maker: "Ford", type: "CDE", make: 2018 },
		{ id: 3, maker: "Volvo", type: "FGH", make: 2019 },
		{ id: 4, maker: "Saab", type: "IJK", make: 2020 },
	];

	const sortKey = writable("id"); // default sort key
	const sortDirection = writable(1); // default sort direction (ascending)
	const sortItems = writable(items.slice()); // make a copy of the items array

	// Define a function to sort the items
	const sortTable = (key) => {
		// If the same key is clicked, reverse the sort direction
		if ($sortKey === key) {
			sortDirection.update((val) => -val);
		} else {
			sortKey.set(key);
			sortDirection.set(1);
		}
	};

	$: {
		const key = $sortKey;
		const direction = $sortDirection;
		const sorted = [...$sortItems].sort((a, b) => {
			const aVal = a[key];
			const bVal = b[key];
			if (aVal < bVal) {
				return -direction;
			} else if (aVal > bVal) {
				return direction;
			}
			return 0;
		});
		sortItems.set(sorted);
	}

	let helper = { start: 1, end: 10, total: 100 };

	const previous = () => {
		alert("Previous btn clicked. Make a call to your server to fetch data.");
	};
	const next = () => {
		alert("Next btn clicked. Make a call to your server to fetch data.");
	};
</script>

<Card class="w-[97.5%] mt-5 ml-5 -mr-5 flex space-x-5" size="none">
	<section
		id="header-table"
		class="-mt-5 w-full flex justify-between justify-items-center items-center py-5"
	>
		<h1 class="text-4xl text-black font-bold ml-4">Data Karyawan</h1>
		<div class="w-1/12 flex justify-between">
			<button class="flex flex-row">
				<SortOutline />
				Sort
			</button>
			<button class="flex flex-row">
				<FilterOutline />
				Filter
			</button>
		</div>
	</section>
	<section
		id="action-table"
		class="-mt-5 w-full flex justify-end items-center py-5"
	>
		<div class="w-1/2 flex items-start space-x-5">
			<Button color="blue">Tambah Karyawan</Button>
			<Button color="blue">Imprt CSV</Button>
		</div>
		<div class="w-1/2 flex justify-end space-x-5 mr-4">
			<Button color="blue">Ekspor ke CSV</Button>
			<Button color="blue">Eksport ke PDF</Button>
		</div>
	</section>
	<Table hoverable={true} divClass="border">
		<TableHead>
			<TableHeadCell on:click={() => sortTable("id")}>ID</TableHeadCell>
			<TableHeadCell on:click={() => sortTable("maker")}>Maker</TableHeadCell>
			<TableHeadCell on:click={() => sortTable("type")}>Type</TableHeadCell>
			<TableHeadCell on:click={() => sortTable("make")}>Make</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each $sortItems as item}
				<TableBodyRow>
					<TableBodyCell>{item.id}</TableBodyCell>
					<TableBodyCell>{item.maker}</TableBodyCell>
					<TableBodyCell>{item.type}</TableBodyCell>
					<TableBodyCell>{item.make}</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
	<section class="mt-5 flex flex-row items-center justify-end gap-10">
		<div class="flex items-center justify-center gap-5">
            Rows per page
			<Button
				><ChevronDownOutline
					class="w-6 h-6 ms-2 text-white dark:text-white"
				/></Button
			>
			<Dropdown>
				<DropdownItem>Dashboard</DropdownItem>
				<DropdownItem>Settings</DropdownItem>
				<DropdownItem>Earnings</DropdownItem>
				<DropdownItem>Sign out</DropdownItem>
			</Dropdown>
		</div>

		<div class="text-sm text-gray-700 dark:text-gray-400">
			Showing <span class="font-semibold text-gray-900 dark:text-white"
				>{helper.start}</span
			>
			to
			<span class="font-semibold text-gray-900 dark:text-white"
				>{helper.end}</span
			>
			of
			<span class="font-semibold text-gray-900 dark:text-white"
				>{helper.total}</span
			>
			Entries
		</div>

		<div class="flex space-x-3 rtl:space-x-reverse">
			<PaginationItem class="flex items-center" on:click={previous}>
				<ArrowLeftOutline class="me-2 w-3.5 h-3.5" />
			</PaginationItem>
			<PaginationItem class="flex items-center" on:click={next}>
				<ArrowRightOutline class="ms-2 w-3.5 h-3.5" />
			</PaginationItem>
		</div>
	</section>
</Card>
