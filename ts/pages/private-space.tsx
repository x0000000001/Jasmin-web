import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Account from "../components/Account";
import { Auth } from "@supabase/auth-ui-react";

type Props = {};

export default function PrivateSpace({}: Props) {
  // console.log("PrivateSpace");
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    // <ul>
    //   {/* {codes.map((c) => (
    //     <li key={c.id}>{c.title}</li>
    //   ))} */}
    // </ul>

    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      {!session ? (
        <Auth supabaseClient={supabase} theme="dark" />
      ) : (
        <Account session={session} />
      )}
    </div>
  );
}

export async function getCodes() {
  // return await supabase.from("codes").select();
}
