/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * NuralPlay - Learning Path System
 * Dynamic Curriculum Management with Progress Tracking & Persistence
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ─────────────────────────────────────────────────────────────────────────────
// DATA MODEL: Curriculum Structure
// ─────────────────────────────────────────────────────────────────────────────

const curriculumData = [
  {
    tier: "Foundation",
    tierDescription: "Master the fundamental axioms of digital thought.",
    iconName: "foundation",
    modules: [
      {
        id: 1,
        title: "Introduction to Neural Networks",
        description:
          "Uncover the architecture of the artificial neuron. Learn how weighted inputs and activation functions mirror biological synapses.",
        status: "completed",
        progressPercentage: 100,
        difficulty: "Beginner",
        useCase:
          "Binary classification in spam filters and basic credit scoring models.",
        icon: "hub",
        color: "primary",
        lessonTime: "4.2 Hours",
        quizzes: "3 Modules",
        learners: 15200,
      },
      {
        id: 2,
        title: "Data Preprocessing & Feature Engineering",
        description:
          "Transform raw data into meaningful patterns. Master normalization, encoding, and dimensionality reduction techniques.",
        status: "in-progress",
        progressPercentage: 65,
        difficulty: "Beginner",
        useCase:
          "Cleaning datasets from IoT sensors and preparing user behavior analytics.",
        icon: "tune",
        color: "primary",
        lessonTime: "5.1 Hours",
        quizzes: "4 Modules",
        learners: 8900,
      },
      {
        id: 3,
        title: "Loss Functions & Optimization",
        description:
          "Understand gradient descent, backpropagation, and stochastic learning algorithms that guide neural networks to convergence.",
        status: "locked",
        progressPercentage: 0,
        difficulty: "Intermediate",
        useCase:
          "Fine-tuning model parameters in production recommendation engines.",
        icon: "trending_down",
        color: "primary",
        lessonTime: "6.0 Hours",
        quizzes: "5 Modules",
        learners: 5400,
      },
    ],
  },
  {
    tier: "Complexity",
    tierDescription: "Navigate multidimensional data and temporal sequences.",
    iconName: "layers",
    modules: [
      {
        id: 4,
        title: "CNNs for Computer Vision",
        description:
          "Convolutional layers mimic the human visual cortex. Learn spatial hierarchy, pooling, and how machines 'see' edges and textures.",
        status: "locked",
        progressPercentage: 0,
        difficulty: "Advanced",
        useCase:
          "Used in autonomous vehicle object detection and facial recognition security.",
        icon: "visibility",
        color: "secondary",
        isFeatured: true,
        lessonTime: "8.5 Hours",
        quizzes: "6 Modules",
        learners: 9800,
      },
      {
        id: 5,
        title: "Sequential Modeling (RNNs)",
        description:
          "Time-dependent learning. Explore LSTMs and GRUs to handle information loops and memory across data sequences.",
        status: "locked",
        progressPercentage: 0,
        difficulty: "Intermediate",
        useCase:
          "Powering sentiment analysis on social media and stock price forecasting.",
        icon: "timeline",
        color: "secondary",
        lessonTime: "7.3 Hours",
        quizzes: "5 Modules",
        learners: 6200,
      },
      {
        id: 6,
        title: "Attention Mechanisms & Seq2Seq",
        description:
          "Breakthrough architecture for machine translation. Learn how attention weights focus on relevant input sequences.",
        status: "locked",
        progressPercentage: 0,
        difficulty: "Advanced",
        useCase:
          "Language translation services and neural machine captioning systems.",
        icon: "link",
        color: "secondary",
        lessonTime: "6.8 Hours",
        quizzes: "4 Modules",
        learners: 3100,
      },
    ],
  },
  {
    tier: "Mastery",
    tierDescription: "The frontier of Generative AI and Human-AI alignment.",
    iconName: "diamond",
    modules: [
      {
        id: 7,
        title: "Transformer Architectures",
        description:
          "Self-attention mechanisms and multi-head processing. Discover the engine behind Large Language Models and Generative Pre-training.",
        status: "locked",
        progressPercentage: 0,
        difficulty: "Expert",
        useCase:
          "Foundation for GPT-style models, BERT embeddings, and modern NLP systems.",
        icon: "auto_awesome",
        color: "tertiary",
        lessonTime: "6.5 Hours",
        quizzes: "4 Modules",
        learners: 2800,
      },
      {
        id: 8,
        title: "RLHF & Fine-Tuning",
        description:
          "Reinforcement Learning from Human Feedback. Aligning model outputs with human intent and safety guardrails.",
        status: "locked",
        progressPercentage: 0,
        difficulty: "Expert",
        useCase:
          "Aligning ChatGPT-style systems with human values and preventing harmful outputs.",
        icon: "model_training",
        color: "tertiary",
        lessonTime: "7.2 Hours",
        quizzes: "5 Modules",
        learners: 1400,
      },
      {
        id: 9,
        title: "Multimodal Learning & Diffusion",
        description:
          "Cross-modal understanding: text, vision, audio fusion. Explore diffusion models for generative image synthesis.",
        status: "locked",
        progressPercentage: 0,
        difficulty: "Expert",
        useCase:
          "AI image generation (DALL-E, Stable Diffusion) and video understanding systems.",
        icon: "blur_on",
        color: "tertiary",
        lessonTime: "8.1 Hours",
        quizzes: "6 Modules",
        learners: 1650,
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STATE MANAGEMENT
// ─────────────────────────────────────────────────────────────────────────────

class LearningPathManager {
  constructor() {
    this.storageKey = "nuralplay_learning_progress";
    this.curriculum = curriculumData;
    this.loadProgress();
  }

  // Load progress from localStorage
  loadProgress() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        const progressMap = JSON.parse(saved);
        // Apply saved progress to curriculum
        this.curriculum.forEach((tier) => {
          tier.modules.forEach((module) => {
            if (progressMap[module.id]) {
              module.status = progressMap[module.id].status;
              module.progressPercentage =
                progressMap[module.id].progressPercentage;
            }
          });
        });
      } catch (err) {
        console.error("Error loading progress:", err);
      }
    }
  }

  // Save progress to localStorage
  saveProgress() {
    const progressMap = {};
    this.curriculum.forEach((tier) => {
      tier.modules.forEach((module) => {
        progressMap[module.id] = {
          status: module.status,
          progressPercentage: module.progressPercentage,
        };
      });
    });
    localStorage.setItem(this.storageKey, JSON.stringify(progressMap));
  }

  // Update module status
  updateModuleStatus(moduleId, newStatus) {
    let module = null;
    for (let tier of this.curriculum) {
      const found = tier.modules.find((m) => m.id === moduleId);
      if (found) {
        module = found;
        break;
      }
    }

    if (module) {
      module.status = newStatus;
      if (newStatus === "completed") {
        module.progressPercentage = 100;
      } else if (newStatus === "in-progress") {
        module.progressPercentage = Math.max(module.progressPercentage, 35);
      }
      this.saveProgress();
      return true;
    }
    return false;
  }

  // Calculate global progress
  calculateGlobalProgress() {
    const allModules = this.curriculum.flatMap((tier) => tier.modules);
    if (allModules.length === 0) return 0;

    const totalProgress = allModules.reduce(
      (sum, m) => sum + m.progressPercentage,
      0
    );
    return Math.round(totalProgress / allModules.length);
  }

  // Get statistics
  getStatistics() {
    const allModules = this.curriculum.flatMap((tier) => tier.modules);
    const completed = allModules.filter((m) => m.status === "completed").length;
    const totalHours = allModules.reduce((sum, m) => {
      const hours = parseFloat(m.lessonTime);
      return sum + (m.status === "completed" ? Math.round(hours) : 0);
    }, 0);

    return {
      completedModules: completed,
      totalHours: totalHours,
      globalProgress: this.calculateGlobalProgress(),
    };
  }

  // Get all modules (optionally filtered)
  getAllModules(searchTerm = "") {
    const allModules = this.curriculum.flatMap((tier) => tier.modules);
    if (!searchTerm) return allModules;

    const term = searchTerm.toLowerCase();
    return allModules.filter(
      (m) =>
        m.title.toLowerCase().includes(term) ||
        m.description.toLowerCase().includes(term) ||
        m.useCase.toLowerCase().includes(term)
    );
  }
}

// Initialize the manager
const learningPathManager = new LearningPathManager();

// ─────────────────────────────────────────────────────────────────────────────
// DOM RENDERING
// ─────────────────────────────────────────────────────────────────────────────

// Update hero section with progress stats
function updateHeroSection() {
  const stats = learningPathManager.getStatistics();

  const progressPercentageEl = document.querySelector(
    "[data-progress-percentage]"
  );
  const progressBarEl = document.querySelector("[data-progress-bar]");
  const modulesFinishedEl = document.querySelector(
    "[data-modules-finished]"
  );
  const hoursInvestedEl = document.querySelector("[data-hours-invested]");

  if (progressPercentageEl) {
    progressPercentageEl.textContent = `${stats.globalProgress}% Completed`;
  }
  if (progressBarEl) {
    progressBarEl.style.width = `${stats.globalProgress}%`;
  }
  if (modulesFinishedEl) {
    modulesFinishedEl.textContent = `${stats.completedModules} Modules Finished`;
  }
  if (hoursInvestedEl) {
    hoursInvestedEl.textContent = `${stats.totalHours} Hours Invested`;
  }
}

// Render module card (standard layout)
function createModuleCard(module) {
  const statusColors = {
    completed: {
      badge: "bg-tertiary-fixed text-on-tertiary-fixed-variant",
      text: "Completed",
      icon: "check_circle",
    },
    "in-progress": {
      badge: "bg-indigo-100 text-indigo-900",
      text: "In Progress",
      icon: "schedule",
    },
    locked: {
      badge: "bg-slate-100 text-slate-600",
      text: "Locked",
      icon: "lock",
    },
  };

  const colorScheme = {
    primary: {
      bg: "bg-white",
      icon: "bg-surface-container",
      button: "bg-primary",
    },
    secondary: {
      bg: "bg-white",
      icon: "bg-secondary/5",
      button: "bg-secondary",
    },
    tertiary: {
      bg: "bg-white",
      icon: "bg-tertiary/5",
      button: "bg-tertiary",
    },
  };

  const colors = statusColors[module.status];
  const scheme = colorScheme[module.color] || colorScheme.primary;

  const isLocked = module.status === "locked";
  const buttonClass = isLocked
    ? "border-2 border-slate-200 text-slate-400 cursor-not-allowed"
    : `${scheme.button} text-white hover:opacity-90`;
  const buttonText = isLocked
    ? "Unlock Syllabus"
    : module.status === "completed"
      ? "Review Module"
      : "Continue Discovery";

  return `
    <div class="${scheme.bg} rounded-lg p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-${module.color}/20" data-module-id="${module.id}">
      <div class="flex justify-between items-start mb-6">
        <div class="w-14 h-14 ${scheme.icon} rounded-xl flex items-center justify-center">
          <span class="material-symbols-outlined text-${module.color} text-3xl">${module.icon}</span>
        </div>
        <span class="${colors.badge} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
          ${colors.text}
        </span>
      </div>
      <h4 class="text-xl font-bold mb-3">${module.title}</h4>
      <p class="text-slate-500 text-sm mb-6 font-body leading-relaxed">
        ${module.description}
      </p>
      <div class="bg-surface-container-low rounded-lg p-4 mb-6">
        <span class="text-[10px] font-bold text-${module.color} uppercase mb-2 block">Real-World Use Case</span>
        <p class="text-xs text-on-surface font-medium">${module.useCase}</p>
      </div>
      <div class="flex items-center justify-between">
        <div class="flex -space-x-2">
          <img class="w-6 h-6 rounded-full border-2 border-white"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM0Ylk47hvdu8arWNUMDO39pGSkrDXkbPkb953CJAvoQWa8QB2yuEWmoxbr5T7QYT0P1RJFJwZQUvmwCGjKkv7XECfvgN1qiBeuK3CaOJwqlseX5HAcAchieR6ND2IwlOmwxGuFMvGKLtJsPSwOFMmVVeg2CdtsmgH5e87g1BcUoaLw1wPCoVjk4AYPpHPnDOMk4DHeQWxuGncdm6CsxTb-HCTmB1qynWczdy9DksXfpyOyi_7qylkdwIsIK6zKQlZPJF9DIlgJWY" />
          <img class="w-6 h-6 rounded-full border-2 border-white"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxOQeNju1Ld2wRbkOwhP-hDrDMEPlIIvpsvjILoHsHYFIOJ5lpS5oX-f1fkLYbshaMxcP4xNjR4mtkwNM3z0hMTXEUZM_wdzhB_H-qBOUVstkAfP6g-HnEft7lmLi3bObMfAubujQibD4U9O2Hi8PA1kblWU5oouG20x8utLqZPGsMVi6mvEBetVhk0731QPWo7uCYrE9HKyY8QOmMg93PGMXW4G0xY6tS06fkqFjycmAKJ68JDuSJiE85S8XTU_AOAzrhILos5t4" />
          <div class="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold">+${module.learners}</div>
        </div>
        <button class="${buttonClass} px-6 py-2 rounded-lg font-bold transition-all module-action-btn" data-module-id="${module.id}" ${isLocked ? "disabled" : ""}>
          ${buttonText}
        </button>
      </div>
    </div>
  `;
}

// Render featured module card (special layout for CNNs)
function createFeaturedModuleCard(module) {
  const scheme = {
    bg: "bg-white",
    icon: "bg-secondary/10",
    button: "bg-secondary",
  };

  return `
    <div class="lg:col-span-2 group relative overflow-hidden ${scheme.bg} rounded-lg p-10 shadow-sm border border-transparent hover:border-secondary/20 transition-all" data-module-id="${module.id}">
      <div class="flex flex-col md:flex-row gap-8 items-start">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-6">
            <div class="${scheme.icon} rounded-xl flex items-center justify-center w-12 h-12">
              <span class="material-symbols-outlined text-secondary text-2xl">${module.icon}</span>
            </div>
            <h4 class="text-2xl font-bold">${module.title}</h4>
          </div>
          <p class="text-slate-500 text-base mb-8 leading-relaxed max-w-lg">
            ${module.description}
          </p>
          <div class="bg-surface-container-low rounded-lg p-6 mb-8 inline-block w-full">
            <span class="text-[10px] font-bold text-secondary uppercase mb-2 block">Real-World Impact</span>
            <div class="flex items-center gap-4">
              <span class="material-symbols-outlined text-secondary">directions_car</span>
              <p class="text-sm text-on-surface font-medium">${module.useCase}</p>
            </div>
          </div>
          <button class="${scheme.button} text-white px-8 py-4 rounded-lg font-bold hover:opacity-90 transition-all module-action-btn" data-module-id="${module.id}">
            Begin Module
          </button>
        </div>
        <div class="w-full md:w-64 aspect-square bg-surface-container-low rounded-2xl flex items-center justify-center relative overflow-hidden">
          <img alt="abstract neural pattern"
            class="absolute inset-0 w-full h-full object-cover opacity-20 grayscale"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2lYB713fSsIjgS3gazLu58MrItnnEKGkXFyoaMm9mZKHtcDKYSMh03Lqeqa9jsjGBJSmVR70hRA8WYcSTRmloAf2DHGv3CutYReLRPMGl9adf5O_WzHyIQ2Fa4bju3xgKZR-MJXkoQGRHh1jp_Io7BdU3e3uIdbL3agYUL03ci2xxoNEU6Y7VtedVhTIvlOc2wvwMx5kLd3S-Z5EQ0tE9iVOYGgcu2CuuEPBYIqNAPn9lgzGdGZpHa7Jhy595hUxXaHS9gJeZmfA" />
          <span class="material-symbols-outlined text-7xl text-secondary opacity-30">grid_view</span>
        </div>
      </div>
    </div>
  `;
}

// Render all curriculum tiers
function renderCurriculum() {
  const main = document.querySelector("main .max-w-7xl");
  if (!main) return;

  const tieredSection = main.querySelector(".space-y-24");
  if (!tieredSection) return;

  // Clear existing sections except hero
  tieredSection.innerHTML = "";

  learningPathManager.curriculum.forEach((tier) => {
    const sectionHTML = `
      <section>
        <div class="flex items-center gap-4 mb-10">
          <div class="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center">
            <span class="material-symbols-outlined text-primary">${tier.iconName}</span>
          </div>
          <div>
            <h3 class="text-2xl font-bold text-indigo-900">Tier ${tier.modules[0].id <= 3 ? 1 : tier.modules[0].id <= 6 ? 2 : 3}: ${tier.tier}</h3>
            <p class="text-sm text-slate-500">${tier.tierDescription}</p>
          </div>
        </div>
        <div id="tier-${tier.tier.toLowerCase()}" class="grid grid-cols-1 ${
          tier.tier === "Complexity" ? "lg:grid-cols-3" : "md:grid-cols-2"
        } gap-8">
          <!-- Modules will be inserted here -->
        </div>
      </section>
    `;

    const section = document.createElement("div");
    section.innerHTML = sectionHTML;
    tieredSection.appendChild(section.firstElementChild);

    const tierContainer = tieredSection.querySelector(
      `#tier-${tier.tier.toLowerCase()}`
    );

    tier.modules.forEach((module) => {
      const cardHTML = module.isFeatured
        ? createFeaturedModuleCard(module)
        : createModuleCard(module);
      const card = document.createElement("div");
      card.innerHTML = cardHTML;
      tierContainer.appendChild(card.firstElementChild);
    });
  });

  attachModuleEventListeners();
}

// ─────────────────────────────────────────────────────────────────────────────
// EVENT LISTENERS
// ─────────────────────────────────────────────────────────────────────────────

function attachModuleEventListeners() {
  // Module action buttons
  document.querySelectorAll(".module-action-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (btn.disabled) return;

      const moduleId = parseInt(btn.getAttribute("data-module-id"));
      const newStatus =
        learningPathManager.getAllModules().find((m) => m.id === moduleId)
          ?.status === "completed"
          ? "completed"
          : "in-progress";

      learningPathManager.updateModuleStatus(moduleId, newStatus);
      renderCurriculum();
      updateHeroSection();
    });
  });
}

