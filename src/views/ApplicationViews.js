import { AdminViews } from "./AdminViews";
import { UserViews } from "./UserViews";

export const ApplicationViews = ({ token, setToken, isAdmin, setAdmin }) => {
  if (isAdmin) {
    return (
      <AdminViews
        token={token}
        setToken={setToken}
        isAdmin={isAdmin}
        setAdmin={setAdmin}
      />
    );
  } else {
    return (
      <UserViews
        token={token}
        setToken={setToken}
        isAdmin={isAdmin}
        setAdmin={setAdmin}
      />
    );
  }
};
