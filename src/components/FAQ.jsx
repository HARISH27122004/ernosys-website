import { useState, useEffect, useRef } from "react";
import "../styles/FAQ.css";
import ProductsSection from "./ProductsSection"

const faqs = [
    {
        question: "What age group are ERNOSYS robotics toys designed for?",
        answer:
            "ERNOSYS robotics toys are specially designed for children aged 5 to 14. Each kit is age-graded to ensure the right level of challenge and fun — from beginner exploration sets for younger kids to advanced programmable robots for teens.",
    },
    {
        question: "Do children need prior coding knowledge to use the kits?",
        answer:
            "No prior coding experience is needed! Our kits use intuitive drag-and-drop interfaces and visual programming environments that make learning to code feel like play. Step-by-step guides are included to help kids build, program, and launch their space robots from day one.",
    },
    {
        question: "What space science concepts do the toys teach?",
        answer:
            "ERNOSYS toys cover a wide range of space science topics including orbital mechanics, satellite communication, rover navigation, planetary geology, and astronaut life-support systems — all embedded naturally into the building and play experience.",
    },
    {
        question: "Are the kits safe for young children?",
        answer:
            "Absolutely. All ERNOSYS products comply with international toy safety standards (EN71, ASTM F963). Components are made from non-toxic, BPA-free materials, and all small parts are secured in age-appropriate sets to minimize any risk.",
    },
    {
        question: "Can ERNOSYS kits be used in schools or STEM programs?",
        answer:
            "Yes! We offer dedicated Education Bundles with curriculum-aligned lesson plans, teacher guides, and classroom management tools. Many schools and after-school programs across 30+ countries already use ERNOSYS to power their STEM programs.",
    },
    {
        question: "What if parts are missing or my robot stops working?",
        answer:
            "We stand behind every kit we ship. If any parts are missing or defective, contact our support team within 30 days and we will dispatch a replacement at no charge. Our customer support operates 7 days a week and typically responds within 24 hours.",
    },
];

/* ── Canvas — exact Ernosys reference background ── */
function ErnosysCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let raf;
        let tick = 0;

        // Size canvas to its CSS-rendered size (the parent section)
        const resize = () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Scattered glowing dots
        const dots = Array.from({ length: 50 }, () => ({
            x: Math.random(),
            y: Math.random(),
            r: Math.random() * 1.3 + 0.4,
            alpha: Math.random() * 0.5 + 0.18,
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.007 + 0.003,
        }));

        const draw = () => {
            tick++;
            const W = canvas.width;
            const H = canvas.height;

            // 1. Base fill — match hero bg
            ctx.fillStyle = "#050916";
            ctx.fillRect(0, 0, W, H);

            // 2. Grid — match hero's CSS grid (52px, sky-blue tint)
            ctx.save();
            ctx.strokeStyle = "rgba(79,195,247,0.06)";
            ctx.lineWidth = 1;
            const GRID = 52;
            for (let x = 0; x <= W; x += GRID) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
            }
            for (let y = 0; y <= H; y += GRID) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
            }
            ctx.restore();

            // 3. Background glows — match hero left/right glows
            const glowL = ctx.createRadialGradient(-150, -100, 0, -150, -100, 600);
            glowL.addColorStop(0, "rgba(21,101,192,0.22)");
            glowL.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = glowL;
            ctx.fillRect(0, 0, W, H);

            const glowR = ctx.createRadialGradient(W + 100, H + 80, 0, W + 100, H + 80, 500);
            glowR.addColorStop(0, "rgba(0,176,255,0.22)");
            glowR.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = glowR;
            ctx.fillRect(0, 0, W, H);

            // 4. Particles — match hero particle color (#4fc3f7)
            dots.forEach((d) => {
                const px = d.x * W;
                const py = d.y * H;
                const a = d.alpha * (0.6 + 0.4 * Math.sin(d.phase + tick * d.speed));

                const halo = ctx.createRadialGradient(px, py, 0, px, py, d.r * 7);
                halo.addColorStop(0, `rgba(79,195,247,${a * 0.5})`);
                halo.addColorStop(1, "rgba(79,195,247,0)");
                ctx.beginPath();
                ctx.arc(px, py, d.r * 7, 0, Math.PI * 2);
                ctx.fillStyle = halo;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(px, py, d.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(79,195,247,${a})`;
                ctx.fill();
            });

            raf = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="faq-canvas" />;
}

/* ── Main FAQ — uses original working accordion logic ── */
export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section className="faq-section">
            {/* Animated canvas background */}
            <ErnosysCanvas />

            <div className="faq-container">
                {/* Header */}
                <div className="faq-header">
                    <span className="faq-eyebrow">SUPPORT CENTER</span>
                    <h2 className="faq-title">
                        Frequently Asked
                        <br />
                        <span className="faq-title--accent">Questions</span>
                    </h2>
                    <p className="faq-subtitle">
                        Everything you need to know about ERNOSYS robotics kits. Can't find
                        your answer?{" "}
                        <a href="#contact" className="faq-link">Contact our team.</a>
                    </p>
                </div>

                {/* Accordion — original working toggle */}
                <div className="faq-list">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className={`faq-item ${openIndex === i ? "faq-item--open" : ""}`}
                            onClick={() => toggle(i)}
                        >
                            <div className="faq-item-header">
                                <span className="faq-index">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="faq-question">{faq.question}</h3>
                                <div className="faq-icon">
                                    <span className="faq-icon-bar faq-icon-bar--h" />
                                    <span
                                        className={`faq-icon-bar faq-icon-bar--v ${openIndex === i ? "faq-icon-bar--hidden" : ""
                                            }`}
                                    />
                                </div>
                            </div>
                            <div
                                className="faq-answer-wrapper"
                                style={{
                                    maxHeight: openIndex === i ? "300px" : "0px",
                                }}
                            >
                                <p className="faq-answer">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="faq-cta">
                    <div className="faq-cta-ring" />
                    <p className="faq-cta-text">Still have questions?</p>
                    <button className="faq-cta-btn">
                        <span>Launch Support Chat</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8H13M13 8L9 4M13 8L9 12"
                                stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
}