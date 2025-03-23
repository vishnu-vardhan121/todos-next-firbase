"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/app/components/Input";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/app/redux/features/userSlice";

function LoginPage() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  // const [selectedRol e, setSelectedRole] = useState("user");

  useEffect(() => {
    if (user._id) {
      router.push("/");
    }
  }, [user, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      alert("Both email and password are required.");
      return;
    }
    try {
      const res = await axios.post("/api/auth/login", formData);
      console.log(res);

      if (res.data.user) {
        await dispatch(setUser(res.data.user));
        router.push("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const handleGoogleLogin = async () => {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-[97%] max-w-md p-8 rounded-lg shadow-lg bg-white">
        <h1 className="text-center text-3xl font-bold text-gray-700 mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            className="w-full h-12 bg-appColor hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition duration-300"
            type="submit"
          >
            Login
          </button>

          <div className="text-sm p-2">
            Don't have an account?{" "}
            <Link href="/signin" className="text-blue-600">
              Register here
            </Link>
          </div>
        </form>
      </div>

      {/* Google Login */}
      <div
        className="w-full max-w-md flex justify-center items-center mt-4 rounded-lg shadow-lg bg-white p-3 cursor-pointer"
        onClick={handleGoogleLogin}
      >
        <img src="googlelog.png" alt="" className="w-7 h-7" />
        <p className="ml-2 text-lg">Login with Google</p>
      </div>
    </div>
  );
}

export default LoginPage;
