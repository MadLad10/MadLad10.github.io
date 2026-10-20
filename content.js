/*
  All site text, links and data live here.
  Edit this file to update the site; index.html, styles.css and main.js read from it.
  (Loaded as a plain script so the site also works when opened from disk.)

  MEDIA SLOTS: every `image: ""` below is an empty slot that shows a placeholder box.
  Drop a file into assets/ and put its path in the quotes, e.g. image: "assets/projects/agentic-auv.gif".
  The `slot` text next to it is the suggested file name and size.
*/
window.CONTENT = {
  meta: {
    title: "Yaad Kamrul Bari | AI & Robotics Engineer",
    description:
      "Yaad Kamrul Bari: Computer Science graduate (BRAC University, CGPA 3.96) working on agentic AI, computer vision and autonomous underwater vehicles. AI & Machine Vision lead at BRACU Duburi, 8th of 58 at RoboSub 2025 and 2026."
  },

  person: {
    name: "Yaad Kamrul Bari",
    initials: "YKB",
    email: "yaadbari21@gmail.com",
    location: "Dhaka, Bangladesh"
  },

  nav: {
    links: [
      { label: "Projects", href: "#projects" },
      { label: "Experience", href: "#experience" },
      { label: "Skills", href: "#skills" },
      { label: "Contact", href: "#contact" }
    ],
    // Put a PDF in assets/ with this exact name (use a version WITHOUT your phone number).
    cv: { label: "Download CV", href: "assets/Yaad_Kamrul_Bari_CV.pdf" }
  },

  // Depth meter stops, in page order. `id` must match a section id in index.html.
  zones: [
    { id: "top", label: "Surface", depth: 0 },
    { id: "about", label: "About", depth: 20 },
    { id: "robosub", label: "RoboSub", depth: 60 },
    { id: "projects", label: "Projects", depth: 150 },
    { id: "experience", label: "Experience", depth: 320 },
    { id: "education", label: "Education", depth: 430 },
    { id: "skills", label: "Inventory", depth: 550 },
    { id: "awards", label: "Awards", depth: 800 },
    { id: "contact", label: "Seabed", depth: 1100 }
  ],

  hero: {
    eyebrow: "BRACU Duburi · AI & Machine Vision Lead",
    name: "Yaad Kamrul Bari",
    role: "AI & Robotics Engineer: agentic AI, computer vision, autonomous robots",
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
    depthUnit: "m",
    headingLabel: "Hdg",
    heading: 87,
    batteryLabel: "Batt",
    battery: "92%",
    status: "Mission: join a research team",
    detection: { label: "auv", confidence: 0.99 }
  },

  about: {
    title: "About",
    paragraphs: [
      "I'm a Computer Science graduate from BRAC University (CGPA 3.96/4.0), working where AI meets robots. At BRACU Duburi, Bangladesh's first autonomous underwater vehicle, I led the AI and Machine Vision sub-team and took the perception pipeline from data curation all the way to TensorRT deployment on a Jetson, inside a ROS2 stack.",
      "I also build LLM agents, multi-agent systems and RAG applications with LangGraph, FastAPI and PostgreSQL/pgvector. I want to join a research-driven team building reliable AI and autonomous systems for real-world, resource-constrained environments."
    ],
    card: {
      title: "Operator ID",
      // PHOTO SLOT: a portrait, about 600x750 px, e.g. "assets/photo.jpg"
      image: "assets/photo.jpg",
      slot: "assets/photo.jpg · 4:5 portrait",
      alt: "Portrait of Yaad Kamrul Bari",
      facts: [
        { label: "Based in", value: "Dhaka, Bangladesh" },
        { label: "Now", value: "Research Assistant, Dubotech Digital" },
        { label: "Degree", value: "BSc Computer Science, BRAC University (2026)" },
        { label: "CGPA", value: "3.96 / 4.0" },
        { label: "Focus", value: "Agentic AI · Computer vision · Robotics" }
      ]
    }
  },

  featured: {
    tag: "Headline mission",
    title: "Bangladesh's first AUV. 8th of 58 at RoboSub. Twice.",
    // IMAGE SLOT: a wide team / vehicle photo, about 1600x700 px, e.g. "assets/robosub-team.jpg"
    image: "",
    slot: "assets/robosub-team.jpg · wide photo, 16:7",
    alt: "BRACU Duburi team with their AUV at RoboSub",
    paragraphs: [
      "RoboSub is RoboNation's international autonomous underwater robotics competition, held at the Woollett Aquatics Center in California. With BRACU Duburi I placed 8th of 58 teams in 2025 as Technical Coordinator, and again in 2026 as Sub-Team Lead of AI and Machine Vision.",
      "My sub-team owned the vehicle's eyes: we curated and annotated the underwater dataset, trained YOLO11 to 0.995 mAP50, pruned the model and deployed it with TensorRT on a Jetson Orin Nano with ByteTrack tracking, all inside the ROS2 stack."
    ],
    stats: [
      { value: "8th / 58", label: "RoboSub 2026 · AI & Vision lead" },
      { value: "8th / 58", label: "RoboSub 2025 · Technical Coordinator" },
      { value: "0.995", label: "mAP50, YOLO11 detector" },
      { value: "Jetson", label: "Orin Nano · TensorRT · ByteTrack" }
    ],
    links: [
      { label: "See the vision pipeline", href: "https://github.com/MadLad10/BRACU-Duburi-AUV-Vision-Pipeline" },
      { label: "About RoboSub", href: "https://robonation.org/programs/robosub/" }
    ]
  },

  projects: {
    title: "Projects",
    lede: "Four levels I'm proudest of. Hover or tab through them to run detection.",
    featured: [
      {
        title: "Agentic AUV",
        kind: "Multi-agent AI",
        summary:
          "Fault-tolerant multi-agent LLM system that plans underwater missions from plain English and keeps working through sensor faults.",
        stat: { label: "Fusion", value: "EKF · Sonar · VLM" },
        tags: ["LangGraph", "VLM", "Tool calling", "Sensor fusion", "Guardrails"],
        // IMAGE/GIF SLOT, 16:9, e.g. "assets/projects/agentic-auv.gif"
        image: "",
        slot: "assets/projects/agentic-auv.gif · 16:9",
        detect: { label: "agentic_auv", confidence: 0.98 },
        links: [{ label: "Code", href: "https://github.com/MadLad10/Agentic-AUV-multimodal-multi-agent-autonomy-for-an-underwater-robot" }]
      },
      {
        title: "BRACU Duburi Vision Pipeline",
        kind: "Computer vision",
        summary:
          "Perception for Bangladesh's first AUV, from annotation to real-time detection and ByteTrack tracking on a Jetson Orin Nano.",
        stat: { label: "mAP50", value: "0.995" },
        tags: ["YOLO11", "PyTorch", "TensorRT", "ROS2", "Jetson"],
        image: "",
        slot: "assets/projects/duburi-vision.gif · 16:9",
        detect: { label: "vision_pipeline", confidence: 0.99 },
        links: [{ label: "Code", href: "https://github.com/MadLad10/BRACU-Duburi-AUV-Vision-Pipeline" }]
      },
      {
        title: "AUV LLM Mission Planner",
        kind: "LLM agent",
        summary:
          "Turns plain-English commands into robot missions; guardrails validate every plan and the agent re-plans on failure.",
        stat: { label: "Gazebo missions", value: "25" },
        tags: ["LLM agents", "Ollama", "Structured outputs", "ROS2", "Gazebo"],
        image: "",
        slot: "assets/projects/mission-planner.gif · 16:9",
        detect: { label: "mission_planner", confidence: 0.97 },
        links: [{ label: "Code", href: "https://github.com/MadLad10/AUV-LLM-Mission-Planner-Agentic-AI-for-Autonomous-Underwater-Vehicles" }]
      },
      {
        title: "bari",
        kind: "Agentic RAG",
        summary:
          "AI housing assistant for students in Dhaka, in English and Bangla, with hybrid vector search, re-ranking and human-in-the-loop approval.",
        stat: { label: "Injection attacks blocked", value: "100%" },
        tags: ["LangGraph", "RAG", "FastAPI", "React", "pgvector"],
        image: "",
        slot: "assets/projects/bari.png · 16:9",
        detect: { label: "rag_agent", confidence: 0.96 },
        links: [{ label: "Code", href: "https://github.com/MadLad10/bari.com" }]
      }
    ],
    moreTitle: "More projects",
    more: [
      {
        title: "Pinstagram",
        summary: "Instagram-style app for discovering places in Bangladesh, with semantic search, RAG review summaries and an AI trip agent.",
        tags: ["FastAPI", "React Native", "Next.js", "PostGIS", "pgvector"],
        links: [
          { label: "Code", href: "https://github.com/MadLad10/Pinstagram" },
          { label: "Live", href: "https://pinstagram-mobile.vercel.app" }
        ]
      },
      {
        title: "Duburi Vision Pipeline Dashboard",
        summary: "Dashboard for reviewing training results per task, plus n8n workflows that send video clips to annotators and collect labels.",
        tags: ["Streamlit", "Plotly", "n8n"],
        links: [{ label: "Code", href: "https://github.com/MadLad10/BRACU-Duburi-Vision-Pipeline-Dashboard" }]
      },
      {
        title: "Weather-Robust Object Detection with GANs",
        summary: "Pix2Pix generates snow, rain and fog scenes so a YOLOv5 detector stays reliable in bad weather.",
        tags: ["PyTorch", "Pix2Pix", "YOLOv5"],
        links: [{ label: "Code", href: "https://github.com/MadLad10/An-efficient-object-detection-technique-for-autonomous-vehicles-using-advanced-GAN-model-" }]
      },
      {
        title: "MindWell",
        summary: "Employee wellness platform with periodic check-ins, email reminders and role-based dashboards; FastAPI backend with JWT auth.",
        tags: ["FastAPI", "React", "PostgreSQL"],
        // Add the repo link here if it's public: { label: "Code", href: "https://github.com/..." }
        links: []
      }
    ]
  },

  // logo: a file in assets/logos/ (square PNG works best). Leave it "" to show the `mark` monogram instead.
  // Logos sit on a light plate; set logoBg (a colour) for a logo that needs a different background.
  experience: {
    title: "Experience",
    lede: "Mission log, newest first.",
    items: [
      {
        role: "Research Assistant",
        org: "Dubotech Digital Ltd.",
        place: "Dhaka, Bangladesh",
        dates: "May 2026 – Present",
        status: "Active",
        logo: "assets/logos/dubotech.png",
        logoBg: "#09335d", // white logo, shown on Dubotech's brand navy
        mark: "DT",
        points: [
          "Contribute to research and development on underwater robotic systems, supporting design, implementation and testing across the vehicle stack."
        ]
      },
      {
        role: "Sub-Team Lead, AI and Machine Vision",
        org: "BRACU Duburi, Bangladesh's first AUV",
        place: "Dhaka, Bangladesh",
        dates: "Apr 2026 – Jul 2026",
        status: "Complete",
        logo: "assets/logos/duburi.png",
        mark: "BD",
        points: [
          "Led the end-to-end ML pipeline for underwater object detection and tracking with YOLO and tracking algorithms: dataset curation, annotation, training and deployment.",
          "Contributed to the team's 8th-place finish among 58 international teams at RoboSub 2026."
        ]
      },
      {
        role: "Undergraduate Teaching Assistant",
        org: "Dept. of Computer Science and Engineering, BRAC University",
        place: "Dhaka, Bangladesh",
        dates: "Feb 2025 – May 2026",
        status: "Complete",
        logo: "assets/logos/bracu.png",
        mark: "BU",
        points: [
          "Ran 15 hours of weekly consultation, helping students with coursework and problem-solving.",
          "Guided students through algorithm design and analysis."
        ]
      }
    ]
  },

  education: {
    title: "Education",
    lede: "Training log, newest first.",
    items: [
      {
        degree: "BSc in Computer Science",
        org: "BRAC University",
        place: "Dhaka, Bangladesh",
        dates: "Sep 2022 – Jun 2026",
        grade: "CGPA 3.96 / 4.0",
        logo: "assets/logos/bracu.png",
        mark: "BU"
      },
      {
        degree: "Higher Secondary Certificate (2021)",
        org: "Notre Dame College",
        place: "Dhaka, Bangladesh",
        dates: "Jul 2019 – Dec 2021",
        grade: "GPA 5.0 / 5.0",
        logo: "assets/logos/ndc.png",
        mark: "ND"
      },
      {
        degree: "Secondary School Certificate (2019)",
        org: "Dhaka Residential Model College",
        place: "Dhaka, Bangladesh",
        dates: "Jan 2011 – Mar 2019",
        grade: "GPA 5.0 / 5.0",
        logo: "assets/logos/drmc.png",
        mark: "DR"
      }
    ]
  },

  skills: {
    title: "Inventory",
    lede: "The tools I carry on every dive.",
    // icon: one of code, agent, eye, robot, chip, db, screen, tool
    groups: [
      { name: "AI & LLMs", icon: "agent", items: ["Agentic AI", "LLM agents", "Multi-agent systems", "RAG", "LangGraph", "Tool calling", "VLMs", "LLM evaluation"] },
      { name: "Machine learning & vision", icon: "eye", items: ["PyTorch", "TensorFlow", "OpenCV", "YOLO", "NumPy", "Pandas", "Matplotlib", "Seaborn"] },
      { name: "Robotics", icon: "robot", items: ["ROS2", "Gazebo", "MuJoCo", "Pixhawk", "Sensor fusion", "Kalman filters"] },
      { name: "Edge AI", icon: "chip", items: ["Jetson Nano / Orin Nano", "TensorRT", "ONNX", "Model pruning", "Edge deployment"] },
      { name: "Programming", icon: "code", items: ["Python", "C", "C++", "Java"] },
      { name: "Backend & databases", icon: "db", items: ["FastAPI", "SQLAlchemy", "REST APIs", "PostgreSQL", "PostGIS", "pgvector", "MySQL", "Redis"] },
      { name: "Frontend", icon: "screen", items: ["React", "React Native", "Next.js"] },
      { name: "Tools", icon: "tool", items: ["Docker", "Git", "GitHub Actions", "pytest", "Ollama"] }
    ]
  },

  awards: {
    title: "Awards",
    // icon: trophy or medal
    items: [
      {
        icon: "trophy",
        place: "8th of 58",
        event: "RoboSub 2026",
        detail: "RoboNation, Woollett Aquatics Center, California. Sub-Team Lead of AI and Machine Vision."
      },
      {
        icon: "trophy",
        place: "8th of 58",
        event: "RoboSub 2025",
        detail: "RoboNation, Woollett Aquatics Center, California. Technical Coordinator."
      },
      {
        icon: "medal",
        place: "2nd Runner Up",
        event: "National Telco Warfare Datathon 2024",
        detail: "East West University. VGG19-based image classification model with about 90% accuracy."
      }
    ]
  },

  contact: {
    title: "Send transmission",
    text: "I'm looking to join a research lab or an AI and robotics team. Email is the fastest way to reach me.",
    copyLabel: "Copy email",
    copiedLabel: "Copied",
    mailLabel: "Email me",
    links: [
      { label: "GitHub", href: "https://github.com/MadLad10" },
      // Paste your LinkedIn profile URL here; the link stays hidden while it's empty.
      { label: "LinkedIn", href: "" },
      { label: "Download CV", href: "assets/Yaad_Kamrul_Bari_CV.pdf", download: true }
    ],
    references: "References from Dr. Md. Khalilur Rhaman and Dr. Md. Golam Rabiul Alam (Professors, CSE, BRAC University) are available on request."
  },

  footer: {
    text: "Built with plain HTML, CSS and JavaScript. Pixel art drawn in code.",
    top: "Back to the surface"
  }
};
