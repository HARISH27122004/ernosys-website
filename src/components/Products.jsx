import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Products.css";
import BackButton from "./BackButton";
import FlipProductCard from "./FlipProductCard";

const products = [
  {
    id: 1,
    image:'https://plus.unsplash.com/premium_photo-1682123676241-d4c275c6ce7d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9ib3RpY3MlMjBraXR8ZW58MHx8MHx8fDA%3D',
    title: "Robotics Kit",
    tag: "BESTSELLER",
    tagColor: "#00e5ff",
    description:
      "Build and program simple robots from scratch. Introduces children to basic coding logic, circuits, and mechanical assembly.",
    ageRange: "Ages 8–14",
    level: "Beginner",
    price: "₹2,499",
    features: ["Coding Logic", "Circuit Building", "Mechanical Assembly"],
  },
  {
    id: 2,
    image: "https://plus.unsplash.com/premium_photo-1714618891990-f9b67e32d543?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNwYWNlJTIwcm92ZXJ8ZW58MHx8MHx8fDA%3D",
    title: "Space Rover",
    tag: "NEW",
    tagColor: "#00ffb3",
    description:
      "Explore planetary surfaces with this remote-controlled rover kit. Learn about terrain navigation and space exploration.",
    ageRange: "Ages 7–12",
    level: "Intermediate",
    price: "₹3,199",
    features: ["Remote Control", "Terrain Navigation", "Space Concepts"],
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1711560217836-f42ac4a11a4f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGxhbmV0YXJ5JTIwa2l0fGVufDB8fDB8fHww",
    title: "Planetary Kit",
    tag: "POPULAR",
    tagColor: "#a78bfa",
    description:
      "Create accurate scale models of planets in our solar system. Understand orbits, gravity, and cosmic scale.",
    ageRange: "Ages 5–10",
    level: "Beginner",
    price: "₹1,799",
    features: ["Scale Models", "Orbital Mechanics", "Solar System Facts"],
  },
  {
    id: 4,
    image: "https://plus.unsplash.com/premium_photo-1714618982739-a48bdef8a73b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2F0ZWxsaXRlJTIwTW9kZWx8ZW58MHx8MHx8fDA%3D",
    title: "Satellite Model",
    tag: "ADVANCED",
    tagColor: "#f59e0b",
    description:
      "Learn how satellites orbit Earth and communicate. Build a working model that teaches signal concepts and space tech.",
    ageRange: "Ages 10–14",
    level: "Advanced",
    price: "₹4,299",
    features: ["Signal Theory", "Orbital Paths", "Real Engineering"],
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1654280983312-110b5b422397?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R2FsYXh5JTIwRXhwbG9yZXJ8ZW58MHx8MHx8fDA%3D",
    title: "Galaxy Explorer",
    tag: "PREMIUM",
    tagColor: "#ec4899",
    description:
      "Dive deep into galaxy formation with interactive star maps and 3D constellation models for the ultimate space enthusiast.",
    ageRange: "Ages 9–14",
    level: "Advanced",
    price: "₹5,499",
    features: ["Star Mapping", "Constellation Models", "Galaxy Science"],
  },
  {
    id: 6,
    image: "https://plus.unsplash.com/premium_photo-1734370874112-f32019ac6a97?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8VGVsZXNjb3BlJTIwS2l0fGVufDB8fDB8fHww",
    title: "Telescope Kit",
    tag: "CLASSIC",
    tagColor: "#34d399",
    description:
      "Assemble your own working telescope and observe the moon, stars, and planets with guided stargazing activities.",
    ageRange: "Ages 6–14",
    level: "Beginner",
    price: "₹2,999",
    features: ["Moon Observation", "Star Gazing", "Lens Assembly"],
  },
];

const whyCards = [
  {
    emoji: "🧠",
    title: "Hands-on Learning",
    desc: "Kids learn by building, experimenting, and playing with robotics kits and space models that spark curiosity.",
  },
  {
    emoji: "⚡",
    title: "Interactive Fun",
    desc: "Each product is designed to make complex space science concepts easy, exciting, and unforgettable.",
  },
  {
    emoji: "🌟",
    title: "Skill Development",
    desc: "Develops problem-solving, creativity, and logical thinking skills in young learners aged 5–14.",
  },
];

export default function Products() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setVisible(true);
  }, []);

  const filters = ["All", "Beginner", "Intermediate", "Advanced"];

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => p.level === activeFilter);

  return (
    <div className={`products-page ${visible ? "page-visible" : ""}`}>
     

      {/* ── Background layers (same as PageBackground) ── */}
      <div className="prod-bg">
        <div className="prod-bg__stars" />
        <div className="prod-bg__grid" />
        <div className="prod-bg__nebula" />
        <div className="prod-bg__glow prod-bg__glow--tl" />
        <div className="prod-bg__glow prod-bg__glow--br" />
        <div className="prod-bg__glow prod-bg__glow--mid" />
      </div>
        <BackButton />
      {/* Hero Banner */}
      <section className="products-hero">
        <div className="particle-container">
  {[...Array(40)].map((_, index) => (
    <span
      key={index}
      className="particle"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${8 + Math.random() * 8}s`,
      }}
    />
  ))}
</div>
        <div className="hero-grid-lines" />
        <div className="hero-content">
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-home">
  Home
</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">Products</span>
          </nav>
          <h1 className="hero-title">Products</h1>
          <div className="hero-glow-bar" />
        </div>
      </section>

      {/* Product Intro */}
      <section className="intro-section">
        <div className="intro-inner">
          <p className="intro-eyebrow">EXPLORE OUR COLLECTION</p>
          <h2 className="intro-heading">
            Our{" "}
            <span className="teal">
              Robotics Science Kits and Satellite Kits
            </span>{" "}
            with Robotics Toys and Satellite Toys
          </h2>
          <p className="intro-sub">
            Innovative educational toys designed to teach students aged 5–14
            about space and robotics concepts through fun, hands-on learning.
          </p>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                <span>{f}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="products-grid-section">
<div className="products-grid">
  {filtered.map((product, idx) => (
    <FlipProductCard
      key={product.id}
      product={product}
      index={idx}
    />
  ))}
</div>
      </section>



      {/* CTA Banner */}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="cta-orb cta-orb-left" />
          <div className="cta-orb cta-orb-right" />
          <h2 className="cta-heading">
            Ready to Launch Your Child's{" "}
            <span className="teal">Space Journey?</span>
          </h2>
          <p className="cta-sub">
            Join 5,000+ kids already exploring the universe through play.
          </p>
          <div className="cta-buttons">
            <button className="cta-primary">Shop All Products →</button>
            <button className="cta-secondary">Watch Demo</button>
          </div>
        </div>
      </section>

    </div>
  );
}