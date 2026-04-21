const storyData = {
  build: {
    kicker: "Build mode",
    title: "Turning practical ideas into polished experiences.",
    description:
      "I enjoy taking a concept, shaping the interface, and refining the details until the result feels clean, usable, and ready to share.",
    points: [
      "Shipping pages and demos that feel intentional and easy to explore.",
      "Balancing clarity, visual personality, and real usability.",
      "Improving steadily instead of waiting for a perfect starting point."
    ],
    metrics: [
      { label: "Rhythm", value: "Ship often" },
      { label: "Focus", value: "Practical UI" },
      { label: "Outcome", value: "Useful results" }
    ]
  },
  learn: {
    kicker: "Learn mode",
    title: "Growth comes from building, testing, and repeating.",
    description:
      "Continual learning is part of the journey, so I keep exploring new ideas through hands-on work that turns curiosity into stronger engineering instincts.",
    points: [
      "Using demos and experiments to turn theory into working knowledge.",
      "Treating each iteration as a chance to sharpen both code and judgment.",
      "Staying open to better patterns, cleaner structure, and stronger craft."
    ],
    metrics: [
      { label: "Method", value: "Learn by doing" },
      { label: "Curiosity", value: "Always active" },
      { label: "Growth", value: "Continuous" }
    ]
  },
  collaborate: {
    kicker: "Collaborate mode",
    title: "Clear communication makes better products possible.",
    description:
      "I value calm teamwork, shared momentum, and taking ownership all the way through so ideas keep moving instead of getting stuck in handoffs.",
    points: [
      "Keeping updates clear so the next step feels obvious to everyone involved.",
      "Pairing steady execution with a practical sense of responsibility.",
      "Helping ideas move from discussion into something visible and real."
    ],
    metrics: [
      { label: "Style", value: "Calm teammate" },
      { label: "Updates", value: "Clear and direct" },
      { label: "Ownership", value: "End to end" }
    ]
  }
};

const projectData = {
  dice: {
    type: "Live Demo",
    title: "Dice App",
    description:
      "A lightweight Flutter web project that brings a simple game idea to life through a clean browser experience.",
    pills: ["Flutter Web", "Interactive Demo", "GitHub Pages"],
    link: "./dice/",
    linkLabel: "Open project"
  },
  demo1: {
    type: "Live Demo",
    title: "Demo App",
    description:
      "Another published Flutter build from this portfolio workspace, ready to be explored directly in the browser.",
    pills: ["Flutter Build", "Published Demo", "Web Experience"],
    link: "./demo1/",
    linkLabel: "Open project"
  },
  github: {
    type: "Profile",
    title: "GitHub",
    description:
      "Browse repositories, activity, and more engineering work through the main GitHub profile.",
    pills: ["Repositories", "Activity", "Open Source Profile"],
    link: "https://github.com/sakthivelj",
    linkLabel: "Visit GitHub"
  }
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function createListItem(text) {
  const item = document.createElement("li");
  item.textContent = text;
  return item;
}

function createMetric(metric) {
  const wrapper = document.createElement("div");
  wrapper.className = "metric-pill";

  const label = document.createElement("span");
  label.textContent = metric.label;

  const value = document.createElement("strong");
  value.textContent = metric.value;

  wrapper.append(label, value);
  return wrapper;
}

function createPill(text) {
  const pill = document.createElement("span");
  pill.textContent = text;
  return pill;
}

function animateSwap(element) {
  if (!element || prefersReducedMotion.matches) {
    return;
  }

  element.classList.remove("is-swapping");
  void element.offsetWidth;
  element.classList.add("is-swapping");
}

function setPressedState(elements, activeValue, attributeName) {
  elements.forEach((element) => {
    const isActive = element.dataset[attributeName] === activeValue;
    element.classList.toggle("is-active", isActive);
    element.setAttribute("aria-pressed", String(isActive));
  });
}

function initReveal() {
  const reveals = document.querySelectorAll(".reveal");

  if (prefersReducedMotion.matches) {
    reveals.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16
    }
  );

  reveals.forEach((element) => observer.observe(element));
}

function initStorySwitcher() {
  const buttons = document.querySelectorAll("[data-mode]");
  const card = document.querySelector("[data-story-card]");
  const kicker = document.querySelector("[data-story-kicker]");
  const title = document.querySelector("[data-story-title]");
  const description = document.querySelector("[data-story-description]");
  const points = document.querySelector("[data-story-points]");
  const metrics = document.querySelector("[data-story-metrics]");

  if (!buttons.length || !card || !kicker || !title || !description || !points || !metrics) {
    return;
  }

  function renderStory(mode) {
    const story = storyData[mode];

    if (!story) {
      return;
    }

    kicker.textContent = story.kicker;
    title.textContent = story.title;
    description.textContent = story.description;
    points.replaceChildren(...story.points.map(createListItem));
    metrics.replaceChildren(...story.metrics.map(createMetric));
    setPressedState(buttons, mode, "mode");
    animateSwap(card);
  }

  buttons.forEach((button) => {
    const mode = button.dataset.mode;

    button.addEventListener("click", () => renderStory(mode));
  });
}

function initProjectSwitcher() {
  const buttons = document.querySelectorAll("[data-project]");
  const card = document.querySelector("[data-project-card]");
  const type = document.querySelector("[data-project-type]");
  const title = document.querySelector("[data-project-title]");
  const description = document.querySelector("[data-project-description]");
  const pills = document.querySelector("[data-project-pills]");
  const link = document.querySelector("[data-project-link]");

  if (!buttons.length || !card || !type || !title || !description || !pills || !link) {
    return;
  }

  function renderProject(projectKey) {
    const project = projectData[projectKey];

    if (!project) {
      return;
    }

    type.textContent = project.type;
    title.textContent = project.title;
    description.textContent = project.description;
    link.href = project.link;
    link.textContent = project.linkLabel;
    if (project.link.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.removeAttribute("target");
      link.removeAttribute("rel");
    }

    pills.replaceChildren(...project.pills.map(createPill));
    setPressedState(buttons, projectKey, "project");
    animateSwap(card);
  }

  buttons.forEach((button) => {
    const projectKey = button.dataset.project;

    button.addEventListener("click", () => renderProject(projectKey));
    button.addEventListener("mouseenter", () => renderProject(projectKey));
    button.addEventListener("focus", () => renderProject(projectKey));
  });
}

function initTilt() {
  const tiltCard = document.querySelector("[data-tilt]");

  if (!tiltCard || prefersReducedMotion.matches) {
    return;
  }

  function resetTilt() {
    tiltCard.style.transform = "";
  }

  tiltCard.addEventListener("pointermove", (event) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const rotateX = (-y * 5).toFixed(2);
    const rotateY = (x * 6).toFixed(2);

    tiltCard.style.transform =
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
  });

  tiltCard.addEventListener("pointerleave", resetTilt);
  tiltCard.addEventListener("pointerup", resetTilt);
  tiltCard.addEventListener("blur", resetTilt);
}

initReveal();
initStorySwitcher();
initProjectSwitcher();
initTilt();
