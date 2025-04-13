  document.querySelectorAll(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    });
  });

async function updateStatus() {
  try {
    const res = await fetch("https://hayaki-production.up.railway.app/botstatus");
    const data = await res.json();

    const lang = localStorage.getItem('siteLanguage') || 'ru';
    const t = texts[lang];  

    const statusBox = document.getElementById("status-info");
    statusBox.innerHTML = `
      <div><strong>${t.status}:</strong> ${data.status}</div>
      <div><strong>${t.region}:</strong> ${data.region}</div>
      <div><strong>${t.memory}:</strong> ${data.memory}</div>
      <div><strong>${t.uptime}:</strong> ${formatTime(data.uptime)}</div>
    `;
  } catch (e) {
    console.error("Error:", e);
  }
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

updateStatus();

setInterval(updateStatus, 10000);
