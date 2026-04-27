import { useContext } from "react";
import { WarriorAiContext } from "../providers/WarriorAiProvider";

export const useWarriorAi = () => {
  const context = useContext(WarriorAiContext);

  if (!context) {
    throw new Error("useWarriorAi must be used within WarriorAiProvider.");
  }

  return context;
};
