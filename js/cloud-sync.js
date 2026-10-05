(()=>{
  const config=window.AGENDA_CLOUD_CONFIG||{};
  const tokenKey="agendaFisioAdminToken";
  const ready=()=>Boolean(config.apiUrl);
  const token=()=>sessionStorage.getItem(tokenKey)||"";

  async function request(url,options){
    const headers=new Headers(options?.headers||{});
    if(token())headers.set("Authorization",`Bearer ${token()}`);
    const response=await fetch(url,{...options,headers});
    const result=await response.json().catch(()=>null);
    if(!response.ok||result?.ok!==true){
      throw new Error(result?.error||"Error de conexión");
    }
    return result;
  }

  async function listRecords(){
    if(!ready())return null;
    const result=await request(`${config.apiUrl}?action=list`);
    return Array.isArray(result.appointments)?result.appointments:[];
  }

  async function list(){
    const records=await listRecords();
    return Array.isArray(records)?records.filter(item=>item?.recordType!=="patient"):records;
  }

  async function listPatients(){
    const records=await listRecords();
    return Array.isArray(records)?records.filter(item=>item?.recordType==="patient"):records;
  }

  async function availability(){
    if(!ready())return [];
    const result=await request(`${config.apiUrl}?action=availability`);
    return Array.isArray(result.busy)?result.busy:[];
  }

  async function send(action,payload){
    if(!ready())return false;
    await request(config.apiUrl,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({action,payload})
    });
    return true;
  }

  window.CloudAppointments={
    ready,
    isUnlocked:()=>Boolean(token()),
    async unlock(value){
      sessionStorage.setItem(tokenKey,String(value||"").trim());
      try{await list();return true}catch(error){sessionStorage.removeItem(tokenKey);throw error}
    },
    lock:()=>sessionStorage.removeItem(tokenKey),
    list,
    availability,
    upsert:appointment=>send("upsert",appointment),
    remove:id=>send("delete",{id}),
    async hydrate(save){
      try{
        const appointments=await list();
        if(Array.isArray(appointments)){
          save(appointments);
          return appointments;
        }
      }catch(error){
        console.warn("Se usará la copia local:",error.message);
      }
      return null;
    },
    async hydrateAvailability(save){
      try{
        const busy=await availability();
        save(busy);
        return busy;
      }catch(error){
        console.warn("No se pudo consultar la disponibilidad:",error.message);
        return [];
      }
    }
  };

  const patientPayload=patient=>({
    ...patient,
    recordType:"patient",
    area:"Paciente",
    status:"Expediente",
    notes:[
      patient.diagnosis?`Diagnóstico: ${patient.diagnosis}`:"",
      patient.treatment?`Tratamiento: ${patient.treatment}`:"",
      Number(patient.packageSize)?`Paquete: ${patient.packageSize} sesiones · ${Number(patient.sessionsRemaining)||0} restantes`:"Sin paquete activo"
    ].filter(Boolean).join("\n")
  });

  window.CloudPatients={
    ready,
    isUnlocked:()=>Boolean(token()),
    list:listPatients,
    upsert:patient=>send("upsert",patientPayload(patient)),
    remove:id=>send("delete",{id})
  };
})();
