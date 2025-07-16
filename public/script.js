const socket = io();

const joinBtn = document.getElementById("joinBtn");
const roomInput = document.getElementById("roomInput");
const videoContainer = document.getElementById("videoContainer");

const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

let localStream;

joinBtn.addEventListener("click", async () => {
  const roomId = roomInput.value;
  if (!roomId) return alert("Please enter a room ID");

  socket.emit("join-room", roomId);
  videoContainer.classList.remove("hidden");

  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  localVideo.srcObject = localStream;
});

// For demo: you can simulate remote stream with same video feed
socket.on("user-connected", () => {
  remoteVideo.srcObject = localStream;
});
