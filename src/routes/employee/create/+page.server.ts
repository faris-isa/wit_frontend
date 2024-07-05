import type { PageServerLoad } from "./$types"
import config from "$lib/config.json"
import { error, fail, type Actions, type RequestEvent } from "@sveltejs/kit";

export const actions: Actions = {
   submitEmployee:async ({ request, cookies }: RequestEvent) => {

      const dataForm = await request.formData();

      const nama = dataForm.get('nama');
      const nomor = dataForm.get('nomor');
      const jabatan = dataForm.get('jabatan');
      const departemen = dataForm.get('departemen');
      const foto = dataForm.get('foto');
      const status = dataForm.get('status');

      if(!nama || !nomor || !jabatan || !departemen || !status){
         return fail(403, {
            error: true,
            message: 'Please, form required  !',
            error_detail: {
               nama: !nama ? 'Nama is required' : undefined,
               nomor: !nomor ? 'Nomor is required' : undefined,
               jabatan: !jabatan ? 'Jabatan is required' : undefined,
               departemen: !departemen ? 'Departemen is required' : undefined,
               status: !status ? 'Status is required' : undefined,
            },
            nama,
            nomor,
            jabatan,
            departemen,
            status
         })
      }

      const formData = new FormData();

      formData.append('nama', nama);
      formData.append('nomor', nomor);
      formData.append('jabatan', jabatan);
      formData.append('tanggal_masuk', new Date().toISOString());
      formData.append('departemen', departemen);
      formData.append('foto', foto ?? '');
      formData.append('status', status);

      let res = await (await fetch(config.domain + "/employee", {
         mode: "cors", 
         method: "POST",
         body: formData
      })).json()
      const statusCode = res.statusCode;
      if (statusCode > 200){
         let error_detail = undefined;
         if(Array.isArray(res.message)) {
            error_detail = res.message.reduce((acc: any, error: any) => {
               acc[error.property] = error.message;
               return acc;
             }, {});
         }

         return fail(statusCode, {
            error: true,
            message: res.error,
            error_detail: error_detail,
            nama,
            nomor,
            jabatan,
            departemen,
            status
         })
      }
   },
}