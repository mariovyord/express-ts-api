const refreshBtn = document.querySelector(".submit-btn");
const statusText = document.querySelector(".sub-heading");
const loading = document.querySelector(".loading");

refreshBtn.addEventListener("click", onRefreshButtonClick);

async function onRefreshButtonClick() {
  const online = "Online 😊";
  const offline = "Offline 🚫";

  try {
    loading.textContent = "Loading...";
    const res = await fetch("http://localhost:5000/api/ping");

    if (!res.ok) {
      statusText.textContent = offline;
    } else {
      statusText.textContent = online;
    }
  } catch (e) {
    statusText.textContent = offline;
  } finally {
    loading.textContent = "";
  }
}
