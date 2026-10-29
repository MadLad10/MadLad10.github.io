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
    cv: { label: "Download CV", href: "assets/Yaad_Kamrul_Bari_CV.pdf" },
    cvPreview: { label: "Preview CV", href: "assets/Yaad_Kamrul_Bari_CV.pdf" } // opens in a new tab
  },

  // Depth meter stops, in page order. `id` must match a section id in index.html.
  zones: [
    { id: "top", label: "Surface", depth: 0 },
    { id: "about", label: "About", depth: 20 },
    { id: "research", label: "Research", depth: 70 },
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

  // Small readouts around the pixel scene. Depth follows the scroll; the rest are about you.
  hud: {
    depthLabel: "Depth",
    depthUnit: "m",
    cgpaLabel: "CGPA",
    cgpa: "3.96 / 4.0", // top left, next to a graduation cap
    clockLabel: "Dhaka", // bottom right: your local time, with a sun by day and a moon by night
    clockOffset: 6, // hours ahead of UTC (Bangladesh has no daylight saving)
    // Bottom bar: typed out one line at a time, on a loop. With reduced motion only the first line shows.
    status: [
      "Mission: join a research team",
      "Now: Research Assistant, Dubotech Digital",
      "Led: AI and Machine Vision, BRACU Duburi",
      "RoboSub: 8th of 58, 2025 and 2026"
    ],
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
      links: true, // Email + the contact.links below as icons under the photo; false hides them
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
      { label: "RoboSub 2026 design report", href: "https://robonation.org/app/uploads/sites/4/2026/07/RS26_TDR_BRACU.pdf" },
      { label: "About RoboSub", href: "https://robonation.org/programs/robosub/" }
    ]
  },

  projects: {
    title: "Projects",
    lede: "Hover over a card to run detection.",
    // "Read more" on a card opens its `brief`. Leave a field "" (or leave it out) to hide that section.
    // `why` is your own story: what got you started on it.
    briefLabels: {
      open: "Read more",
      tag: "Mission brief",
      problem: "The problem",
      why: "Why I built it",
      how: "How it works",
      results: "Results",
      stack: "Stack"
    },
    featured: [
      {
        title: "Agentic AUV",
        kind: "Multi-agent AI",
        summary:
          "Fault-tolerant multi-agent LLM system that plans underwater missions from plain English and keeps working through sensor faults.",
        stat: { label: "Fusion", value: "EKF · Sonar · VLM" },
        tags: ["LangGraph", "VLM", "Tool calling", "Sensor fusion", "Guardrails"],
        // image: a .jpg/.png/.gif or a short .mp4 (autoplays muted on a loop; a .jpg with the
        // same name is used as its still frame).
        image: "assets/projects/agentic-auv.mp4",
        alt: "Simulated AUV run with camera, sonar and navigation views while the DVL drops out",
        slot: "assets/projects/agentic-auv.mp4 · 16:9",
        detect: { label: "agentic_auv", confidence: 0.98 },
        brief: {
          tldr: "An underwater robot you give missions in plain English, which keeps working when its sensors fail. A team of LLM agents plans and supervises each mission, a rule-based safety layer can overrule any of them, and sensor fusion keeps the robot localised when the camera or the DVL goes blind.",
          problem: "Underwater robots lose sensors all the time: the camera goes blind in murky water, the DVL loses the seabed, the compass gets thrown off. LLMs make plain-English missions possible, but they can misunderstand, make things up, or report success when nothing happened. Can AI agents backed by deterministic safety rules complete missions reliably while sensors are failing, and can that be proven with ground-truth measurements?",
          why: "",
          how: [
            "An LLM supervisor writes the plan using typed tools. Perception, navigation, health and diagnostics agents check the robot after every step (LangGraph, with human approval and checkpointing).",
            "A deterministic validator checks every plan, and a health monitor can veto any AI decision and bring the robot to the surface.",
            "Camera and sonar tracking finds objects in murky water. An EKF fuses IMU, DVL, depth and compass with sonar wall ranges and a learned velocity model.",
            "Everything runs in a custom MuJoCo simulation with 9 sensors and 11 injectable faults, scored by an independent ground-truth referee, never by the robot's own claims."
          ],
          results: [
            "Murky water, touch the red buoy: 10/10 with camera–sonar fusion against 0/10 without, with zero collisions.",
            "DVL lost: missions completed went from 11/20 to 20/20. Compass disturbed and DVL lost: from 1/20 to 20/20.",
            "36-mission evaluation with a real local LLM: the multi-agent system passed 35/36 against 31/36 for a single agent, which kept driving through a leak.",
            "A leak or a frozen depth sensor triggers an emergency surface within 3 s, and unsafe requests are refused."
          ]
        },
        links: [{ label: "Code", href: "https://github.com/MadLad10/Agentic-AUV-multimodal-multi-agent-autonomy-for-an-underwater-robot" }]
      },
      {
        title: "AUV Vision Pipeline",
        kind: "Computer vision",
        summary:
          "The full perception stack of an autonomous underwater vehicle: physics-based underwater augmentation, structured pruning and TensorRT on a Jetson Orin Nano, then a ROS 2 node that detects and tracks targets in real time.",
        stat: { label: "mAP50-95", value: "0.968" },
        tags: ["YOLO11n", "TensorRT", "ROS 2", "ByteTrack", "Jetson Orin Nano"],
        image: "assets/projects/duburi-vision.mp4",
        alt: "Underwater validation frames with YOLO detection boxes for torpedo, blood and hole targets",
        slot: "assets/projects/duburi-vision.mp4 · 16:9",
        detect: { label: "vision_pipeline", confidence: 0.99 },
        brief: {
          tldr: "The full perception stack of an autonomous underwater vehicle: from raw dive video to a pruned, TensorRT-compiled YOLO11n on a Jetson Orin Nano, which detects and tracks competition targets in real time and sends steering offsets to the controller.",
          problem: "Underwater images degrade in ways ordinary augmentation doesn't cover: colour absorption, haze, rippling light and dark corners. And the detector has to share a small Jetson with tracking, control and mission software, so it must be small and fast as well as accurate.",
          why: "",
          how: [
            "Five physics-based augmentations reproduce how underwater images form: water attenuation, backscatter, caustics, light falloff and marine snow.",
            "Structured channel pruning with a dependency graph, then recovery fine-tuning, so the network really gets smaller and faster on TensorRT.",
            "Export to ONNX and a TensorRT FP16 or INT8 engine on the Jetson Orin Nano.",
            "A ROS 2 node runs detection plus ByteTrack and smooths boxes over time, so the controller gets steady steering offsets.",
            "One config-driven CLI for every stage, with dataset checks and unit tests in CI."
          ],
          results: [
            "Gate model: 0.995 mAP50 and 0.968 mAP50-95, with every object found, on footage from the competition pool in California.",
            "Torpedo model: 0.994 mAP50 and 0.940 mAP50-95.",
            "Found and fixed a silent Ultralytics behaviour that rebuilt pruned models at full size during fine-tuning.",
            "YOLO11n is the model BRACU Duburi deployed at RoboSub 2026, where the team placed 8th of 58."
          ]
        },
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
        alt: "Onboard camera of the simulated AUV approaching the gate and buoys in Gazebo",
        slot: "assets/projects/mission-planner.mp4 · 16:9",
        detect: { label: "mission_planner", confidence: 0.97 },
        brief: {
          tldr: "An LLM agent that turns plain-English commands into safe, validated missions for an underwater robot in a ROS 2 and Gazebo simulation, and re-plans when something goes wrong.",
          problem: "Normally every new task for an underwater robot means writing new code. Letting an AI plan the mission instead is risky: it can misunderstand, hallucinate, or ask for something dangerous.",
          why: "",
          how: [
            "The AI never controls the motors. It can only use 8 safe, high-level tools such as 'go to the gate' or 'surface'.",
            "Plans are JSON validated with Pydantic, with constrained decoding so the output is always valid.",
            "A rule-based safety checker rejects unsafe plans and tells the AI why, or repairs small omissions such as a missing 'surface at the end'.",
            "If a step fails, the agent gets what happened and re-plans up to twice, then surfaces safely.",
            "Runs on a laptop CPU with a local Qwen 2.5 3B model through Ollama."
          ],
          results: [
            "A 25-mission benchmark, from easy missions to impossible and unsafe requests, scored by an independent referee.",
            "Plan-only: 25/25 passed. Full simulation: 22/25 passed and 23/25 safe.",
            "Every easy, medium and complex mission completed (16/16), and every impossible or unsafe request refused.",
            "Across 125 test runs the robot never hit a wall, and the AI never produced invalid output."
          ]
        },
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
        alt: "bari promo: find a safe home near campus, with the moderation queue holding scam and duplicate listings",
        slot: "assets/projects/bari.jpg · 16:9",
        detect: { label: "rag_agent", confidence: 0.96 },
        brief: {
          tldr: "An AI assistant that helps university students in Dhaka find safe, affordable housing. It searches listings, safety reviews and a community forum in English and Bangla, shows where every answer comes from, and never books anything without the student's approval.",
          problem: "Students looking for a place near campus have to piece together listings, safety reviews and forum posts, in English and Bangla, and watch out for duplicate and scam listings.",
          why: "bari started as a university course project: a rental website with a basic chatbot that pasted 20 listings into a prompt. I rebuilt it into a full AI system.",
          how: [
            "A tool-calling agent chooses between 9 tools (search, safety check, availability, price, booking) and streams its progress live.",
            "Hybrid search over English and Bangla text: vector embeddings, keyword search and filters, then re-ranking.",
            "Safety by design: a booking needs the student's own click, contact details never reach the AI, and instructions hidden in forum posts are blocked.",
            "Scout, a LangGraph background agent, checks new listings every day, pauses for the student's approval and resumes days later.",
            "Owner and moderation tools flag duplicate and scam listings and abusive posts for an admin."
          ],
          results: [
            "Blocked 100% of prompt-injection and privacy attacks, with every model tested.",
            "Bangla search success went from 50% to 100% after a fix to the search pipeline.",
            "Search finds the right source in the top 5 for all 22 test searches.",
            "Cut scam-detector false alarms from 48 to 16, with 276 automated tests."
          ]
        },
        links: [{ label: "Code", href: "https://github.com/MadLad10/bari.com" }]
      }
    ],
    // Shown as the same cards, after the four above. Without an image a card shows a
    // pixel "no signal" screen with `icon` (code, agent, eye, robot, chip, db, screen, tool).
    more: [
      {
        title: "Camera–Sonar Perception",
        kind: "Sensor fusion",
        summary: "Fuses camera detections with forward-looking sonar to track underwater objects, keeping their positions and labels when one sensor fails and flagging phantom sonar targets.",
        stat: { label: "Murky-water runs completed", value: "10/10" },
        tags: ["YOLO", "Imaging sonar", "Multi-object tracking", "Hungarian assignment"],
        image: "assets/projects/camera-sonar.mp4",
        alt: "Camera view with a YOLO gate detection next to a sonar fan image with detected buoys",
        detect: { label: "sonar_fusion", confidence: 0.97 },
        brief: {
          tldr: "A Python toolkit that detects and tracks underwater objects with a camera and a forward-looking sonar together. The camera says what an object is, the sonar says where it is, and fusion keeps both when one sensor becomes unreliable.",
          problem: "In murky water a camera sees only a couple of metres. Sonar sees through the murk, but it can't tell colours apart and sometimes shows ghost objects.",
          why: "",
          how: [
            "YOLO on camera images, with pinhole geometry and known object sizes to estimate range and bearing.",
            "Sonar returns are clustered into contacts, with optional YOLO on the sonar fan image.",
            "Multi-object tracking with Mahalanobis gating and Hungarian assignment. Camera labels stay attached to tracks that the sonar keeps updating.",
            "Sonar-only tracks that the camera should be able to see are flagged as suspected phantom targets.",
            "Extracted from Agentic AUV into a standalone package with replay, evaluation and tests."
          ],
          results: [
            "In the Agentic AUV mission study: 10/10 murky-water red-buoy runs completed with tracking, against 0/10 without.",
            "Fused position error of about 6 cm in normal, camera-blackout and phantom-target replays, against about 29 cm from the camera alone.",
            "Camera detector: 0.944 mAP@0.5 on held-out synthetic scenes."
          ]
        },
        links: [{ label: "Code", href: "https://github.com/MadLad10/Camera-Sonar-Perception-Underwater-Object-Detection-and-Fusion-Tracking" }]
      },
      {
        title: "AUV Navigation Fusion",
        kind: "State estimation",
        summary: "Estimates an underwater robot's position, velocity and heading from IMU, DVL, depth and compass, and keeps navigating through DVL dropouts with sonar wall ranges and a learned velocity model.",
        stat: { label: "Error after DVL loss", value: "2.07 → 0.03 m" },
        tags: ["EKF", "GTSAM / iSAM2", "GRU", "Sensor fusion"],
        image: "assets/projects/nav-fusion.mp4",
        alt: "Plots of position estimates and error: the plain EKF drifts after the DVL is lost while the wall-assisted EKF stays on the true path",
        detect: { label: "nav_fusion", confidence: 0.96 },
        brief: {
          tldr: "A Python toolkit that estimates an underwater vehicle's position, velocity and heading from IMU, DVL, depth, compass and landmark measurements, and keeps navigating when the DVL drops out.",
          problem: "The DVL measures speed over the seabed and is the robot's main way of knowing how far it has moved. When it loses the seabed, position errors grow quickly.",
          why: "",
          how: [
            "An 8-state EKF with IMU prediction and DVL, compass, depth and landmark updates, with outlier gating.",
            "A GTSAM / iSAM2 factor-graph estimator as an alternative to compare against.",
            "Sonar ranges to the known pool walls correct position and heading.",
            "A small GRU, run in plain NumPy, predicts velocity during DVL outages, with the water current estimated online.",
            "Extracted from Agentic AUV into a standalone package with log replay, a CLI and tests."
          ],
          results: [
            "DVL lost: average error of 2.07 m with the plain EKF, against 0.03 m with wall ranges (replay, 3 seeds).",
            "In 400 integrated missions with the compass disturbed, the DVL lost and long pauses: 35.9 m error down to 0.45 m with the full recovery stack.",
            "The factor graph was not better than the EKF in these tests, and that is reported as a result too."
          ]
        },
        links: [{ label: "Code", href: "https://github.com/MadLad10/AUV-Navigation-Fusion-Underwater-State-Estimation-and-Sensor-Recovery" }]
      },
      {
        title: "MuJoCo Marine Sim",
        kind: "Robot simulation",
        summary: "Underwater vehicle simulator with six thrusters, buoyancy, drag and currents, simulated camera, sonar, DVL and IMU, scheduled sensor faults and automatic YOLO labels.",
        stat: { label: "Injectable fault types", value: "11" },
        tags: ["MuJoCo", "Fault injection", "Synthetic data", "pytest"],
        image: "assets/projects/marine-sim.mp4",
        alt: "Simulated AUV front camera facing a gate, beside a ground-truth view of the pool with the gate and buoys",
        detect: { label: "marine_sim", confidence: 0.95 },
        brief: {
          tldr: "An underwater robot simulator built on MuJoCo for testing vehicle dynamics, sensors, sensor failures and perception data generation in a repeatable pool.",
          problem: "To test how an underwater robot copes when its sensors fail, you need to break them on purpose, at known times, and repeat the run exactly.",
          why: "",
          how: [
            "A rigid-body vehicle with six thrusters, thrust limits and lag, buoyancy, drag and water current.",
            "Simulated camera with underwater colour loss and noise, imaging sonar, DVL, IMU, compass, depth and health telemetry.",
            "11 fault types scheduled at set times, including camera blackout, turbidity, DVL dropout, phantom sonar targets, dead thrusters and leaks.",
            "Automatic YOLO labels for camera and sonar images, and a referee that scores gate passes, buoy touches and collisions."
          ],
          results: [
            "Passed 54 compatibility checks against Agentic AUV, including mission execution, a YOLO check and a ROS 2 action test.",
            "Installable as a Python package with a CLI, regression tests and CI.",
            "Recorded demos of normal, murky-water, camera-blackout and DVL-dropout runs."
          ]
        },
        links: [{ label: "Code", href: "https://github.com/MadLad10/MuJoCo-Marine-Sim-Underwater-Vehicle-Dynamics-Sensors-and-Fault-Injection" }]
      },
      {
        title: "Pinstagram",
        kind: "Full-stack + AI",
        summary: "Instagram-style app for discovering places in Bangladesh, with a map, reviews, bus and ride-hail directions, semantic search and an AI trip agent.",
        stat: { label: "Integration tests", value: "163" },
        tags: ["FastAPI", "React Native", "Next.js", "PostGIS", "pgvector"],
        image: "assets/projects/pinstagram.jpg",
        alt: "Pinstagram promo: discover places across Bangladesh, with map, feed and directions screens",
        detect: { label: "pinstagram", confidence: 0.95 },
        brief: {
          tldr: "A place-discovery app for Bangladesh: an Instagram-style feed of real places, a map and reviews, plus practical directions: which bus to take and what it costs, ride-hail estimates, train times, or whether it's walkable.",
          why: "",
          how: [
            "Hybrid semantic search merges pgvector embeddings with full-text search, so 'quiet cafe where I can work on my laptop' works.",
            "Review summaries with RAG: every point must cite real reviews, and ungrounded points are dropped in code.",
            "A trip-planning agent uses tool calling and answers only from the app's own places, routes and fares.",
            "Bus routing on PostGIS scores each way of getting there on door-to-door time and fare.",
            "Three apps share one FastAPI backend: a React Native app for iOS, Android and web, and a Next.js admin dashboard."
          ],
          results: [
            "Hybrid search: hit@5 of 1.00 and MRR of 0.97, against 0.95 and 0.86 for keyword search alone.",
            "Answers a Bangla query that keyword search returns nothing for.",
            "163 tests at 90% coverage, run against real Postgres, PostGIS, pgvector and Redis.",
            "Live on Vercel, with a demo account."
          ]
        },
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
        alt: "YOLO training curves: box, class and DFL losses, precision and mAP50",
        detect: { label: "ml_dashboard", confidence: 0.94 },
        brief: {
          tldr: "A Streamlit dashboard for BRACU Duburi's RoboSub 2026 vision work. It turns raw YOLO training output into per-task analytics, and runs n8n workflows that send video clips to annotators and collect the labels.",
          why: "",
          how: [
            "Point it at a YOLO run, or upload a zip, to get loss curves, mAP over epochs with the best epoch marked, precision–recall curves, the confusion matrix and prediction galleries.",
            "Reads runs from different Ultralytics versions without edits.",
            "Two n8n workflows email clips to annotators, collect YOLO-format labels and report back when a round is complete.",
            "Tasks and page content are editable in the app in admin mode."
          ],
          results: [
            "Torpedo detector tracked in the dashboard: 0.995 mAP50, 0.846 mAP50-95 and recall 1.000 (YOLO11n, a small dataset, so a working baseline).",
            "Live on Streamlit Community Cloud."
          ]
        },
        links: [{ label: "Code", href: "https://github.com/MadLad10/BRACU-Duburi-Vision-Pipeline-Dashboard" }]
      },
      {
        title: "Weather-Robust Object Detection with GANs",
        kind: "Generative vision",
        summary: "Pix2Pix generates snow, rain and fog scenes so a YOLOv5 detector for autonomous vehicles stays reliable in bad weather.",
        tags: ["PyTorch", "Pix2Pix", "YOLOv5"],
        image: "assets/projects/weather-gan.jpg",
        alt: "Road scene with synthetic snow added by Automold, next to the original clean image",
        icon: "eye",
        detect: { label: "weather_gan", confidence: 0.93 },
        brief: {
          tldr: "A Pix2Pix GAN generates snow, rain and fog versions of road scenes, so a YOLOv5 detector for autonomous vehicles can be trained to stay reliable in bad weather.",
          problem: "A detector trained on clear-weather road images can miss objects in snow, rain or fog, which is exactly when a self-driving car needs it most.",
          why: "",
          how: [
            "Pix2Pix generates realistic heavy snow, rain, fog and low-visibility versions of road scenes.",
            "The generated scenes are used to train and test YOLOv5 for object detection in adverse weather.",
            "Built for CSE463 (Computer Vision) at BRAC University."
          ]
        },
        links: [{ label: "Code", href: "https://github.com/MadLad10/An-efficient-object-detection-technique-for-autonomous-vehicles-using-advanced-GAN-model-" }]
      },
      {
        title: "MindWell",
        kind: "Backend",
        summary: "Employee wellness platform: companies invite staff, employees do periodic check-ins with email reminders, admins use role-based dashboards. FastAPI backend with JWT auth.",
        tags: ["FastAPI", "React", "PostgreSQL"],
        image: "assets/projects/mindwell.jpg",
        alt: "MindWell promo: weekly check-in card, email reminder and admin dashboard",
        icon: "screen",
        detect: { label: "mindwell", confidence: 0.92 },
        brief: {
          tldr: "An employee wellness platform: companies invite their staff, employees do regular check-ins with email reminders, and admins see role-based dashboards.",
          why: "",
          how: [
            "FastAPI and PostgreSQL backend with JWT authentication and invitation-based onboarding.",
            "Role-based dashboards for employees and admins, with a React and Vite frontend.",
            "A background job emails each employee a reminder the day before their next check-in.",
            "One command starts the backend and frontend together, for development or a production-like run."
          ]
        },
        links: [{ label: "Code", href: "https://github.com/MadLad10/Depression_detection" }]
      }
    ]
  },

  // Research interests, between About and Experience.
  // icon: eye, cube, cross, agent, screen, robot, chip, code, db or tool.
  // projects (optional): project titles exactly as written in `projects` below; each becomes a button that opens its brief.
  research: {
    title: "Research interests",
    lede: "The problems I want to work on, and the projects that led me there.",
    builtLabel: "Explored in",
    items: [
      {
        icon: "eye",
        title: "Underwater domain generalization and perception",
        text: "A detector trained in one pool often fails in the next, because colour, turbidity and light change from water to water. I'm interested in underwater perception that holds up in water it has never seen, through physics-based augmentation, synthetic data and more than one sensor.",
        projects: ["AUV Vision Pipeline", "Camera–Sonar Perception", "MuJoCo Marine Sim"]
      },
      {
        icon: "cube",
        title: "Feedforward 3D CNNs",
        text: "Networks that understand 3D structure in a single forward pass, fast enough to use in real time."
      },
      {
        icon: "cross",
        title: "Medical imaging and multimodal data",
        text: "Learning from medical images together with other kinds of data, so each source covers what the others miss. It's the same fusion problem as camera and sonar, where getting it right matters directly to people."
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
    // icon: trophy or medal. certificate (optional): a PDF + preview image, shown on the card
    items: [
      {
        icon: "trophy",
        place: "8th of 58",
        event: "RoboSub 2026",
        certificate: { href: "assets/certificates/robosub-2026.pdf", image: "assets/certificates/robosub-2026.jpg" },
        detail: "RoboNation, Woollett Aquatics Center, California. Sub-Team Lead of AI and Machine Vision."
      },
      {
        icon: "trophy",
        place: "8th of 58",
        event: "RoboSub 2025",
        certificate: { href: "assets/certificates/robosub-2025.pdf", image: "assets/certificates/robosub-2025.jpg" },
        detail: "RoboNation, Woollett Aquatics Center, California. Technical Coordinator."
      },
      {
        icon: "medal",
        place: "2nd Runner Up",
        event: "National Telco Warfare Datathon 2024",
        detail: "",
        certificate: { href: "assets/certificates/telco-warfare-2024.jpg", image: "assets/certificates/telco-warfare-2024-thumb.jpg" }
      }
    ]
  },

  contact: {
    title: "Ping me",
    copyLabel: "Copy email",
    copiedLabel: "Copied",
    mailLabel: "Email me",
    compose: "gmail", // "gmail" opens Gmail's compose page in a new tab; "mailto" uses the visitor's mail app
    links: [
      // icon (optional): linkedin or github, for the icons on the About card
      { label: "LinkedIn", href: "https://www.linkedin.com/in/yaad-bari-655b0b250/", icon: "linkedin" },
      { label: "GitHub", href: "https://github.com/MadLad10", icon: "github" }
    ]
  },

  footer: {
    top: "Back to the surface"
  }
};
