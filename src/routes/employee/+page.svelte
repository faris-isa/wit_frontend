<script lang="ts">
	import config from "$lib/config.json";
	import { onMount } from "svelte";
	import { debounce } from "lodash-es";

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
		Checkbox,
		Select,
		Input,
		Modal,
	} from "flowbite-svelte";
	import {
		ArrowLeftOutline,
		ArrowRightOutline,
		ChevronDownOutline,
		DotsVerticalOutline,
		ExclamationCircleOutline,
		FilterOutline,
		SortOutline,
	} from "flowbite-svelte-icons";
	import { writable } from "svelte/store";

	const fetchData = async () => {
		try {
			const queryParams = {
				filter_search: $param.filter_search,
				per_page: $param.per_page.toString(),
				page: $param.page.toString(),
			};
			const queryString = new URLSearchParams(queryParams).toString();
			const urlWithQuery = `${config.domain}/employee?${queryString}`;

			const res = await (await fetch(urlWithQuery, { mode: "cors" })).json();
			return res;
		} catch (error) {
			return [];
		}
	};

	let items: any = writable([]);

	let helper = { start: 1, end: 10, total: 100 };

	let paginationOption = [
		{ value: 10, name: "10" },
		{ value: 25, name: "25" },
		{ value: 50, name: "50" },
		{ value: 100, name: "100" },
	];

	let param = writable({
		filter_search: "",
		per_page: 10,
		page: 1,
	});

	let pagination = writable({
		start: 1,
		end: 1,
		total: 1,
	});

	const handleSearch = debounce((e: Event) => {
		$param.filter_search = e.target.value;
	}, 300);

	$: if ($param) {
		(async () => {
			getAndSetTableEmployee();
		})();
	}

	let deleteValue: string | null = null;
	let openDialogConfirmationDelete = false;

	let handleDeleteValue = (id: string) => {
		deleteValue = id;
		openDialogConfirmationDelete = true;
	};

	let closeHandleDelete = () => {
		deleteValue = null;
		openDialogConfirmationDelete = false;
	};

	let handleDeleteConfirmation = async () => {
		try {
			const urlWithQuery = `${config.domain}/employee/${deleteValue}`;

			const res = await (
				await fetch(urlWithQuery, { mode: "cors", method: "DELETE" })
			).json();

			if (res) {
				getAndSetTableEmployee();
			}
		} catch (error) {
			return [];
		}
		closeHandleDelete();
	};

	const previous = () => {
		alert("Previous btn clicked. Make a call to your server to fetch data.");
	};
	const next = () => {
		alert("Next btn clicked. Make a call to your server to fetch data.");
	};

	async function getAndSetTableEmployee() {
		const fetch = await fetchData();
		$pagination.total = fetch.total;
		items.set(fetch.data);
	}

	onMount(async () => {
		getAndSetTableEmployee();
	});
</script>

