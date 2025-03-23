"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Input from "@/app/components/Input";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/features/userSlice";

function SigninPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (user._id) {
      router.push("/");
    }
  }, []);
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);

      if (formData.password !== formData.confirmpassword) {
        return toast.error("password and confirm password should be same");
      }

      const res = await axios.post("/api/auth/register", formData);

      const data = res.data;

      if (data.user) {
        await dispatch(setUser(data.user));
        router.push("/");
      }
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.error);
    }
    // Handle response
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-96 p-8 rounded-lg shadow-lg bg-white">
        <h1 className="text-center text-3xl font-bold text-gray-700 mb-6">
          Sign Up
        </h1>

        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col gap-5"
        >
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            value={formData.confirmpassword}
            onChange={handleChange}
          />

          <button
            className="w-full h-12 bg-appColor hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition duration-300"
            type="submit"
          >
            Sign Up
          </button>

          <div className="text-sm p-2 text-center">
            Have an account?{" "}
            <Link href="/login" className="text-blue-600">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SigninPage;
