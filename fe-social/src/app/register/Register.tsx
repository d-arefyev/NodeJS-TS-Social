"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { $api } from "../api/api";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import { Logo } from "../atoms/Logo";

const Register = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await $api.post("/auth/register", {
        email,
        full_name: fullName,
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      router.push("/home");
    } catch (err: any) {
      const serverMessage = err.response?.data?.message;
      if (serverMessage?.includes("email") || serverMessage?.includes("username")) {
        setError("This email or username already exists.");
      } else {
        setError(serverMessage || "Something went wrong");
      }
    }
  };

  return (
    <div className="flex justify-center items-start mt-[80px] gap-[32px]">
      <div className="w-[350px] flex flex-col justify-center gap-[10px]">
        <div className="flex flex-col items-center px-[40px] pt-[53px] pb-[32px] bg-color-light border-[1px] border-color-gray mt-[10px]">
          <div className="mb-[20px] text-center rounded-[1px]">
            <Logo />
          </div>
          <span className="text-center leading-tight font-semibold text-color-dark-gray mb-[38px]">
            Sign up to see photos and videos from your friends.
          </span>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-full gap-[6px]"
          >
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              Sign Up
            </Button>
          </form>
          <span className="text-[12px] text-center mt-[10px]">
            By signing up, you agree to our{" "}
            <Link href="#" className="text-color-link">
              Terms
            </Link>
            ,{" "}
            <Link href="#" className="text-color-link">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-color-link">
              Cookies Policy
            </Link>
            .
          </span>
        </div>
        <div className="w-full h-[63px] flex justify-center items-center bg-color-light border-[1px] border-color-gray">
          <span className="text-[14px]">
            Have an account?{" "}
            <Link href="/login" className="text-[14px] font-semibold text-color-accent">
              Log In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;




// import React from 'react'

// const Register = () => {
//   return (
//     <div>
//       <h1>Login Page</h1>
//     </div>
//   )
// }

// export default Register


// // src/app/register/Register.tsx
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// import { $api } from "../api/api";
// import Button from "../atoms/Button";
// import Input from "../atoms/Input";
// import { Logo } from "../atoms/Logo";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await $api.post("/auth/register", {
//         email,
//         full_name: fullName,
//         username,
//         password,
//       });
//       localStorage.setItem("token", response.data.token);
//       router.push("/");
//     } catch (err: any) {
//       setError(err.response?.data?.error || "Something went wrong");
//     }
//   };

//   return (
//     <div className="flex justify-center items-start mt-[80px] gap-[32px]">
//       <div className="w-[350px] flex flex-col justify-center gap-[10px]">
//         <div className="flex flex-col items-center px-[40px] pt-[53px] pb-[32px] bg-color-light border-[1px] border-color-gray mt-[10px]">
//           <div className="mb-[20px] text-center rounded-[1px]">
//             <Logo />
//           </div>
//           <span className="text-center leading-tight font-semibold text-color-dark-gray mb-[38px]">
//             Sign up to see photos and videos from your friends.
//           </span>
//           <form onSubmit={handleSubmit} className="flex flex-col w-full gap-[6px]">
//             <Input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <Input
//               type="text"
//               placeholder="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required
//             />
//             <Input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
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
//             <Button type="submit" variant="primary" className="mt-[18px]">
//               Sign Up
//             </Button>
//           </form>
//         </div>

//         <div className="w-full h-[63px] flex justify-center items-center bg-color-light border-[1px] border-color-gray">
//           <span className="text-[14px]">
//             Have an account?{" "}
//             <Link href="/login" className="text-[14px] font-semibold text-color-accent">
//               Log In
//             </Link>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;




// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// import { $api } from "../api/api";
// import Button from "../atoms/Button";
// import Input from "../atoms/Input";
// import { Logo } from "../atoms/Logo";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await $api.post("/auth/register", {
//         email,
//         fullName,
//         username,
//         password,
//       });
//       localStorage.setItem("token", response.data.token);
//       router.push("/");
//     } catch (err: any) {
//       setError(err.response?.data?.error || "Something went wrong");
//     }
//   };

//   return (
//     <div className="flex justify-center items-start mt-[80px] gap-[32px]">
//       {/* Form */}
//       <div className="w-[350px] flex flex-col justify-center gap-[10px]">
//         <div className="flex flex-col items-center px-[40px] pt-[53px] pb-[32px] bg-color-light border-[1px] border-color-gray mt-[10px]">
//           <div className="mb-[20px] text-center rounded-[1px]">
//             <Logo />
//           </div>
//           <span className="text-center leading-tight font-semibold text-color-dark-gray mb-[38px]">
//             Sign up to see photos and videos from your friends.
//           </span>
//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col w-full gap-[6px]"
//           >
//             <Input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <Input
//               type="text"
//               placeholder="Full Name"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required
//             />
//             <Input
//               type="text"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
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

//             <span className="text-[12px] leading-tight mt-[20px] text-center">
//               People who use our service may have uploaded your contact
//               information to Instagram.{" "}
//               <Link href="#" className="text-color-link">
//                 More
//               </Link>
//             </span>

//             <span className="text-[12px] text-center mt-[10px]">
//               By signing up, you agree to our{" "}
//               <Link href="#" className="text-color-link">
//                 Terms
//               </Link>
//               ,{" "}
//               <Link href="#" className="text-color-link">
//                 Privacy Policy
//               </Link>{" "}
//               and{" "}
//               <Link href="#" className="text-color-link">
//                 Cookies Policy
//               </Link>
//               .
//             </span>

//             <Button type="submit" variant="primary" className="mt-[18px]">
//               Sign Up
//             </Button>
//           </form>
//         </div>

//         <div className="w-full h-[63px] flex justify-center items-center bg-color-light border-[1px] border-color-gray">
//           <span className="text-[14px]">
//             Have an account?{" "}
//             <Link
//               href="/login"
//               className="text-[14px] font-semibold text-color-accent"
//             >
//               Log In
//             </Link>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
