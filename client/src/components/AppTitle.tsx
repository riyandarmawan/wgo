import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function AppTitle() {
  return (
    <Link to="/" className="flex items-center gap-1">
      <MessageCircle />
      <h1 className="text-lg font-medium">WGO</h1>
    </Link>
  );
}
