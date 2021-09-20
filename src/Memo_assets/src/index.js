import { Memo } from "../../declarations/Memo";

document.getElementById("clickMeBtn").addEventListener("click", async () => {
  const name = document.getElementById("name").value.toString();
  // Interact with Memo actor, calling the greet method
  const greeting = await Memo.greet(name);

  document.getElementById("greeting").innerText = greeting;
});