function attachSearchListener() {
  const searchInput = document.querySelector(
    'input[placeholder="Search knowledge..."]'
  );
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value;
    const filtered = learningPathManager.getAllModules(searchTerm);

    if (filtered.length === 0) {
      document.querySelector(".space-y-24").innerHTML =
        '<p class="text-center text-slate-400 py-12">No modules found matching your search.</p>';
      return;
    }

    // Render filtered modules
    const tieredSection = document.querySelector(".space-y-24");
    tieredSection.innerHTML = "";

    learningPathManager.curriculum.forEach((tier) => {
      const tierModules = tier.modules.filter((m) => filtered.includes(m));
      if (tierModules.length === 0) return;

      const sectionHTML = `
        <section>
          <div class="flex items-center gap-4 mb-10">
            <div class="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center">
              <span class="material-symbols-outlined text-primary">${tier.iconName}</span>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-indigo-900">Tier ${tier.modules[0].id <= 3 ? 1 : tier.modules[0].id <= 6 ? 2 : 3}: ${tier.tier}</h3>
              <p class="text-sm text-slate-500">${tier.tierDescription}</p>
            </div>
          </div>
          <div id="tier-${tier.tier.toLowerCase()}" class="grid grid-cols-1 ${
            tier.tier === "Complexity" ? "lg:grid-cols-3" : "md:grid-cols-2"
          } gap-8">
            <!-- Modules will be inserted here -->
          </div>
        </section>
      `;

      const section = document.createElement("div");
      section.innerHTML = sectionHTML;
      tieredSection.appendChild(section.firstElementChild);

      const tierContainer = tieredSection.querySelector(
        `#tier-${tier.tier.toLowerCase()}`
      );

      tierModules.forEach((module) => {
        const cardHTML = module.isFeatured
          ? createFeaturedModuleCard(module)
          : createModuleCard(module);
        const card = document.createElement("div");
        card.innerHTML = cardHTML;
        tierContainer.appendChild(card.firstElementChild);
      });
    });

    attachModuleEventListeners();
  });
}

function attachLogoutListener() {
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("nuralplay_session");
      localStorage.removeItem("nuralplay_session");
      window.location.replace("hero.html");
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// INITIALIZATION
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  updateHeroSection();
  renderCurriculum();
  attachSearchListener();
  attachLogoutListener();

  // Optional: Auto-save progress every 10 seconds
  setInterval(() => {
    learningPathManager.saveProgress();
  }, 10000);
});

// ─────────────────────────────────────────────────────────────────────────────
// HELPER FUNCTION: Get Module Status Badge Styling
// ─────────────────────────────────────────────────────────────────────────────

function getStatusStyle(status) {
  const styles = {
    completed: {
      bg: "bg-tertiary-fixed",
      text: "text-on-tertiary-fixed-variant",
      icon: "check_circle",
    },
    "in-progress": {
      bg: "bg-indigo-100",
      text: "text-indigo-900",
      icon: "schedule",
    },
    locked: {
      bg: "bg-slate-100",
      text: "text-slate-600",
      icon: "lock",
    },
  };
  return styles[status] || styles.locked;
}
