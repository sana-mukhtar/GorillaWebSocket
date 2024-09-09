document.addEventListener('DOMContentLoaded', () => {
    // Create a new WebSocket connection
    const socket = new WebSocket('ws://localhost:8080/ws');

    // Event listener for when the connection is open
    socket.onopen = () => {
        console.log('WebSocket connection opened');
    };

    // Event listener for when a message is received
    socket.onmessage = (event) => {
        console.log('Message from server:', event.data);
        document.getElementById('receivedMessage').textContent = 'Received: ' + event.data;
    };

    // Event listener for when the connection is closed
    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    // Event listener for when an error occurs
    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    // Function to send a message to the server
    function sendMessage() {
        const message = document.getElementById('messageInput').value;
        socket.send(message);
        console.log('Message sent:', message);
    }

    // Attach sendMessage function to button click
    document.getElementById('sendButton').addEventListener('click', sendMessage);
});
