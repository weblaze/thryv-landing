"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import SuccessState from "./SuccessState";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof schema>;

export default function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong — try again");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <SuccessState />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
        width: "100%",
        maxWidth: "480px",
        padding: "2.5rem",
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        borderRadius: "24px",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div style={{ position: "relative" }}>
        <input
          {...register("email")}
          type="email"
          placeholder="ENTER YOUR EMAIL"
          autoComplete="email"
          aria-label="Email address"
          style={{
            width: "100%",
            padding: "18px 24px",
            fontSize: "13px",
            fontFamily: "var(--font-mono)",
            letterSpacing: "0.1em",
            color: "#fff",
            background: "rgba(255, 255, 255, 0.04)",
            border: `1px solid ${errors.email ? "rgba(232, 0, 45, 0.5)" : "rgba(255, 255, 255, 0.1)"}`,
            borderRadius: "12px",
            outline: "none",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          onFocus={(e) => {
            if (!errors.email) {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
              e.target.style.background = "rgba(255, 255, 255, 0.07)";
            }
          }}
          onBlur={(e) => {
            if (!errors.email) {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
              e.target.style.background = "rgba(255, 255, 255, 0.04)";
            }
          }}
        />
        {errors.email && (
          <p
            style={{
              color: "var(--red-mid)",
              fontFamily: "var(--font-mono)",
              fontSize: "10px",
              letterSpacing: "0.06em",
              marginTop: "8px",
              textTransform: "uppercase",
              paddingLeft: "4px"
            }}
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "18px 24px",
          fontSize: "13px",
          fontFamily: "var(--font-cond)",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "#fff",
          background: loading ? "rgba(255, 255, 255, 0.1)" : "var(--red-grad)",
          border: "none",
          borderRadius: "12px",
          cursor: loading ? "wait" : "pointer",
          transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: loading ? "none" : "0 8px 16px rgba(232, 0, 45, 0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.8rem",
          position: "relative",
          overflow: "hidden"
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = "scale(1.02)";
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(232, 0, 45, 0.35)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = loading ? "none" : "0 8px 16px rgba(232, 0, 45, 0.25)";
        }}
      >
        {loading && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            style={{ animation: "spin 1s linear infinite" }}
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="white"
              strokeWidth="3"
              strokeDasharray="45"
              strokeDashoffset="15"
              strokeLinecap="round"
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </svg>
        )}
        {loading ? "PROCESSING..." : "GET EARLY ACCESS"}
      </button>

      {error && (
        <p
          style={{
            color: "var(--red-mid)",
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.06em",
            textAlign: "center",
            textTransform: "uppercase"
          }}
        >
          {error}
        </p>
      )}
    </form>
  );
}
