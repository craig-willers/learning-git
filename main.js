"use strict";

const scenes = {
  repository: sceneRepository,
  clone: sceneClone,
  branch: sceneBranch,
  commit: sceneCommit,
  sync: sceneSync,
  diff: sceneDiff,
  merge: sceneMerge,
  rebase: sceneRebase,
  conflict: sceneConflict,
  pr: scenePullRequest,
  issue: sceneIssue
};

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function say(section, text) {
  const beat = section.querySelector(".beat");
  if (beat) beat.textContent = text;
}

function clearMotion(section) {
  section.querySelectorAll("svg *").forEach((node) => {
    if (node.style) node.style.cssText = "";
  });
}

function lineLength(path) {
  try {
    return path.getTotalLength();
  } catch (error) {
    return 400;
  }
}

function prepDraw(path) {
  const length = lineLength(path);
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 });
  return length;
}

function timeline() {
  return gsap.timeline({
    paused: true,
    defaults: { duration: 0.65, ease: "power2.out", force3D: false }
  });
}

function sceneRepository(section) {
  const q = (sel) => section.querySelector(sel);
  const connector = q(".connector");
  gsap.set(q(".gitdir"), { opacity: 0, scale: 0.96, transformOrigin: "50% 50%" });
  gsap.set(q(".remote"), { opacity: 0 });
  gsap.set(q(".pulse"), { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" });
  prepDraw(connector);

  const tl = timeline();
  tl.call(() => say(section, "Start with a project folder. Git is not tracking it yet."))
    .to({}, { duration: 0.45 })
    .call(() => say(section, "git init creates a hidden .git directory. That directory is the history."))
    .to(q(".gitdir"), { opacity: 1, scale: 1, duration: 0.5 })
    .call(() => say(section, "A host such as GitHub keeps another copy. That copy is the remote, often named origin."))
    .to(connector, { strokeDashoffset: 0, duration: 0.7, ease: "power1.inOut" })
    .to(q(".remote"), { opacity: 1, duration: 0.45 }, "-=0.15")
    .to(q(".pulse"), { opacity: 0.8, scale: 1.8, duration: 0.45, ease: "power1.out" })
    .to(q(".pulse"), { opacity: 0, scale: 2.4, duration: 0.5 });
  return tl;
}

function sceneClone(section) {
  const q = (sel) => section.querySelector(sel);
  const files = section.querySelectorAll(".screen-file");
  const packet = q(".packet");
  const link = q(".origin-link");
  gsap.set(packet, { opacity: 0, x: 0, y: 0 });
  gsap.set(files, { opacity: 0 });
  gsap.set(q(".origin-tag"), { opacity: 0 });
  prepDraw(link);

  const tl = timeline();
  tl.call(() => say(section, "The repository already lives on the host."))
    .to(packet, { opacity: 1, duration: 0.3 })
    .call(() => say(section, "Clone downloads the files and the whole history onto your machine."))
    .to(packet, { x: -360, duration: 1.15, ease: "power2.inOut" })
    .to(files, { opacity: 1, stagger: 0.1 }, "-=0.2")
    .to(packet, { opacity: 0, duration: 0.3 }, "-=0.35")
    .call(() => say(section, "Your copy stores the URL as a remote named origin, so push and pull know where to go."))
    .to(link, { strokeDashoffset: 0, duration: 0.6, ease: "power1.inOut" })
    .to(q(".origin-tag"), { opacity: 1, duration: 0.35 }, "-=0.2");
  return tl;
}

function sceneBranch(section) {
  const q = (sel) => section.querySelector(sel);
  const branchCommits = section.querySelectorAll(".branch-commit");
  const later = q(".main-later");
  gsap.set(q(".branch-line"), { opacity: 1 });
  gsap.set(branchCommits, { opacity: 0, scale: 0.4, transformOrigin: "center" });
  gsap.set(q(".label-branch"), { opacity: 0, y: 6 });
  gsap.set(later, { opacity: 0 });
  gsap.set(q(".main-extend"), { opacity: 1 });
  prepDraw(q(".branch-line"));
  prepDraw(q(".main-extend"));

  const tl = timeline();
  tl.call(() => say(section, "main is a pointer moving along a line of commits. Time runs left to right."))
    .to({}, { duration: 0.35 })
    .call(() => say(section, "A branch is a new pointer. It diverges without copying the project."))
    .to(q(".branch-line"), { strokeDashoffset: 0, duration: 0.85, ease: "power1.inOut" })
    .to(branchCommits, { opacity: 1, scale: 1, stagger: 0.16 }, "-=0.25")
    .to(q(".label-branch"), { opacity: 1, y: 0 }, "-=0.3")
    .call(() => say(section, "main can take a commit of its own. The feature commits stay off to the side."))
    .to(q(".main-extend"), { strokeDashoffset: 0, duration: 0.55, ease: "power1.inOut" })
    .to(later, { opacity: 1, duration: 0.35 });
  return tl;
}

function sceneCommit(section) {
  const q = (sel) => section.querySelector(sel);
  gsap.set(q(".new-line"), { opacity: 0 });
  gsap.set(q(".staged"), { opacity: 0, y: 6 });
  gsap.set(q(".new-commit"), { opacity: 0, scale: 0.3, transformOrigin: "center" });
  gsap.set(q(".ring"), { opacity: 0, scale: 0.5, transformOrigin: "center" });
  gsap.set(q(".message"), { opacity: 0, y: 8 });
  gsap.set(q(".parent-link"), { opacity: 1 });
  prepDraw(q(".parent-link"));

  const tl = timeline();
  tl.call(() => say(section, "The file still has the old nav color. Nothing is recorded."))
    .to(q(".old-line"), { fill: "#a33b32", duration: 0.35 })
    .to(q(".new-line"), { opacity: 1, duration: 0.35 }, "<")
    .to(q(".old-line"), { opacity: 0, duration: 0.35 }, "<0.15")
    .call(() => say(section, "Stage the file you want in the snapshot. The message says what changed, and why."))
    .to(q(".staged"), { opacity: 1, y: 0, duration: 0.4 })
    .to(q(".staged"), { opacity: 0, duration: 0.3, delay: 0.45 })
    .call(() => say(section, "The commit freezes the whole project and points at the previous snapshot."))
    .to(q(".parent-link"), { strokeDashoffset: 0, duration: 0.45, ease: "power1.inOut" })
    .to(q(".ring"), { opacity: 0.9, scale: 1, duration: 0.35 }, "-=0.1")
    .to(q(".new-commit"), { opacity: 1, scale: 1, duration: 0.35 }, "<")
    .to(q(".ring"), { opacity: 0, scale: 1.7, duration: 0.45 })
    .to(q(".message"), { opacity: 1, y: 0 }, "-=0.3");
  return tl;
}

function sceneSync(section) {
  const q = (sel) => section.querySelector(sel);
  gsap.set(q(".travel-push"), { opacity: 0, x: 0 });
  gsap.set(q(".travel-pull"), { opacity: 0, x: 0 });
  gsap.set(q(".remote-c2"), { opacity: 0, scale: 0.4, transformOrigin: "center" });
  gsap.set(q(".remote-c3"), { opacity: 0, scale: 0.4, transformOrigin: "center" });
  gsap.set(q(".local-c3"), { opacity: 0, scale: 0.4, transformOrigin: "center" });
  gsap.set(q(".label-theirs"), { opacity: 0 });
  gsap.set(q(".tag-push"), { opacity: 0 });
  gsap.set(q(".tag-pull"), { opacity: 0 });
  gsap.set(q(".tag-sync"), { opacity: 0 });

  const tl = timeline();
  tl.call(() => say(section, "This commit is on your machine. The remote does not have it yet."))
    .to(q(".tag-push"), { opacity: 1, duration: 0.3 })
    .to(q(".travel-push"), { opacity: 1, duration: 0.2 })
    .to(q(".travel-push"), { x: 340, duration: 0.9, ease: "power2.inOut" })
    .to(q(".remote-c2"), { opacity: 1, scale: 1, duration: 0.3 }, "-=0.15")
    .to(q(".travel-push"), { opacity: 0, duration: 0.2 })
    .call(() => say(section, "Someone else pushed. Pull downloads their commit and joins it into your branch."))
    .to(q(".tag-push"), { opacity: 0, duration: 0.2 })
    .to(q(".remote-c3"), { opacity: 1, scale: 1, duration: 0.35 })
    .to(q(".label-theirs"), { opacity: 1, duration: 0.3 }, "<")
    .to(q(".tag-pull"), { opacity: 1, duration: 0.25 })
    .to(q(".travel-pull"), { opacity: 1, duration: 0.2 })
    .to(q(".travel-pull"), { x: -340, duration: 0.9, ease: "power2.inOut" })
    .to(q(".local-c3"), { opacity: 1, scale: 1, duration: 0.3 }, "-=0.15")
    .to(q(".travel-pull"), { opacity: 0, duration: 0.2 })
    .to(q(".tag-pull"), { opacity: 0, duration: 0.2 })
    .call(() => say(section, "Push uploads. Pull downloads and integrates. Uncommitted files travel with neither."))
    .to(q(".tag-sync"), { opacity: 1, duration: 0.35 });
  return tl;
}

function sceneDiff(section) {
  const q = (sel) => section.querySelector(sel);
  gsap.set(q(".add-color"), { opacity: 0 });
  gsap.set(q(".add-size"), { opacity: 0 });
  gsap.set(q(".legend"), { opacity: 0 });
  prepDraw(q(".strike-color"));
  prepDraw(q(".strike-size"));

  const tl = timeline();
  tl.call(() => say(section, "Both branches currently hold the same rules."))
    .to({}, { duration: 0.4 })
    .call(() => say(section, "A diff is the edit itself: removed lines, added lines, and a little context."))
    .to(q(".old-color"), { fill: "#a33b32", duration: 0.25 })
    .to(q(".strike-color"), { strokeDashoffset: 0, duration: 0.4 }, "<")
    .to(q(".old-color"), { opacity: 0, duration: 0.3 })
    .to(q(".strike-color"), { opacity: 0, duration: 0.3 }, "<")
    .to(q(".add-color"), { opacity: 1, duration: 0.35 }, "-=0.1")
    .to(q(".old-size"), { fill: "#a33b32", duration: 0.25 })
    .to(q(".strike-size"), { strokeDashoffset: 0, duration: 0.4 }, "<")
    .to(q(".old-size"), { opacity: 0, duration: 0.3 })
    .to(q(".strike-size"), { opacity: 0, duration: 0.3 }, "<")
    .to(q(".add-size"), { opacity: 1, duration: 0.35 }, "-=0.1")
    .to(q(".legend"), { opacity: 1, duration: 0.35 })
    .call(() => say(section, "main...feature shows what the feature branch changed since it left main."));
  return tl;
}

function sceneMerge(section) {
  const q = (sel) => section.querySelector(sel);
  gsap.set(q(".merge-node"), { opacity: 0, scale: 0.3, transformOrigin: "center" });
  gsap.set(q(".merge-label"), { opacity: 0, y: 6 });
  prepDraw(q(".merge-curve"));
  prepDraw(q(".main-to-merge"));

  const tl = timeline();
  tl.call(() => say(section, "Both timelines have commits the other does not. A fast-forward is not possible."))
    .to({}, { duration: 0.45 })
    .call(() => say(section, "Merge joins the feature pointer into main and ties the two tips together."))
    .to(q(".merge-curve"), { strokeDashoffset: 0, duration: 0.8, ease: "power1.inOut" })
    .to(q(".main-to-merge"), { strokeDashoffset: 0, duration: 0.55, ease: "power1.inOut" }, "-=0.35")
    .to(q(".merge-node"), { opacity: 1, scale: 1, duration: 0.35 })
    .to(q(".merge-label"), { opacity: 1, y: 0, duration: 0.35 })
    .call(() => say(section, "The new commit has two parents. History still shows that the branch happened."));
  return tl;
}

function sceneRebase(section) {
  const q = (sel) => section.querySelector(sel);
  gsap.set(q(".replay"), { x: 0, y: 0 });
  gsap.set(q(".ghost"), { opacity: 1 });
  gsap.set(q(".old-label"), { opacity: 1 });
  gsap.set(q(".after-link"), { opacity: 1 });
  gsap.set(section.querySelectorAll(".prime"), { opacity: 0 });
  prepDraw(q(".after-link"));

  const tl = timeline();
  tl.call(() => say(section, "Your commits still sit on the old tip. main has moved on."))
    .to({}, { duration: 0.45 })
    .call(() => say(section, "Rebase lifts those commits and replays them, in order, on the latest main."))
    .to(q(".replay"), { y: 132, x: 150, duration: 1.15, ease: "power2.inOut" })
    .to(q(".old-branch"), { opacity: 0.2, duration: 0.4 }, "<")
    .to(q(".old-label"), { opacity: 0, duration: 0.4 }, "<")
    .to(q(".after-link"), { strokeDashoffset: 0, duration: 0.45, ease: "power1.inOut" })
    .to(q(".ghost"), { opacity: 0, duration: 0.4 })
    .to(q(".old-branch"), { opacity: 0, duration: 0.4 }, "<")
    .to(section.querySelectorAll(".prime"), { opacity: 1, duration: 0.3 })
    .call(() => say(section, "Same changes, new commits. The old ones are abandoned. Do this on a branch you are not sharing."));
  return tl;
}

function sceneConflict(section) {
  const q = (sel) => section.querySelector(sel);
  gsap.set(q(".state-markers"), { opacity: 0 });
  gsap.set(q(".state-choice"), { opacity: 0 });
  gsap.set(q(".state-resolved"), { opacity: 0 });
  gsap.set(q(".pick"), { opacity: 0, scale: 0.8, transformOrigin: "center" });

  const tl = timeline();
  tl.call(() => say(section, "main kept 16px. The feature branch set 18px on the same line."))
    .to({}, { duration: 0.7 })
    .to(q(".state-split"), { opacity: 0, duration: 0.35 })
    .call(() => say(section, "Git writes conflict markers and waits. Nothing is committed for you."))
    .to(q(".state-markers"), { opacity: 1, duration: 0.4 }, "-=0.05")
    .to({}, { duration: 0.7 })
    .to(q(".state-markers"), { opacity: 0, duration: 0.3 })
    .call(() => say(section, "You choose the text that should remain, then delete the markers."))
    .to(q(".state-choice"), { opacity: 1, duration: 0.35 })
    .to(q(".pick"), { opacity: 1, scale: 1, duration: 0.35 })
    .to(q(".opt-feature"), { opacity: 0.35, duration: 0.35 }, "-=0.1")
    .to({}, { duration: 0.45 })
    .to(q(".state-choice"), { opacity: 0, duration: 0.3 })
    .to(q(".state-resolved"), { opacity: 1, duration: 0.4 })
    .call(() => say(section, "The contrast change stays. The size stays 16px. Stage the file to finish the merge."));
  return tl;
}

function scenePullRequest(section) {
  const q = (sel) => section.querySelector(sel);
  gsap.set(q(".comment"), { opacity: 0, y: 10 });
  gsap.set(q(".approve"), { opacity: 0, scale: 0.85, transformOrigin: "center" });
  gsap.set(q(".merge-fill"), { opacity: 1, scaleX: 0, transformOrigin: "left center" });
  gsap.set(q(".merged-flag"), { opacity: 0 });

  const tl = timeline();
  tl.call(() => say(section, "The pull request says: please look at this branch, then merge it."))
    .to({}, { duration: 0.45 })
    .call(() => say(section, "Review comments sit on the diff. New commits you push show up here too."))
    .to(q(".comment"), { opacity: 1, y: 0, duration: 0.5 })
    .to({}, { duration: 0.35 })
    .call(() => say(section, "Approval is a review decision. Merging is a separate step."))
    .to(q(".approve"), { opacity: 1, scale: 1, duration: 0.4 })
    .to(q(".merge-fill"), { scaleX: 1, duration: 0.45, ease: "power2.inOut" })
    .to(q(".merge-label"), { fill: "#f7f3ea", duration: 0.25 }, "-=0.25")
    .to(q(".merged-flag"), { opacity: 1, duration: 0.3 })
    .to(q(".open-flag"), { opacity: 0, duration: 0.3 }, "<");
  return tl;
}

function sceneIssue(section) {
  const q = (sel) => section.querySelector(sel);
  gsap.set(q(".issue-title"), { opacity: 0, y: 6 });
  gsap.set(q(".bug"), { opacity: 0, scale: 0.8, transformOrigin: "left center" });
  gsap.set(q(".task"), { opacity: 0, scale: 0.8, transformOrigin: "left center" });
  gsap.set(q(".pr-link"), { opacity: 0, y: 6 });
  gsap.set(q(".status-closed"), { opacity: 0 });

  const tl = timeline();
  tl.call(() => say(section, "An issue is a ticket on the host: a bug, a feature, or a task. It is not a commit."))
    .to(q(".placeholder"), { opacity: 0, duration: 0.3 })
    .to(q(".issue-title"), { opacity: 1, y: 0, duration: 0.45 })
    .call(() => say(section, "Labels make a long list scannable. This one is a bug in the nav."))
    .to(q(".bug"), { opacity: 1, scale: 1, duration: 0.35 })
    .to(q(".task"), { opacity: 1, scale: 1, duration: 0.35 }, "-=0.1")
    .to({}, { duration: 0.25 })
    .call(() => say(section, "Fixes #18 in the pull request links the work. Merging can close the ticket."))
    .to(q(".pr-link"), { opacity: 1, y: 0, duration: 0.4 })
    .to(q(".status-open"), { opacity: 0, duration: 0.25 })
    .to(q(".status-closed"), { opacity: 1, duration: 0.35 }, "<");
  return tl;
}

function play(section, replay) {
  if (!window.gsap || !scenes[section.dataset.scene]) return;
  if (!replay && section.dataset.played === "true") return;
  if (section._tl) section._tl.kill();
  clearMotion(section);
  const tl = scenes[section.dataset.scene](section);
  section._tl = tl;
  section.dataset.played = "true";
  if (reducedMotion() && !replay) tl.progress(1);
  else tl.play(0);
}

function bindNavigation() {
  const links = Array.from(document.querySelectorAll(".nav a"));
  const sections = Array.from(document.querySelectorAll(".concept"));

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const current = link.getAttribute("href") === `#${entry.target.id}`;
        if (current) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-20% 0px -60% 0px", threshold: 0.01 });

  sections.forEach((section) => spy.observe(section));

  const stages = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      play(entry.target.closest(".concept"));
      stages.unobserve(entry.target);
    });
  }, { threshold: 0.45 });

  document.querySelectorAll(".stage").forEach((stage) => stages.observe(stage));

  document.querySelectorAll(".replay").forEach((button) => {
    button.addEventListener("click", () => {
      play(button.closest(".concept"), true);
    });
  });
}

bindNavigation();
