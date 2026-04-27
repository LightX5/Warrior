import { createContext, useEffect, useMemo, useRef, useState } from "react";
import { buildWarriorAiReply, createWarriorAiGreeting } from "../data/warriorAi";
import { useStudioNavigation } from "../hooks/useStudioNavigation";
import { useStudioRoute } from "../hooks/useStudioRoute";

export const WarriorAiContext = createContext(null);

const createMessage = (overrides) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  ...overrides,
});

export const WarriorAiProvider = ({ children }) => {
  const { pathname } = useStudioRoute();
  const { navigate, startBookingFlow } = useStudioNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => [createMessage(createWarriorAiGreeting())]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const thinkingTimeoutRef = useRef(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(
    () => () => {
      if (thinkingTimeoutRef.current) {
        window.clearTimeout(thinkingTimeoutRef.current);
      }
    },
    []
  );

  const closeChat = () => {
    setIsOpen(false);
  };

  const toggleChat = () => {
    setIsOpen((current) => !current);
  };

  const resetConversation = () => {
    if (thinkingTimeoutRef.current) {
      window.clearTimeout(thinkingTimeoutRef.current);
    }

    setIsThinking(false);
    setInputValue("");
    setMessages([createMessage(createWarriorAiGreeting())]);
  };

  const handleRouteAction = (action) => {
    closeChat();
    if (action.type === "booking") {
      startBookingFlow();
      return;
    }

    if (action.value) {
      navigate(action.value);
    }
  };

  const pushAssistantReply = (content) => {
    setIsThinking(true);

    thinkingTimeoutRef.current = window.setTimeout(() => {
      setMessages((current) => [...current, createMessage({ role: "assistant", ...content })]);
      setIsThinking(false);
    }, 650);
  };

  const submitUserMessage = (rawValue) => {
    const trimmedValue = rawValue.trim();
    if (!trimmedValue || isThinking) {
      return;
    }

    setMessages((current) => [...current, createMessage({ role: "user", text: trimmedValue })]);
    setInputValue("");
    pushAssistantReply(buildWarriorAiReply(trimmedValue));
  };

  const handleActionClick = (action) => {
    if (action.type === "prompt") {
      submitUserMessage(action.value);
      return;
    }

    handleRouteAction(action);
  };

  const value = useMemo(
    () => ({
      isOpen,
      messages,
      inputValue,
      isThinking,
      setInputValue,
      closeChat,
      toggleChat,
      resetConversation,
      submitUserMessage,
      handleActionClick,
    }),
    [inputValue, isOpen, isThinking, messages]
  );

  return <WarriorAiContext.Provider value={value}>{children}</WarriorAiContext.Provider>;
};
