import { redirect } from "next/navigation";

const App: React.FC = () => {
  redirect("/auth/login");
};

export default App;