<Card class="w-[97.5%] mt-5 ml-5 -mr-5 flex space-x-5" size="none">
	<section
		id="header-table"
		class="-mt-5 w-full flex justify-between justify-items-center items-center py-5"
	>
		<h1 class="text-4xl text-black font-bold ml-4">Data Karyawan</h1>
		<div class="w-1/12 flex justify-between">
			<button class="flex flex-row" disabled>
				<SortOutline />
				Sort
			</button>
			<button class="flex flex-row" disabled>
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
			<Button color="blue" href="/employee/create">Tambah Karyawan</Button>
			<Button color="blue" disabled>Imprt CSV</Button>
		</div>
		<div class="w-1/2 flex justify-end space-x-5 mr-4">
			<Button color="blue" disabled>Ekspor ke CSV</Button>
			<Button color="blue" disabled>Eksport ke PDF</Button>
		</div>
	</section>
	<section class="flex justify-end items-center mb-5">
		<Input
			class="w-1/4"
			on:input={handleSearch}
			id="handle_search_table"
			name="nama"
			placeholder="Input nama karyawan"
		/>
	</section>
	<Table hoverable={true}>
		<TableHead>
			<TableHeadCell>Nama Karyawan</TableHeadCell>
			<TableHeadCell>Nomor Karyawan</TableHeadCell>
			<TableHeadCell>Jabatan</TableHeadCell>
			<TableHeadCell>Departemen</TableHeadCell>
			<TableHeadCell>Tanggal Masuk</TableHeadCell>
			<TableHeadCell>Photo</TableHeadCell>
			<TableHeadCell>Status</TableHeadCell>
			<TableHeadCell></TableHeadCell>
			<!-- <TableHeadCell on:click={() => sortTable("id")}>ID</TableHeadCell>
			<TableHeadCell on:click={() => sortTable("maker")}>Maker</TableHeadCell>
			<TableHeadCell on:click={() => sortTable("type")}>Type</TableHeadCell>
			<TableHeadCell on:click={() => sortTable("make")}>Make</TableHeadCell> -->
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#if $items.length === 0}
				<TableBodyRow>
					<TableBodyCell colspan="8" class="text-center">
						No data available
					</TableBodyCell>
				</TableBodyRow>
			{:else}
				{#each $items as item}
					<TableBodyRow>
						<TableBodyCell>{item.nama}</TableBodyCell>
						<TableBodyCell>{item.nomor}</TableBodyCell>
						<TableBodyCell>{item.jabatan}</TableBodyCell>
						<TableBodyCell>{item.departemen}</TableBodyCell>
						<TableBodyCell>{item.tanggal_masuk}</TableBodyCell>
						<TableBodyCell>
							<img
								src={item.foto_url}
								alt={item.nama}
								class="w-10 h-10 rounded-full"
							/>
						</TableBodyCell>
						<TableBodyCell>{item.status}</TableBodyCell>
						<TableBodyCell>
							<DotsVerticalOutline class="dots-menu dark:text-white" />
							<Dropdown triggeredBy=".dots-menu">
								<DropdownItem>Edit</DropdownItem>
								<DropdownItem on:click={() => handleDeleteValue(item.id)}
									>Delete</DropdownItem
								>
							</Dropdown>
						</TableBodyCell>
					</TableBodyRow>
				{/each}
			{/if}
			<!-- {#each $sortItems as item}
				<TableBodyRow>
					<TableBodyCell>{item.id}</TableBodyCell>
					<TableBodyCell>{item.maker}</TableBodyCell>
					<TableBodyCell>{item.type}</TableBodyCell>
					<TableBodyCell>{item.make}</TableBodyCell>
				</TableBodyRow>
			{/each} -->
		</TableBody>
	</Table>
	<section class="mt-5 flex flex-row items-center justify-end gap-10">
		<div class="flex items-center justify-center gap-5">
			Rows per page
			<Select
				class="mt-2"
				name="status"
				items={paginationOption}
				bind:value={$param.per_page}
				required
			/>
		</div>

		<div class="text-sm text-gray-700 dark:text-gray-400">
			Showing <span class="font-semibold text-gray-900 dark:text-white"
				>{($param.page - 1) * $param.per_page + 1}</span
			>
			to
			<span class="font-semibold text-gray-900 dark:text-white">
				{Math.min($param.page * $param.per_page, $pagination.total)}</span
			>
			of
			<span class="font-semibold text-gray-900 dark:text-white"
				>{$pagination.total}</span
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

	<!-- DELETE CONFIRMATION -->
	<Modal bind:open={openDialogConfirmationDelete} size="xs" autoclose>
		<div class="text-center">
			<ExclamationCircleOutline
				class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
			/>
			<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
				Are you sure you want to delete this employee?
			</h3>
			<Button
				color="red"
				class="me-2"
				on:click={() => handleDeleteConfirmation()}>Yes, I'm sure</Button
			>
			<Button color="alternative" on:click={() => closeHandleDelete()}
				>No, cancel</Button
			>
		</div>
	</Modal>
</Card>
