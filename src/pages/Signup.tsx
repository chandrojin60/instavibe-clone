import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !displayName || !username || !password) { setError("Please fill in all fields"); return; }
    setLoading(true);
    setError("");
    const result = await signup(username, displayName, email, password);
    setLoading(false);
    if (result.error) setError(result.error);
    else navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-[350px]">
        <div className="border rounded-sm p-10 bg-card mb-2">
          <h1 className="text-center text-4xl font-semibold mb-3" style={{ fontFamily: "'Segoe UI', sans-serif" }}>
            Instagram
          </h1>
          <p className="text-center text-muted-foreground font-semibold text-sm mb-4">
            Sign up to see photos and videos from your friends.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-xs h-9 bg-secondary" />
            <Input placeholder="Full Name" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="text-xs h-9 bg-secondary" />
            <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="text-xs h-9 bg-secondary" />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-xs h-9 bg-secondary" />
            {error && <p className="text-xs text-destructive text-center">{error}</p>}
            <Button type="submit" disabled={loading} className="mt-2 h-8 text-sm font-semibold">
              {loading ? "Signing up..." : "Sign up"}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-4">
            By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.
          </p>
        </div>
        <div className="border rounded-sm p-5 bg-card text-center text-sm">
          Have an account?{" "}
          <Link to="/login" className="font-semibold text-primary">Log in</Link>
        </div>
      </div>
    </div>
  );
}
