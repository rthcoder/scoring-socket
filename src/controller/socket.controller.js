import error from "#error";
import socket from "#socket";
import model from '../model/model/client.js';

const SEND = async (req, res, next) => {
  try {

    const accessToken = req.headers.authorization?.replace(
      /^(bearer)\s/i,
      '',
    );

    const client = await model.getClient({ token: accessToken })

    if (!client) {
      throw new error.AuthorizationError(401, 'Unauthorized');
    }

    const data = req?.body;

    if (data?.method !== "scoring_done") {
      throw new error.SocketError(400, "Something went wrong!");
    }

    const clientId = data?.data?.client_id;

    if (!clientId) {
      throw new error.SocketError(400, "Client ID is missing");
    }

    socket.emit(clientId, "scoring_done", data);

    return res.status(201).json({
      status: 201,
      message: "success",
      data: data
    });

  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export default {
  SEND
};
