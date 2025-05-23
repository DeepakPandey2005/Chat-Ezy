import {
  MessageSquareText,
  UserCircle,
  Rocket,
  Zap,
  Code2,
  LayoutDashboard,
} from "lucide-react";

const About = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12 text-center shadow-xl rounded-2xl mt-10">
      <div className="flex justify-center mb-4">
        <Rocket className="text-blue-600 w-10 h-10" />
      </div>

      <h2 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to TechEzy 🚀
      </h2>

      <p className="text-gray-700 text-lg leading-relaxed mb-4">
        <span className="inline-flex items-center gap-2 font-semibold">
          <UserCircle className="w-5 h-5 text-blue-500" />
          Created by Deepak Pandey
        </span>
        , a Computer Science student passionate about full-stack development.
      </p>

      <p className="text-gray-600 text-base mb-6">
        <strong>TechEzy</strong> is a real-time chat application built as a
        hobby project using the powerful{" "}
        <span className="font-semibold text-blue-500">MERN Stack</span>{" "}
        (MongoDB, Express.js, React.js, Node.js). At its heart, it uses
        <span className="inline-flex items-center gap-1 text-blue-500 font-semibold mx-1">
          <Zap className="w-4 h-4" /> Socket.IO
        </span>
        to enable instant messaging between users.
      </p>

      <p className="text-gray-600 text-base mb-6">
        From the very beginning, TechEzy was envisioned as a clean, fast, and
        user-friendly chat experience — something you can use personally or with
        friends. Every line of code was crafted with care, not for profit, but
        for passion — a project that allowed me to explore real-world web
        technologies and sharpen my skills.
      </p>

      <div className="grid md:grid-cols-3 gap-6 text-left mt-10">
        <div className="bg-blue-50 p-5 rounded-xl shadow">
          <div className="flex items-center gap-2 mb-2 text-blue-600">
            <Code2 className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Built with MERN Stack</h3>
          </div>
          <p className="text-sm text-gray-700">
            Leveraging MongoDB, Express, React, and Node.js for full-stack
            capability and scalability.
          </p>
        </div>

        <div className="bg-blue-50 p-5 rounded-xl shadow">
          <div className="flex items-center gap-2 mb-2 text-blue-600">
            <Zap className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Real-time Messaging</h3>
          </div>
          <p className="text-sm text-gray-700">
            Socket.IO integration allows users to chat live with no delays or
            reloads.
          </p>
        </div>

        <div className="bg-blue-50 p-5 rounded-xl shadow">
          <div className="flex items-center gap-2 mb-2 text-blue-600">
            <LayoutDashboard className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Attractive UI</h3>
          </div>
          <p className="text-sm text-gray-700">
            A modern and responsive interface designed for simplicity,
            accessibility, and speed.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-gray-600 text-base">
          Whether you're building connections or testing your tech —{" "}
          <span className="font-semibold text-blue-500">TechEzy</span> keeps
          your conversations flowing smoothly.
        </p>
        <div className="flex justify-center mt-6">
          <MessageSquareText className="w-12 h-12 text-blue-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default About;
