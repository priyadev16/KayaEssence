  "use client";

import { useState } from "react";
import type { SVGProps } from "react";

/* Minimal in-file SVG icon components to avoid dependency on external icon library */
const Plus = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const Send = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20 3-7 7-7-6-6z" />
  </svg>
);

export default function BeautyCommunityPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Aarohi",
      type: "question",
      title: "How do I reduce dark spots quickly?",
      content:
        "I've been struggling with pigmentation. Any product or routine that really works?",
      replies: [
        { user: "Maya", text: "Vitamin C serum and sunscreen daily. Works wonders!" },
      ],
    },
    {
      id: 2,
      user: "Riya",
      type: "tip",
      title: "Daily Skincare Tip ✨",
      content:
        "Always double cleanse at night — helps remove sunscreen & makeup properly.",
      replies: [],
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const [newType, setNewType] = useState("question");

  const submitPost = () => {
    if (!newPost.trim()) return;

    setPosts([
      {
        id: posts.length + 1,
        user: "You",
        type: newType,
        title:
          newType === "question"
            ? "New Question"
            : "New Beauty Tip ✨",
        content: newPost,
        replies: [],
      },
      ...posts,
    ]);

    setNewPost("");
  };

  return (
    <div className="p-10 space-y-12">

      {/* -------------------- HEADER -------------------- */}
      <header className="text-center">
        <h1 className="text-5xl font-bold">Beauty Community</h1>
        <p className="text-gray-600 text-lg mt-2">
          Ask questions • Share tips • Help others • Learn together 💄✨
        </p>
      </header>

      {/* -------------------- CREATE POST -------------------- */}
      <section className="bg-white p-6 rounded-3xl shadow-xl border">
        <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
          <Plus className="text-pink-600" /> Create a Post
        </h2>

        <div className="flex gap-3 mb-3">
          <button
            onClick={() => setNewType("question")}
            className={`px-4 py-2 rounded-xl text-sm ${
              newType === "question"
                ? "bg-pink-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Ask Question
          </button>

          <button
            onClick={() => setNewType("tip")}
            className={`px-4 py-2 rounded-xl text-sm ${
              newType === "tip"
                ? "bg-pink-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Share Tip
          </button>
        </div>

        <textarea
          placeholder={
            newType === "question"
              ? "Ask anything about skincare, makeup, haircare…"
              : "Share your beauty tip or routine…"
          }
          className="w-full p-4 rounded-xl border h-28"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />

        <button
          onClick={submitPost}
          className="mt-4 px-6 py-3 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition"
        >
          Post
        </button>
      </section>

      {/* -------------------- COMMUNITY FEED -------------------- */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">Community Posts</h2>

        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-3xl border shadow p-6"
            >
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-pink-600">{post.user}</span>
                <span
                  className={`text-sm px-3 py-1 rounded-full ${
                    post.type === "question"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {post.type === "question" ? "Question" : "Beauty Tip"}
                </span>
              </div>

              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="mt-2 text-gray-700">{post.content}</p>

              {/* Replies */}
              <div className="mt-4 space-y-2">
                {post.replies.map((reply, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-3 bg-gray-50"
                  >
                    <span className="font-semibold text-pink-500">
                      {reply.user}:
                    </span>{" "}
                    {reply.text}
                  </div>
                ))}
              </div>

              {/* Reply Input */}
              <ReplyBox post={post} posts={posts} setPosts={setPosts} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* -----------------------------------------------
   REPLY COMPONENT
------------------------------------------------*/
function ReplyBox({ post, posts, setPosts }: any) {
  const [text, setText] = useState("");

  const submitReply = () => {
    if (!text.trim()) return;

    const updated = posts.map((p: any) =>
      p.id === post.id
        ? { ...p, replies: [...p.replies, { user: "You", text }] }
        : p
    );

    setPosts(updated);
    setText("");
  };

  return (
    <div className="flex gap-3 mt-4">
      <input
        type="text"
        placeholder="Write a reply…"
        className="flex-1 p-3 rounded-xl border"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={submitReply}
        className="p-3 rounded-xl bg-pink-600 text-white hover:bg-pink-700 transition"
      >
        <Send />
      </button>
    </div>
  );
}
