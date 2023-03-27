import {
  CssVarsProvider,
  Typography,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Stack,
} from "@mui/joy";
import { useRouter } from "next/router";
import { supabase } from "../utils/initSupabase";
import { useState, useEffect } from "react";
import Board from "../components/Board";

export default function BoardsPage() {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
    else router.push("/");
  };

  // For creating a new board
  const [open, setOpen] = useState(false);

  // For getting the boards from Supabase
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState("");
  const [newBoardDescription, setNewBoardDescription] = useState("");

  const getBoards = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const { user } = session;
      const { data: boards, error } = await supabase
        .from("boards")
        .select("*")
        .eq("user_id", user.id);
      if (error) throw error;
      if (boards) {
        setBoards(boards);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // For creating a new board
  const addBoard = async () => {
    try {
      if (!newBoardName)
        throw new Error("Please enter a name for your new board.");
      // Get the user's ID from the session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const { user } = session;
      // Insert the new board into the boards table
      const { data: board, error } = await supabase.from("boards").insert({
        name: newBoardName,
        description: newBoardDescription,
        user_id: user.id,
      });
      if (error) throw error;
      setBoards([...boards, board]);
      setNewBoardName("");
      setNewBoardDescription("");
      setOpen(false);
      window.location.reload(); // reload the page to show the new board and avoid any async issues
    } catch (error) {
      console.log(error.message);
    }
  };

  // Get the boards when the page loads
  useEffect(() => {
    getBoards();
  }, []);

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

        <div
          style={{
            marginTop: "30px",
            marginLeft: "10%",
            marginRight: "10%",
          }}
        >
          <Typography level="h4">My Boards</Typography>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Button
              variant="outlined"
              color="neutral"
              style={{
                margin: "2.5%",
                background: "#E6EAEF",
                borderRadius: "1px",
                height: "120px",
                width: "20%",
                fontSize: "1.2rem",
                color: "#BAC2CC",
              }}
              onClick={() => setOpen(true)}
            >
              Create new board
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
              <ModalDialog
                aria-labelledby="basic-modal-dialog-title"
                aria-describedby="basic-modal-dialog-description"
                sx={{ maxWidth: 500 }}
              >
                <Typography id="basic-modal-dialog-title" component="h2">
                  Create new board
                </Typography>
                <Typography
                  id="basic-modal-dialog-description"
                  textColor="text.tertiary"
                >
                  Fill in the information of the project.
                </Typography>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    addBoard();
                  }}
                >
                  <Stack spacing={2}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        autoFocus
                        required
                        value={newBoardName}
                        onChange={(event) =>
                          setNewBoardName(event.target.value)
                        }
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Description</FormLabel>
                      <Input
                        required
                        value={newBoardDescription}
                        onChange={(event) =>
                          setNewBoardDescription(event.target.value)
                        }
                      />
                    </FormControl>
                    <Button type="submit">Create</Button>
                  </Stack>
                </form>
              </ModalDialog>
            </Modal>

            {boards.map((board) => {
              return (
                <Board
                  key={board.id}
                  hrefBoard={`/boards/${board.id}`}
                  nameBoard={board.name}
                />
              );
            })}
          </div>
        </div>
      </CssVarsProvider>
    </main>
  );
}
