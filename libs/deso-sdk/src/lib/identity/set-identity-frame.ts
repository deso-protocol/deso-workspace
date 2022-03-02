export const setIdentityFrame = (createNewIdentityFrame = false): void => {
  let frame = document.getElementById("identity");
  if (frame && createNewIdentityFrame) {
    frame.remove();
  }
  if (!createNewIdentityFrame) {
    return;
  }

  frame = document.createElement("iframe");
  frame.setAttribute("src", "https://identity.deso.org/embed?v=2");
  frame.setAttribute("id", "identity");
  frame.style.width = "100vh";
  frame.style.height = "100vh";
  frame.style.position = "fixed";
  frame.style.zIndex = "1000";
  frame.style.display = "none";
  frame.style.left = "0";
  frame.style.right = "0";

  const root = document.getElementsByTagName("body")[0];
  if (root) {
    root.appendChild(frame);
  }
};
