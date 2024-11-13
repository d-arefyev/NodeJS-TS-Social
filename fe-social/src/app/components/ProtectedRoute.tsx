// src/app/components/ProtectedRoute.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;





// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter, usePathname } from "next/navigation";

// const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();
//   const pathname = usePathname();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (pathname === "/login") {
//       setIsLoading(false);
//       return;
//     }

//     if (!token) {
//       router.push("/login");
//     } else {
//       setIsLoading(false);
//     }
//   }, [router, pathname]);

//   if (isLoading) {
//     return <div>Loading...</div>; 
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;
