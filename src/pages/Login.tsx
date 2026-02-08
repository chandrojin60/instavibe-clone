import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) { setError("Please fill in all fields"); return; }
    setLoading(true);
    setError("");
    const result = await login(username, password);
    setLoading(false);
    if (result.error) setError(result.error);
    else navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-[350px]">
        <div className="border rounded-sm p-10 bg-card mb-2">
          <h1 className="text-center text-4xl font-semibold mb-8" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
            Instagram
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-xs h-9 bg-secondary"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-xs h-9 bg-secondary"
            />
            {error && <p className="text-xs text-destructive text-center">{error}</p>}
            <Button type="submit" disabled={loading || !username || !password} className="mt-2 h-8 text-sm font-semibold">
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </form>
          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs font-semibold text-muted-foreground">OR</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <button className="w-full text-sm font-semibold text-primary">Forgot password?</button>
        </div>
        <div className="border rounded-sm p-5 bg-card text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-primary">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
