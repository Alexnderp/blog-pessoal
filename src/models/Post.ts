import Theme from "./Theme";
import User from "./User";

export default interface Post {
  id: string;
  title: string;
  text: string;
  date: string;
  theme: Theme;
  user: User;
}
