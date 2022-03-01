import { Button, Card } from "@mui/material";
import { useRecoilState } from "recoil";
import { SampleAppState, AppStateEnum } from "../recoil/AppState.atoms";

const UserActions = () => {
  const [appState, setAppState] = useRecoilState<AppStateEnum>(SampleAppState);
  return (
    <Card className="flex md:flex-row justify-center">
      <Button
        variant="text"
        size="small"
        onClick={() => {
          setAppState(AppStateEnum.MY_POST);
        }}
      >
        {" "}
        View Posts
      </Button>

      <Button
        variant="text"
        size="small"
        onClick={() => {
          setAppState(AppStateEnum.MY_FOLLOWERS);
        }}
      >
        View Followers
      </Button>
    </Card>
  );
};
export default UserActions;
