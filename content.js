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
      { label: "Experience", href: "#experience" },
      { label: "Projects", href: "#projects" },
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
    { id: "experience", label: "Experience", depth: 120 },
    { id: "education", label: "Education", depth: 220 },
    { id: "projects", label: "Projects", depth: 350 },
    { id: "skills", label: "Inventory", depth: 550 },
    { id: "awards", label: "Awards", depth: 800 },
    { id: "contact", label: "Seabed", depth: 1100 }
  ],

  hero: {
    eyebrow: "", // small label above the name; "" hides it
    name: "Yaad Kamrul Bari",
    titles: ["Autonomous Systems Engineer", "Computer Vision Engineer", "Agentic AI Engineer"],
    // Short lines under the title tags; the first one is shown slightly stronger.
    intro: [
      "I build robots that see and agents that plan."
    ],
    actions: [
      { label: "See projects", href: "#projects", style: "primary" },
      { label: "Get in touch", href: "#contact", style: "secondary" }
    ],
    facts: [] // short facts under the buttons, e.g. ["CGPA 3.96"]; empty hides the row
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
      "I'm Yaad, a Computer Science graduate from BRAC University in Dhaka. I care about both sides of the field: the research that explains why something works, and the engineering that makes it work on real hardware.",
      "On the academic side, I spent over a year as an undergraduate teaching assistant, running weekly consultations and helping students think through algorithm design. On the industry side, I'm a Research Assistant at Dubotech Digital working on underwater robotics R&D, after leading the AI and Machine Vision sub-team at BRACU Duburi.",
      "Outside of that, I build things for fun: agents, vision pipelines and robot planners in simulation. I like to experiment and see what breaks, but I always aim for something meaningful that could actually add value for someone."
    ],
    card: {
      title: "Person of interest",
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

  // Compact RoboSub highlight at the bottom of About.
  featured: {
    tag: "Headline mission",
    title: "Bangladesh's first AUV. 8th of 58 at RoboSub. Twice.",
    text:
      "RoboSub, organised by RoboNation, is the biggest student competition for autonomous underwater vehicles. With BRACU Duburi we placed 8th of 58 teams in 2025, when I was Technical Coordinator, and again in 2026, when I led the AI and Machine Vision sub-team.",
    stats: [
      { value: "8th / 58", label: "RoboSub 2026 · AI & Vision lead" },
      { value: "8th / 58", label: "RoboSub 2025 · Technical Coordinator" }
    ],
    links: [
      { label: "See the vision pipeline", href: "https://github.com/MadLad10/BRACU-Duburi-AUV-Vision-Pipeline" },
      { label: "About RoboSub", href: "https://robonation.org/programs/robosub/" }
    ]
  },

  projects: {
    title: "Projects",
    lede: "Hover over a card, or tap its image, to run detection and switch to the real footage.",
    featured: [
      {
        title: "Agentic AUV",
        kind: "Multi-agent AI",
        summary:
          "Fault-tolerant multi-agent LLM system that plans underwater missions from plain English and keeps working through sensor faults.",
        stat: { label: "Fusion", value: "EKF · Sonar · VLM" },
        tags: ["LangGraph", "VLM", "Tool calling", "Sensor fusion", "Guardrails"],
        // image: real footage (shown on hover/tap); pixel: pixel-art version (shown by default).
        // For .mp4 files, a still with the same name (.jpg for real, .png for pixel) is used as the poster.
        image: "assets/projects/agentic-auv.mp4",
        pixel: "assets/projects/agentic-auv-pixel.mp4",
        alt: "Simulated AUV run with camera, sonar and navigation views while the DVL drops out",
        slot: "assets/projects/agentic-auv.mp4 · 16:9",
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
        image: "assets/projects/duburi-vision.mp4",
        pixel: "assets/projects/duburi-vision-pixel.mp4",
        alt: "Underwater validation frames with YOLO detection boxes for torpedo, blood and hole targets",
        slot: "assets/projects/duburi-vision.mp4 · 16:9",
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
        image: "assets/projects/mission-planner.mp4",
        pixel: "assets/projects/mission-planner-pixel.mp4",
        alt: "Onboard camera of the simulated AUV approaching the gate and buoys in Gazebo",
        slot: "assets/projects/mission-planner.mp4 · 16:9",
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
        image: "assets/projects/bari.jpg",
        pixel: "assets/projects/bari-pixel.png",
        alt: "bari moderation queue holding a duplicate listing and a likely scam, with the reasons shown",
        slot: "assets/projects/bari.jpg · 16:9",
        detect: { label: "rag_agent", confidence: 0.96 },
        links: [{ label: "Code", href: "https://github.com/MadLad10/bari.com" }]
      }
    ],
    // Shown as the same cards, after the four above. Without image/pixel a card shows a
    // pixel "no signal" screen with `icon` (code, agent, eye, robot, chip, db, screen, tool).
    more: [
      {
        title: "Pinstagram",
        kind: "Full-stack + AI",
        summary: "Instagram-style app for discovering places in Bangladesh, with a map, reviews, bus and ride-hail directions, semantic search and an AI trip agent.",
        stat: { label: "Integration tests", value: "163" },
        tags: ["FastAPI", "React Native", "Next.js", "PostGIS", "pgvector"],
        image: "assets/projects/pinstagram.jpg",
        pixel: "assets/projects/pinstagram-pixel.png",
        alt: "Pinstagram screens: place map of Dhaka, photo feed and bus directions",
        detect: { label: "pinstagram", confidence: 0.95 },
        links: [
          { label: "Code", href: "https://github.com/MadLad10/Pinstagram" },
          { label: "Live", href: "https://pinstagram-mobile.vercel.app" }
        ]
      },
      {
        title: "Duburi Vision Pipeline Dashboard",
        kind: "ML tooling",
        summary: "Dashboard for the Duburi team to review training results per task, plus n8n workflows that send video clips to annotators and collect labels.",
        tags: ["Streamlit", "Plotly", "n8n"],
        image: "assets/projects/duburi-dashboard.jpg",
        pixel: "assets/projects/duburi-dashboard-pixel.png",
        alt: "YOLO training curves: box, class and DFL losses, precision and mAP50",
        detect: { label: "ml_dashboard", confidence: 0.94 },
        links: [{ label: "Code", href: "https://github.com/MadLad10/BRACU-Duburi-Vision-Pipeline-Dashboard" }]
      },
      {
        title: "Weather-Robust Object Detection with GANs",
        kind: "Generative vision",
        summary: "Pix2Pix generates snow, rain and fog scenes so a YOLOv5 detector for autonomous vehicles stays reliable in bad weather.",
        tags: ["PyTorch", "Pix2Pix", "YOLOv5"],
        image: "",
        icon: "eye",
        detect: { label: "weather_gan", confidence: 0.93 },
        links: [{ label: "Code", href: "https://github.com/MadLad10/An-efficient-object-detection-technique-for-autonomous-vehicles-using-advanced-GAN-model-" }]
      },
      {
        title: "MindWell",
        kind: "Backend",
        summary: "Employee wellness platform: companies invite staff, employees do periodic check-ins with email reminders, admins use role-based dashboards. FastAPI backend with JWT auth.",
        tags: ["FastAPI", "React", "PostgreSQL"],
        image: "",
        icon: "screen",
        detect: { label: "mindwell", confidence: 0.92 },
        // Add the repo link here if it's public: { label: "Code", href: "https://github.com/..." }
        links: []
      }
    ]
  },

  // logo: a file in assets/logos/ (square PNG works best). Leave it "" to show the `mark` monogram instead.
  // Logos sit on a light plate; set logoBg (a colour) for a logo that needs a different background.
  experience: {
    title: "Experience",
    lede: "",
    showPoints: false, // set to true to show the bullet points under each role
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
    lede: "",
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
