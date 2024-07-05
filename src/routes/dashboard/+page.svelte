<script lang="ts">

	import config from "$lib/config.json"
	
	import { onMount } from "svelte";
	import { writable } from "svelte/store";

	import {
		Chart,
		Card,
		A,
		Button,
		Dropdown,
		DropdownItem,
		Popover,
		Rating,
		Badge,
	} from "flowbite-svelte";
	import {
		InfoCircleSolid,
		ChevronDownOutline,
		ChevronRightOutline,
		PenSolid,
		DownloadSolid,
		ShareNodesSolid,
		TrashBinSolid,
		DotsHorizontalOutline,
	} from "flowbite-svelte-icons";

	const fetchData = async () => {
		try {
			const res = await (await fetch(config.domain + "/dashboards/employee", {mode: "cors"})).json();
			return res.data;
		} catch (error) {
			return [];
		}
    }

	type dashboard = {
		counter: {
			all: number
			contract: number
			probation: number
		},
		department: {
			labels: string[]
			values: number[]
		}
	}

	const dashboardData = writable({
		counter: {
			all: 0,
			contract: 0,
			probation: 0
		},
		department: {
			labels: [],
			values: []
		}
	});

	function generateRandomHexColor() {
		return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');
	}

	$ : options.series = $dashboardData.department.values;
	$ : options.labels = $dashboardData.department.labels;

  $: options.colors = $dashboardData.department.values.map(() => generateRandomHexColor());



	const options = {
		series: $dashboardData.department.values,
		colors: ["#1C64F2", "#16BDCA", "#9061F9"],
		chart: {
			height: 420,
			width: "100%",
			type: "pie",
		},
		stroke: {
			colors: ["white"],
			lineCap: "",
		},
		plotOptions: {
			pie: {
				labels: {
					show: true,
				},
				size: "100%",
				dataLabels: {
					offset: -25,
				},
			},
		},
		labels: $dashboardData.department.labels,
		dataLabels: {
			enabled: true,
			style: {
				fontFamily: "Inter, sans-serif",
			},
		},
		legend: {
			position: "bottom",
			fontFamily: "Inter, sans-serif",
		},
		yaxis: {
			labels: {
				formatter: function (value: string) {
					return value + " orang";
				},
			},
		},
		xaxis: {
			labels: {
				formatter: function (value: string) {
					return value + " orang";
				},
			},
			axisTicks: {
				show: false,
			},
			axisBorder: {
				show: false,
			},
		},
	};

	onMount(async () => {
		const fetch = await fetchData();
		console.log(fetch)
		dashboardData.set(fetch);
	});
</script>

<div class="flex flex-wrap mb-6 mt-5 w-full">
	<div class="md:w-1/3 p-2 px-10 w-full">
		<div
			class="bg-white rounded-lg h-64 p-4 shadow-xl flex flex-col justify-center items-center space-y-10"
		>
			<h1 class="text-4xl text-gray-400">Total Karyawan</h1>
			<span class="text-7xl font-bold">{ $dashboardData.counter.all }</span>
		</div>
	</div>
	<div class="md:w-1/3 p-2 px-10 w-full">
		<div
			class="bg-white rounded-lg h-64 p-4 shadow-xl flex flex-col justify-center items-center space-y-10"
		>
			<h1 class="text-4xl text-blue-500">Contract</h1>
			<span class="text-7xl text-blue-500">{ $dashboardData.counter.contract }</span>
		</div>
	</div>
	<div class="md:w-1/3 p-2 px-10 w-full">
		<div
			class="bg-white rounded-lg h-64 p-4 shadow-xl flex flex-col justify-center items-center space-y-10"
		>
			<h1 class="text-4xl text-orange-400">Probation</h1>
			<span class="text-7xl text-orange-400">{ $dashboardData.counter.probation }</span>
		</div>
	</div>

	<div class="md:w-1/2 p-2 px-10 w-full mt-10">
		<div class="bg-white rounded-lg h-[28rem] p-4 shadow-xl">
			<div class="flex justify-between items-start w-full">
				<div class="flex-col items-center">
					<div class="flex items-center mb-1">
						<h5
							class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1"
						>
							Distributed Employee Department
						</h5>
					</div>
				</div>
			</div>

			<Chart {options} />
		</div>
	</div>

	<!-- <Card padding="none" class="md:w-1/2 w-full">
    <a href="/">
      <img class="p-8 rounded-t-lg" src="/images/product-1.webp" alt="product 1" />
    </a>
    <div class="px-5 pb-5">
      <a href="/">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
      </a>
      <Rating rating={4} size={24} class="mt-2.5 mb-5">
        <Badge slot="text" class="ms-3">4</Badge>
      </Rating>
      <div class="flex justify-between items-center">
        <span class="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
        <Button href="/">Buy now</Button>
      </div>
    </div>
  </Card>
  <Card class="w-1/3">
    b
  </Card>
  <Card class="w-1/3">
    c
  </Card>
  <Card class="flex-1">
    <div class="flex justify-between items-start w-full">
      <div class="flex-col items-center">
        <div class="flex items-center mb-1">
          <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">Website traffic</h5>
          <InfoCircleSolid id="pie1" class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" />
          <Popover triggeredBy="#pie1" class="text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-10">
            <div class="p-3 space-y-2">
              <h3 class="font-semibold text-gray-900 dark:text-white">Activity growth - Incremental</h3>
              <p>Report helps navigate cumulative growth of community activities. Ideally, the chart should have a growing trend, as stagnating chart signifies a significant decrease of community activity.</p>
              <h3 class="font-semibold text-gray-900 dark:text-white">Calculation</h3>
              <p>For each date bucket, the all-time volume of activities is calculated. This means that activities in period n contain all activities up to period n, plus the activities generated by your community in period.</p>
              <A href="/">Read more <ChevronRightOutline class="w-2 h-2 ms-1.5" /></A>
            </div>
          </Popover>
        </div>
      </div>
      <div class="flex justify-end items-center">
        <DotsHorizontalOutline id="dots-menu" class="dots-menu dark:text-white" />
        <Dropdown triggeredBy="#dots-menu" class="w-44" offset="-6">
          <DropdownItem><PenSolid class="inline w-3 h-3 me-2" /> Edit widget</DropdownItem>
          <DropdownItem><DownloadSolid class="inline w-3 h-3 me-2" />Dropdown data</DropdownItem>
          <DropdownItem><ShareNodesSolid class="inline w-3 h-3 me-2" />Add to repository</DropdownItem>
          <DropdownItem><TrashBinSolid class="inline w-3 h-3 me-2" />Delete widget</DropdownItem>
        </Dropdown>
      </div>
    </div>
  
    <Chart {options} class="py-6" />
  
    <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
      <div class="flex justify-between items-center pt-5">
        <Button class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent focus:ring-transparent dark:focus:ring-transparent py-0">Last 7 days<ChevronDownOutline class="w-2.5 m-2.5 ms-1.5" /></Button>
        <Dropdown class="w-40" offset="-6">
          <DropdownItem>Yesterday</DropdownItem>
          <DropdownItem>Today</DropdownItem>
          <DropdownItem>Last 7 days</DropdownItem>
          <DropdownItem>Last 30 days</DropdownItem>
          <DropdownItem>Last 90 days</DropdownItem>
        </Dropdown>
        <A href="/" class="uppercase text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2 hover:no-underline">
          Traffic analysis
          <ChevronRightOutline class="w-2.5 h-2.5 ms-1.5" />
        </A>
      </div>
    </div>
  </Card> -->
</div>
