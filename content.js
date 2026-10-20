/*
  All site text, links and data live here.
  Edit this file to update the site; index.html, styles.css and main.js read from it.
  (Loaded as a plain script so the site also works when opened from disk.)
*/
window.CONTENT = {
  meta: {
    title: "Yaad Kamrul Bari | AI & Robotics Engineer",
    description:
      "Yaad Kamrul Bari: AI & robotics engineer working on agentic AI, computer vision and autonomous underwater vehicles."
  },

  person: {
    name: "Yaad Kamrul Bari",
    initials: "YKB"
  },

  nav: {
    links: [
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Skills", href: "#skills" },
      { label: "Contact", href: "#contact" }
    ],
    // Put the PDF in assets/ with this exact name (or change the path here).
    cv: { label: "Download CV", href: "assets/Yaad_Kamrul_Bari_CV.pdf" }
  },

  hero: {
    eyebrow: "BRACU Duburi · AI & Machine Vision Lead",
    name: "Yaad Kamrul Bari",
    role: "AI & Robotics Engineer: agentic AI, computer vision, autonomous robots",
    // Placeholder intro, two sentences.
    intro:
      "I led the AI & Machine Vision sub-team for BRACU Duburi, Bangladesh's first autonomous underwater vehicle, which placed 8th of 58 teams at RoboSub 2025 and 2026. I build perception and agentic AI systems that help robots see, decide and act on their own.",
    actions: [
      { label: "See projects", href: "#projects", style: "primary" },
      { label: "Get in touch", href: "#contact", style: "secondary" }
    ],
    facts: ["RoboSub 2025 & 2026: 8th of 58", "BSc CS, BRAC University", "CGPA 3.96"]
  },

  // Small readouts around the pixel scene.
  hud: {
    depthLabel: "Depth",
    depth: "0.0",
    depthUnit: "m",
    headingLabel: "Hdg",
    heading: 87,
    batteryLabel: "Batt",
    battery: "92%",
    status: "Mission: join a research team",
    detection: { label: "auv", confidence: 0.99 }
  }
};
