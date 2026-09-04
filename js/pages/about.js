/**
 * about.js (page script)
 * Renders the team grid on about.html from a small local dataset,
 * so the markup never duplicates repeating card structure.
 */

const team = [
  {
    name: "Ochie Nwosu",
    role: "Founder & Managing Director",
    photo: "assets/images/about/profile-1.jpg",
  },
  {
    name: "Adaeze Chukwu",
    role: "Head of Sales",
    photo: "assets/images/about/profile2.jpg",
  },
  {
    name: "Emeka Obi",
    role: "Client Relations Lead",
    photo: "assets/images/about/profile3.jpg",
  },
];

function renderTeam() {
  const grid = document.getElementById("teamGrid");
  if (!grid) return;

  grid.innerHTML = team
    .map(
      (member) => `
      <div class="team-card">
        <div class="team-photo">
          <img src="${member.photo}" alt="Portrait of ${member.name}, ${member.role}" loading="lazy" width="300" height="300" />
        </div>
        <h3>${member.name}</h3>
        <span>${member.role}</span>
      </div>
    `,
    )
    .join("");

  grid.querySelectorAll("img").forEach((img) => {
    img.addEventListener(
      "error",
      () => {
        img.src = "assets/images/placeholder.svg";
      },
      { once: true },
    );
  });
}

document.addEventListener("DOMContentLoaded", renderTeam);
