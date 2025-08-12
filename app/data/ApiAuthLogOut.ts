import ApiClient from "~/hooks/ApiClient";

export const ApiAuthLogOut = async (sessionId: number, userId: number): Promise<any> => {
  try {
    await ApiClient.post("/Auth/logout", {
      sessionId,
      userId,
    });
  } catch (error) {
    console.error("Error cerrando sesión:", error);
  }
};
