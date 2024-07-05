import type { PageServerLoad } from "./$types"
import config from "$lib/config.json"
import { fail, type Actions, type RequestEvent } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ cookies, locals, parent }) => {

	const fetchData = async () => {
		try {
			const res = await (await fetch(config.domain + "/dashboards/employee")).json();
			const data = res.message == "OK" ? res.data : [];
			return data;
		} catch (error) {
			return [];
		}
    }
    
	return {
		dashboard: fetchData()
	}
}