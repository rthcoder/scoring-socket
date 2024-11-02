import { Server } from "socket.io";
import error from "#error";
import model from '../model/model/client.js'

let ws = {
  clients: {}
};

const connection = (server) => {
  try {
    const io = new Server(server, {
      cors: {
        origin: "*"
      }
    });

    ws.io = io;

    io.on("connection", async (socket) => {
      console.log("Socket connection, Socket ID:", socket.id);

      const token = socket.handshake.query.token;

      const client = await model.getClient({ token })

      if (!client) {
        return socket.emit('error', new error.AuthorizationError(401, 'Unauthorized'));
      }

      const clientId = client.id

      if (clientId) {
        ws.clients[clientId] = socket;
        console.log(`Client connected with client_id: ${clientId}`);
      }

      socket.on("disconnect", () => {
        if (clientId && ws.clients[clientId]) {
          delete ws.clients[clientId];
          console.log(`Client with client_id: ${clientId} disconnected`);
        }
      });
    });

    if (Object.keys(ws.clients).length === 0) {
      console.log("Number of customers - 0");
    }
  } catch (error) {
    console.log(error.message);
    return new error.SocketError(error.message);
  }
};

const emit = (clientId, message, data) => {
  try {
    const { clients } = ws;
    const clientSocket = clients[clientId];

    if (clientSocket) {
      clientSocket.emit(message, data);
      console.log(`Sent message to client ${clientId}`);
    } else {
      console.log(`Client with client_id ${clientId} not connected`);
    }
  } catch (error) {
    console.log(error.message);
    return new error.SocketError(error.message);
  }
};

export default {
  connection,
  emit
};
