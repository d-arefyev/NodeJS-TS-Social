// src/app/reset-pass/ResetPass.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { $api } from "../api/api";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Lock from "../atoms/Lock";
import { Logo } from "../atoms/Logo";

const ResetPassword = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await $api.post("/auth/reset-password", {
        emailOrUsername,
      });
      router.push("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex h-[60px] border-b-[1px] border-color-gray items-center px-[50px]">
      <div className="w-[90px]">
        <Logo />
      </div>
      </div>
      <div className="flex justify-center items-start mt-[80px] gap-[32px]">
        {/* Form */}
        <div className="w-[390px] flex flex-col justify-center gap-[10px]">
          <div className="flex flex-col items-center px-[45px] pt-[25px] pb-[20px] bg-color-light border-[1px] border-color-gray mt-[12px]">
            <Lock />
            <p className="font-semibold text-color-dark mt-[14px] mb-[6px]">
              Trouble logging in?
            </p>

            <span className="text-center leading-tight text-[14px] text-color-dark-gray mb-[14px]">
              Enter your email, phone, or username and we'll send you a link to
              get back into your account.
            </span>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full gap-[6px]"
            >
              <Input
                type="text"
                placeholder="Email or Username"
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                required
              />
              {error && (
                <p className="text-red-500 text-center text-[12px] mt-[10px]">
                  {error}
                </p>
              )}

              <Button type="submit" variant="primary" className="mt-[12px]">
                Reset your password
              </Button>
            </form>

            <div className="w-full flex justify-between items-center mt-[18px] mb-[68px]">
              <div className="w-full h-[1px] bg-color-gray"></div>
              <span className="mx-[18px] text-color-dark-gray text-[13px] font-semibold">
                OR
              </span>
              <div className="w-full h-[1px] bg-color-gray"></div>
            </div>

            <span className="text-center text-color-link text-[12px]">
              <Link href="/register">Create new account</Link>
            </span>
          </div>

          {/* Раздел с "Back to Login" */}
          <div className="w-full h-[63px] flex justify-center items-center bg-color-light border-[1px] border-color-gray">
            <span className="text-[14px]">
              Back to{" "}
              <Link
                href="/login"
                className="text-[14px] font-semibold text-color-accent"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
