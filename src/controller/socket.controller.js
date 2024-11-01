import socket from "#socket";
import error from "#error";

const SEND = async (req, res, next) => {
  try {
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
