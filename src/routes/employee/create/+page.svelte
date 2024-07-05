<script lang="ts">
	import { onMount } from "svelte";
	import {
		Button,
		Card,
		Datepicker,
		Fileupload,
		Helper,
		Input,
		Label,
		Select,
	} from "flowbite-svelte";
	import blank from "$lib/assets/blank-profile.jpg";
	import { applyAction, enhance } from "$app/forms";
	import { goto } from "$app/navigation";

	let countries = [
		{ value: "KONTRAK", name: "Kontrak" },
		{ value: "TETAP", name: "Tetap" },
		{ value: "PROBATION", name: "Probation" },
	];

	let selected: "KONTRAK" | "TETAP" | "PROBATION" = "KONTRAK";

	let fileuploadprops = {
		id: "user_avatar",
	};

	let imageUrl = "";

	function loadFile(event: Event) {
		if (
			event.target instanceof HTMLInputElement &&
			event.target.files?.length
		) {
			const file = event.target.files[0];
			if (file) {
				imageUrl = URL.createObjectURL(file);
				onMount(() => {
					return () => URL.revokeObjectURL(imageUrl);
				});
			}
		}
	}

	function enforceNumeric(event: Event) {
		if (event.target instanceof HTMLInputElement) {
			const input = event.target;
			input.value = input.value.replace(/[^0-9]/g, "");
		}
	}

	export let form: {
		error?: boolean;
		message: string;
		error_detail: {
			nama: string;
			nomor: string;
			jabatan: string;
			departemen: string;
			status: string;
		};
	};
</script>

<div class="p-10">
	<Card size="none">
		{#if form?.error}
			<p class="error">{form.message}</p>
		{/if}
		<form
			action="?/submitEmployee"
			method="post"
			enctype="multipart/form-data"
			use:enhance={() => {
				// Before form submission to server
				// // After form submission
				return async ({ result, update }) => {
					if (result.type === "success") {
						await goto("/employee");
					}
					if (result.type === "failure") {
						await applyAction(result);
					}
					update();
				};
			}}
		>
			<div class="flex flex-row h-10 items-center gap-5 mb-5">
				<!-- <Button size="md" color="dark" href="/employee">Back</Button> -->
				<h1 class="text-2xl font-bold">Form Input Karyawan</h1>
			</div>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-5 justify-end">
				<div class="w-3/4">
					<Label for="nama_karyawan" class="block mb-2">Nama Karyawan</Label>
					<Input
						color={form?.error_detail.nama ? "red" : "base"}
						id="nama_karyawan"
						name="nama"
						placeholder="Input nama karyawan"
					/>

					{#if form?.error_detail.nama}
						<Helper class="mt-2" color="red">{form.error_detail.nama}</Helper>
					{/if}
				</div>
				<div class="row-span-5">
					<Label for="photo_karyawan" class="block mb-2">Photo</Label>
					<Fileupload name="foto" {...fileuploadprops} on:change={loadFile} />
					<section class="my-5">
						{#if imageUrl}
							<img src={imageUrl} alt="uploaded" width="360" />
						{:else}
							<img src={blank} alt="" srcset="" width="360" />
						{/if}
					</section>
				</div>
				<div class="w-3/4">
					<Label for="nomor_karyawan" class="block mb-2">Nomor Karyawan</Label>
					<Input
						color={form?.error_detail.nomor ? "red" : "base"}
						id="nomor_karyawan"
						type="number"
						name="nomor"
						placeholder="Input nomor karyawan"
						on:input={enforceNumeric}
						required
					/>
					{#if form?.error_detail.nomor}
						<Helper class="mt-2" color="red">{form.error_detail.nomor}</Helper>
					{/if}
				</div>
				<div class="w-3/4">
					<Label for="jabatan_karyawan" class="block mb-2">Jabatan</Label>
					<Input
						color={form?.error_detail.jabatan ? "red" : "base"}
						id="jabatan_karyawan"
						name="jabatan"
						placeholder="Input jabatan karyawan"
						required
					/>
					{#if form?.error_detail.jabatan}
						<Helper class="mt-2" color="red"
							>{form.error_detail.jabatan}</Helper
						>
					{/if}
				</div>
				<div class="w-3/4">
					<Label for="departemen_karyawan" class="block mb-2">Departemen</Label>
					<Input
						color={form?.error_detail.departemen ? "red" : "base"}
						id="departemen_karyawan"
						name="departemen"
						placeholder="Input Departemen"
						required
					/>
					{#if form?.error_detail.departemen}
						<Helper class="mt-2" color="red"
							>{form.error_detail.departemen}</Helper
						>
					{/if}
				</div>
				<div class="w-3/4">
					<Label>
						Select an option
						<Select
							color={form?.error_detail.status ? "red" : "base"}
							class="mt-2"
							name="status"
							items={countries}
							bind:value={selected}
							required
						/>
					</Label>
					{#if form?.error_detail.status}
						<Helper class="mt-2" color="red">{form.error_detail.status}</Helper
						>
					{/if}
				</div>
			</div>
			<div class="flex flex-row h-10 items-center gap-5 mb-5">
				<Button type="submit" size="md" color="blue">Submit</Button>
				<Button size="md" color="dark" href="/employee">Back</Button>
			</div>
		</form>
	</Card>
</div>
