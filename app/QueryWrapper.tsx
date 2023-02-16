"use client";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();
interface Props {
  children?: ReactNode;
}
const QueryWrapper = ({ children }: Props) => (
  <QueryClientProvider client={queryClient}>
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "#363636",
          color: "#fff",
        },
      }}
    />
    {children}
  </QueryClientProvider>
);

export default QueryWrapper;
