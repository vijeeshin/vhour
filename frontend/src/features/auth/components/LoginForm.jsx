import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { loginRequest } from "@/features//auth/store/authSlice";


const schema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm = () => {
 const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { username: "", password: "" },
  });
  const onSubmit = (data) => {
    dispatch(loginRequest(data));
   
  };

  const handleMicrosoftLogin = () => {
    window.location.href = "http://localhost:8080/auth/microsoft";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7]">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <span className="inline-block text-[#FF5A5F] text-4xl font-extrabold tracking-tight">
            vHour
          </span>
          <p className="text-[#767676] text-sm mt-2 font-medium">
            Sign in to continue
          </p>
        </div>

        {/* Card */}
        <div
          className="bg-white rounded-2xl px-8 py-8"
          style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.08)" }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-[13px] font-semibold text-[#484848] mb-1.5 tracking-wide">
                Username
              </label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl text-sm text-[#222222] placeholder:text-[#B0B0B0] focus:outline-none focus:border-[#FF5A5F] focus:ring-2 focus:ring-[#FF5A5F]/20 transition"
                    placeholder="Enter your username"
                  />
                )}
              />
              {errors.username && (
                <p className="text-[#FF5A5F] text-xs mt-1.5 font-medium">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[13px] font-semibold text-[#484848] mb-1.5 tracking-wide">
                Password
              </label>
              <div className="relative">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-3 border border-[#DDDDDD] rounded-xl text-sm text-[#222222] placeholder:text-[#B0B0B0] pr-11 focus:outline-none focus:border-[#FF5A5F] focus:ring-2 focus:ring-[#FF5A5F]/20 transition"
                      placeholder="Enter your password"
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#767676] hover:text-[#484848] transition"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[#FF5A5F] text-xs mt-1.5 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FF5A5F] hover:bg-[#E0484D] active:bg-[#CC4044] text-white py-3 rounded-xl text-sm font-semibold transition-colors disabled:opacity-60 mt-1"
            >
              {isSubmitting ? "Signing in…" : "Continue"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-5">
            <div className="flex-1 h-px bg-[#EBEBEB]" />
            <span className="px-3 text-[#767676] text-xs font-medium">or</span>
            <div className="flex-1 h-px bg-[#EBEBEB]" />
          </div>

          {/* Microsoft Login */}
          <button
            onClick={handleMicrosoftLogin}
            className="w-full flex items-center justify-center gap-2.5 border border-[#DDDDDD] py-3 rounded-xl text-sm font-semibold text-[#484848] hover:border-[#484848] hover:bg-[#F7F7F7] transition"
          >
            <svg width="18" height="18" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
              <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
              <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
              <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
            </svg>
            Continue with Microsoft
          </button>
        </div>

        <p className="text-center text-xs text-[#767676] mt-6">
          By continuing, you agree to our{" "}
          <a href="#" className="underline hover:text-[#484848]">Terms</a> and{" "}
          <a href="#" className="underline hover:text-[#484848]">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
