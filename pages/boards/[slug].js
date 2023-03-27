import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/initSupabase";
import { Button, Typography, CssVarsProvider } from "@mui/joy";
import List from "@/components/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function BoardPage() {
  const router = useRouter();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    async function fetchBoard() {
      const { data, error } = await supabase
        .from("boards")
        .select("*")
        .eq("id", router.query.slug)
        .single();
      if (error) {
        console.log("error", error);
      } else {
        setBoard(data);
      }
    }
    fetchBoard();
  }, [router.query.slug]);

  if (!board) {
    return <div>Sorry but this board doesn&apos;t exist yet</div>;
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
    else router.push("/");
  };

  const GoToDashboard = async () => {
    router.push("/boards-page");
  };

  const DeleteBoard = async () => {
    try {
      const { error } = await supabase
        .from("boards")
        .delete()
        .eq("id", router.query.slug);
      if (error) {
        console.log("error", error);
      } else {
        router.push("/boards-page");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main
      style={{
        height: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      <CssVarsProvider>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#0D61C6",
            paddingBottom: "10px",
          }}
        >
          <Typography
            level="h3"
            style={{
              marginLeft: "10px",
              marginTop: "5px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Trellord
          </Typography>
          <div style={{ justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              style={{ color: "white", marginTop: "5px", marginRight: "10px" }}
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </div>
        </div>

        <div style={{ margin: "20px" }}>
          <div style={{ display: "flex" }}>
            <Button onClick={GoToDashboard}>
              {" "}
              <ChevronLeftIcon />{" "}
            </Button>
            <Typography
              level="h4"
              style={{
                marginTop: "5px",
                marginLeft: "20px",
                marginRight: "20px",
                color: "grey",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              {board.name}
            </Typography>
            <Button onClick={DeleteBoard}> Delete Board </Button>
          </div>
          <Typography
            level="body1"
            style={{
              margin: "15px",
              color: "grey",
            }}
          >
            Description: {board.description}
          </Typography>

          <Button
            variant="outlined"
            color="neutral"
            style={{
              background: "#E6EAEF",
              color: "#BAC2CC",
              marginBottom: "20px",
            }}
          >
            Create new list
          </Button>

          <div
            style={{
              width: "100%",
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            <div
              style={{
                display: "inline-block",
                width: "200px",
                marginRight: "10px",
              }}
            >
              <List nameList="TO DO" />
              <List nameList="To Do" />
            </div>
          </div>
        </div>
      </CssVarsProvider>
    </main>
  );
}
