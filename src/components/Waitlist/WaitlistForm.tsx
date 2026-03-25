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
        gap: "1rem",
        width: "100%",
        maxWidth: "440px",
      }}
    >
      <div style={{ position: "relative" }}>
        <input
          {...register("email")}
          type="email"
          placeholder="your@email.com"
          autoComplete="email"
          aria-label="Email address"
          style={{
            width: "100%",
            padding: "14px 18px",
            fontSize: "16px",
            fontFamily: "var(--font-body)",
            color: "var(--ice)",
            background: "var(--card)",
            border: `0.5px solid ${errors.email ? "var(--red)" : "var(--divider)"}`,
            borderRadius: "10px",
            outline: "none",
            transition: "border-color 0.3s ease",
          }}
          onFocus={(e) => {
            if (!errors.email) e.target.style.borderColor = "var(--red)";
          }}
          onBlur={(e) => {
            if (!errors.email) e.target.style.borderColor = "var(--divider)";
          }}
        />
        {errors.email && (
          <p
            style={{
              color: "var(--red-mid)",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.06em",
              marginTop: "6px",
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
          padding: "14px 28px",
          fontSize: "14px",
          fontFamily: "var(--font-cond)",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#fff",
          background: "var(--red-grad)",
          border: "none",
          borderRadius: "10px",
          cursor: loading ? "wait" : "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          boxShadow: "0 4px 20px rgba(232, 0, 45, 0.3)",
          opacity: loading ? 0.7 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 6px 28px rgba(232, 0, 45, 0.4)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(232, 0, 45, 0.3)";
        }}
      >
        {loading && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            style={{ animation: "spin 1s linear infinite" }}
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="60"
              strokeDashoffset="20"
              strokeLinecap="round"
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </svg>
        )}
        {loading ? "SUBMITTING..." : "GET EARLY ACCESS"}
      </button>

      {error && (
        <p
          style={{
            color: "var(--red-mid)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.06em",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}
    </form>
  );
}
