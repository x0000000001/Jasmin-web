import { supabase } from "../lib/supabaseClient";
import { Database } from "../lib/database.types";

type Props = {};

export default function PrivateSpace({}: Props) {
  console.log("PrivateSpace");

  return (
    <ul>
      {/* {codes.map((c) => (
        <li key={c.id}>{c.title}</li>
      ))} */}
    </ul>
  );
}

export async function getCodes() {
  // return await supabase.from("codes").select();
}
