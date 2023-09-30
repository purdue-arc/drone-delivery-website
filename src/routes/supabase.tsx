import { createClient } from "@supabase/supabase-js";
import { createResource, For } from "solid-js";

const SUPABASE_URL = import.meta.env["VITE_SUPABASE_URL"]
const SUPABASE_ANON_TOKEN = import.meta.env["VITE_SUPABASE_ANON_TOKEN"]

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_TOKEN);

async function getCountries() {
  const { data } = await supabase.from("countries").select();
  return data;
}

function App() {
  const [countries] = createResource(getCountries);

  return (
    <><div>{SUPABASE_ANON_TOKEN}</div><ul>
          <For each={countries()}>{(country) => <li>{country.name}</li>}</For>
      </ul></>
  );
}

export default App;