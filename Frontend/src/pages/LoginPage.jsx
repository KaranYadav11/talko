import { Eye, EyeOff, Loader2, Lock, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Label } from "../components/ui/label.jsx";
import { Input } from "../components/ui/input.jsx";
import { Link } from "react-router-dom";
import Logo from "../components/Logo.jsx";
import { toast } from "sonner";
function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    if (!form.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(form.email))
      return toast.error("Invalid email format");
    if (!form.password) return toast.error("Password is required");
    if (form.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      login(form);
    }
  };

  return (
    <div className="min-h-screen bg-background rounded-2xl  grid lg:grid-cols-2">
      {/* Left */}
      <div className="flex flex-col  justify-center items-center sm:pl-6 px-4  sm:p-12">
        <div className="w-full max-w-md space-y-5">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="rounded-xl lg:hidden size-[94px] bg-primary/10 flex items-center justify-center group-hover transition-colors">
                <MessageCircle className="text-primary size-[60px]" />
              </div>
              <h1 className="text-2xl text-primary font-semibold tracking-wide font-heading mt-2">
                Welcome Back !
              </h1>
              <p className="text-xl text-primary/70 font-main font-semibold">
                Login to connect and chat
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <Label className="block text-primary font-heading">Email</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center  pointer-events-none">
                  <Mail className="size-5 text-primary" />
                </div>
                <Input
                  value={form.email}
                  spellCheck="false"
                  type="text"
                  className={`opacity-90 font-sans text-primary placeholder:font-sans placeholder:text-primary/40  w-full pl-10`}
                  placeholder="you@example.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="block text-primary font-heading">
                Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-primary" />
                </div>
                <Input
                  spellCheck="false"
                  value={form.password}
                  type={showPassword ? "text" : "password"}
                  className={` opacity-90 font-sans text-primary placeholder:font-sans placeholder:text-primary/40 w-full pl-10`}
                  placeholder="******"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-primary" />
                  ) : (
                    <Eye className="size-5 text-primary" />
                  )}
                </button>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-primary/90 text-primary-foreground h-11 p-2 text-sm flex items-center justify-center  font-heading rounded-lg gap-1 w-full"
              disabled={isLoggingIn}
              type="submit"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="animate-spin h-[18px] w-[18px]" />
                  <p>Loading...</p>
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="flex items-center text-primary font-heading text-xs justify-center">
            <p>
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="text-primary">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Right */}
      <Logo />
    </div>
  );
}

export default LoginPage;
