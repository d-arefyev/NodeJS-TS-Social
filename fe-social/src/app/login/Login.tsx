"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { $api } from "../api/api";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { Logo } from "../atoms/Logo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await $api.post("/auth/login", { email, password });

      // Сохраняем токен и объект пользователя в localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Перенаправляем на главную страницу после успешного логина
      router.push("/home");
    } catch (err: any) {
      const serverMessage = err.response?.data?.message;
      setError(serverMessage || "Incorrect email or password");
    }
  };

  return (
    <div className="flex justify-center items-start mt-[85px] gap-[32px]">
      {/* Picture */}
      <div>
        <Image
          src="/login-pict.png"
          alt="Main picture"
          width={380}
          height={581}
          className="w-[380px] object-cover h-full"
          priority
        />
      </div>

      {/* Form */}
      <div className="w-[350px] flex flex-col justify-center gap-[10px]">
        <div className="flex flex-col items-center px-[40px] pt-[66px] pb-[20px] bg-color-light border-[1px] border-color-gray mt-[10px]">
          <div className="mb-[32px] text-center rounded-[1px]">
            <Logo />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col w-full gap-[6px]">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <p className="text-red-500 text-center text-[12px] mt-[10px]">
                {error}
              </p>
            )}
            <Button type="submit" variant="primary" className="mt-[10px]">
              Log In
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
            <Link href="/reset-pass">Forgot Password?</Link>
          </span>
        </div>

        <div className="w-full h-[63px] flex justify-center items-center bg-color-light border-[1px] border-color-gray">
          <span className="text-[14px]">
            Don't have an account?{" "}
            <Link href="/register" className="text-[14px] font-semibold text-color-accent">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;




// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";

// import { $api } from "../api/api";
// import Button from "../atoms/Button";
// import Input from "../atoms/Input";
// import { Logo } from "../atoms/Logo";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await $api.post("/auth/login", { email, password });
//       localStorage.setItem("token", response.data.token);
//       router.push("/home");
//     } catch (err: any) {
//       const serverMessage = err.response?.data?.message;
//       setError(serverMessage || "Incorrect email or password");
//     }
//   };

//   return (
//     <div className="flex justify-center items-start mt-[85px] gap-[32px]">
//       {/* Picture */}
//       <div>
//         <Image
//           src="/login-pict.png"
//           alt="Main picture"
//           width={380}
//           height={581}
//           className="w-[380px] object-cover h-full"
//           priority
//         />
//       </div>

//       {/* Form */}
//       <div className="w-[350px] flex flex-col justify-center gap-[10px]">
//         <div className="flex flex-col items-center px-[40px] pt-[66px] pb-[20px] bg-color-light border-[1px] border-color-gray mt-[10px]">
//           <div className="mb-[32px] text-center rounded-[1px]">
//             <Logo />
//           </div>
//           <form onSubmit={handleSubmit} className="flex flex-col w-full gap-[6px]">
//             <Input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <Input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {error && (
//               <p className="text-red-500 text-center text-[12px] mt-[10px]">
//                 {error}
//               </p>
//             )}
//             <Button type="submit" variant="primary" className="mt-[10px]">
//               Log In
//             </Button>
//           </form>

//           <div className="w-full flex justify-between items-center mt-[18px] mb-[68px]">
//             <div className="w-full h-[1px] bg-color-gray"></div>
//             <span className="mx-[18px] text-color-dark-gray text-[13px] font-semibold">
//               OR
//             </span>
//             <div className="w-full h-[1px] bg-color-gray"></div>
//           </div>

//           <span className="text-center text-color-link text-[12px]">
//             <Link href="/reset-pass">Forgot Password?</Link>
//           </span>
//         </div>

//         <div className="w-full h-[63px] flex justify-center items-center bg-color-light border-[1px] border-color-gray">
//           <span className="text-[14px]">
//             Don't have an account?{" "}
//             <Link href="/register" className="text-[14px] font-semibold text-color-accent">
//               Sign Up
//             </Link>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;






