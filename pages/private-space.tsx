import { supabase } from "../lib/supabaseClient";

type Props = { codes: string };

export default function PrivateSpace({ codes }: Props) {
  return (
    <ul>
      {codes.map((c) => (
        <li key={c.id}>{c.title}</li>
      ))}
    </ul>
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from("countries").select();

  return {
    props: {
      countries: data,
    },
  };
}
