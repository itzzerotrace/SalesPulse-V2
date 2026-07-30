"use client";

import { useEffect, useState } from "react";
import { getStores, createStore } from "@/lib/admin/stores";

export default function StoresPage() {

  const [stores, setStores] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  async function loadStores() {

    try {

      const data = await getStores();

      setStores(data || []);

    } catch (err: any) {

      console.error(err);

      setError(
        JSON.stringify(err)
      );

    }

  }


  useEffect(() => {

    loadStores();

  }, []);



  async function addStore() {

    try {

      setError("");

      await createStore(
        name,
        city
      );

      setName("");
      setCity("");

      await loadStores();


    } catch (err: any) {

      console.error(err);

      setError(
        JSON.stringify(err)
      );

    }

  }



  return (

    <main className="min-h-screen bg-slate-50 p-8">

      <h1 className="text-4xl font-black">
        Store Management
      </h1>


      {error && (

        <div className="mt-5 rounded-xl bg-red-100 p-4 text-red-700">

          {error}

        </div>

      )}



      <div className="mt-8 rounded-3xl border bg-white p-6">

        <h2 className="text-xl font-bold">
          Add Store
        </h2>


        <div className="mt-5 flex gap-3">


          <input
            className="rounded-xl border p-3"
            placeholder="Store Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />


          <input
            className="rounded-xl border p-3"
            placeholder="City"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
          />


          <button
            onClick={addStore}
            className="rounded-xl bg-purple-600 px-6 font-bold text-white"
          >
            Add Store
          </button>


        </div>


      </div>



      <div className="mt-8 space-y-4">


        {stores.map((store)=>(


          <div
            key={store.id}
            className="rounded-2xl border bg-white p-6"
          >

            <h3 className="text-xl font-bold">
              {store.name}
            </h3>


            <p className="text-slate-500">
              {store.city}
            </p>


          </div>


        ))}


      </div>


    </main>

  );

}
