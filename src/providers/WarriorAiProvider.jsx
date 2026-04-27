import { createContext, useEffect, useMemo, useRef, useState } from "react";
import {
  buildWarriorAiReply,
  createWarriorAiGreeting,
  getWarriorAiRouteContext,
} from "../data/warriorAi";
import { useStudioNavigation } from "../hooks/useStudioNavigation";
import { useStudioRoute } from "../hooks/useStudioRoute";
import { requestWarriorAiReply } from "../services/warriorAiService";

export const WarriorAiContext = createContext(null);

const createMessage = (overrides) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  ...overrides,
});

export const WarriorAiProvider = ({ children }) => {
  const { pathname } = useStudioRoute();
  const { navigate, startBookingFlow } = useStudioNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => [createMessage(createWarriorAiGreeting(pathname))]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const requestIdRef = useRef(0);
  const routeContext = useMemo(() => getWarriorAiRouteContext(pathname), [pathname]);

  useEffect(() => {
    requestIdRef.current += 1;
    setIsThinking(false);
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    setMessages((current) => {
      const hasOnlyGreeting = current.length === 1 && current[0]?.role === "assistant";

      if (!hasOnlyGreeting) {
        return current;
      }

      return [createMessage(createWarriorAiGreeting(pathname))];
    });
  }, [pathname]);

  const closeChat = () => {
    setIsOpen(false);
  };

  const toggleChat = () => {
    setIsOpen((current) => !current);
  };

  const resetConversation = () => {
    requestIdRef.current += 1;
    setIsThinking(false);
    setInputValue("");
    setMessages([createMessage(createWarriorAiGreeting(pathname))]);
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

  const pushAssistantReply = async ({ message, history }) => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setIsThinking(true);

    try {
      const reply = await requestWarriorAiReply({ message, history });

      if (requestId !== requestIdRef.current) {
        return;
      }

      setMessages((current) => [...current, createMessage({ role: "assistant", text: reply })]);
    } catch (error) {
      if (requestId !== requestIdRef.current) {
        return;
      }

      const fallbackReply = buildWarriorAiReply(message, pathname);

      setMessages((current) => [
        ...current,
        createMessage({
          role: "assistant",
          text: fallbackReply.text,
          actions: fallbackReply.actions,
        }),
      ]);
    } finally {
      if (requestId === requestIdRef.current) {
        setIsThinking(false);
      }
    }
  };

  const submitUserMessage = async (rawValue) => {
    const trimmedValue = rawValue.trim();
    if (!trimmedValue || isThinking) {
      return;
    }

    const history = messages.map(({ role, text }) => ({ role, text }));

    setMessages((current) => [...current, createMessage({ role: "user", text: trimmedValue })]);
    setInputValue("");
    await pushAssistantReply({ message: trimmedValue, history });
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
      routeContext,
      setInputValue,
      closeChat,
      toggleChat,
      resetConversation,
      submitUserMessage,
      handleActionClick,
    }),
    [inputValue, isOpen, isThinking, messages, pathname, routeContext]
  );

  return <WarriorAiContext.Provider value={value}>{children}</WarriorAiContext.Provider>;
};
