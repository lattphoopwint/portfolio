(function renderPortfolio() {
  const data = window.PORTFOLIO_DATA;

  if (!data) {
    return;
  }

  const { profile, about, careerGoal, experience, education, volunteering, languages } = data;

  setText("name", profile.name);
  setText("footer-name", profile.name);
  setText("current-role", `${profile.title} at ${profile.company}`);
  setText(
    "headline",
    `${profile.name} is currently working as a ${profile.title} at ${profile.company}.`
  );
  setText("location-current", profile.currentLocation);
  setText("location-origin", profile.origin);
  setText("about-text", about);
  setText("career-goal-text", careerGoal);
  setText("year", new Date().getFullYear());

  setLink("email-link", `mailto:${profile.email}`, profile.email);
  setLink("linkedin-link", profile.linkedin, "LinkedIn (placeholder)");

  const photoElement = document.getElementById("profile-photo");
  if (photoElement && profile.photo) {
    photoElement.src = profile.photo;
  }

  renderTimeline("experience-list", experience, (item) => ({
    title: item.role,
    subtitle: item.organization,
    period: item.period,
    description: item.description,
    link: item.website,
  }));

  renderTimeline("education-list", education, (item) => ({
    title: item.program,
    subtitle: item.institution,
    period: item.period,
    note: item.note,
    description: item.description,
  }));

  renderTimeline("volunteer-list", volunteering, (item) => ({
    title: item.role,
    subtitle: item.organization,
    period: item.period,
    description: item.description,
  }));

  const languageList = document.getElementById("language-list");
  if (languageList) {
    languages.forEach((item) => {
      const li = document.createElement("li");
      li.className = "language-item";
      li.innerHTML = `<span>${item.language}</span><strong>${item.level}</strong>`;
      languageList.appendChild(li);
    });
  }
})();

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

function setLink(id, href, text) {
  const element = document.getElementById(id);
  if (element) {
    element.href = href;
    element.textContent = text;
  }
}

function renderTimeline(containerId, items, normalize) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  items.forEach((rawItem) => {
    const item = normalize(rawItem);
    const article = document.createElement("article");
    article.className = "timeline-item";

    const titleHtml = item.link
      ? `<h3>${item.title} · <a href="${item.link}" target="_blank" rel="noreferrer">${item.subtitle}</a></h3>`
      : `<h3>${item.title} · ${item.subtitle}</h3>`;

    article.innerHTML = `
      ${titleHtml}
      <p class="timeline-item__period">${item.period}</p>
      ${item.note ? `<p class="timeline-item__note">${item.note}</p>` : ""}
      <p>${item.description}</p>
    `;

    container.appendChild(article);
  });
}
