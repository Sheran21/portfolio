"use client";

import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("Something went wrong.");
        console.error(data);
      }
    } catch (error) {
      console.error(error);
      setStatus("Error sending message.");
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="px-6 py-24 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Heading */}
        <h2 className="text-4xl font-bold">Contact Me</h2>
        <div className="h-[3px] w-32 bg-white mt-3 mb-6 rounded-full" />

        <p className="text-gray-300 max-w-xl mb-10">
          Have a project, collaboration, or opportunity? Feel free to reach out.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white/5 border border-white/10 p-8 rounded-xl"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Your Name"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black border border-white/10 focus:border-purple-500 outline-none"
          />

          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Your Email"
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black border border-white/10 focus:border-purple-500 outline-none"
          />

          <textarea
            name="message"
            value={form.message}
            placeholder="Your Message"
            rows={5}
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-black border border-white/10 focus:border-purple-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 transition rounded-lg font-semibold"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Status message */}
        {status && (
          <p className="text-center mt-6 text-sm text-purple-400">
            {status}
          </p>
        )}

        {/* Direct contact */}
        <p className="text-gray-400 text-sm mt-6 text-center">
          Or email me directly at{" "}
          <span className="text-purple-400">
            samarejanula@gmail.com
          </span>
        </p>
      </div>
    </section>
  );
}