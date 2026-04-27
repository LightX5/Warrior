import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "../config/site";
import { useHeroFirstScreen } from "../hooks/useHeroFirstScreen";
import { useStudioRoute } from "../hooks/useStudioRoute";
import { useWarriorAi } from "../hooks/useWarriorAi";
import { BotIcon, CloseIcon, SendIcon, SparklesIcon } from "./icons";

export const WarriorAIChat = () => {
  const { pathname } = useStudioRoute();
  const isHeroFirstScreen = useHeroFirstScreen(pathname, 0.76);
  const {
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
  } = useWarriorAi();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isThinking]);

  return (
    <>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/55 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeChat}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen ? (
          <motion.section
            id="warrior-ai-panel"
            className="fixed inset-x-4 bottom-[5.5rem] z-[75] overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909]/96 shadow-[0_26px_80px_rgba(0,0,0,0.46)] backdrop-blur-2xl sm:inset-x-auto sm:right-6 sm:w-[24rem] sm:bottom-24 lg:w-[26rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative overflow-hidden border-b border-white/10 px-5 py-5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(213,179,89,0.18),transparent_48%)]" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent-soft">
                    <BotIcon />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.32em] text-accent-soft/85">
                      Warrior AI
                    </p>
                    <h2 className="mt-2 font-display text-3xl text-white">Studio Guide</h2>
                    <p className="mt-2 max-w-[16rem] text-sm leading-6 text-white/62">
                      A premium preview assistant for helping visitors move toward the right next step.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/25 hover:bg-white/10"
                  onClick={closeChat}
                  aria-label="Close Warrior AI"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="max-h-[min(55svh,24rem)] space-y-4 overflow-y-auto px-5 py-5 sm:max-h-[24rem]"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.role === "assistant"
                      ? "space-y-3"
                      : "flex flex-col items-end gap-3"
                  }
                >
                  <div
                    className={`max-w-[88%] rounded-[1.5rem] px-4 py-3 text-sm leading-7 ${
                      message.role === "assistant"
                        ? "border border-white/10 bg-white/[0.04] text-white/76"
                        : "bg-accent text-black shadow-[0_16px_36px_rgba(213,179,89,0.18)]"
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>

                  {message.role === "assistant" && message.actions?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.actions.map((action) => (
                        <button
                          key={`${message.id}-${action.label}`}
                          type="button"
                          className="inline-flex min-h-10 items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/74 transition hover:border-accent/40 hover:bg-accent/10 hover:text-white"
                          onClick={() => handleActionClick(action)}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}

              {isThinking ? (
                <div className="max-w-[88%] rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/68">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent-soft animate-pulse" />
                    <span>Warrior AI is preparing a suggestion...</span>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-white/10 px-5 py-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.28em] text-white/38">
                  Preview conversation
                </p>
                <button
                  type="button"
                  className="text-xs uppercase tracking-[0.26em] text-accent-soft/80 transition hover:text-accent-soft"
                  onClick={resetConversation}
                >
                  Restart
                </button>
              </div>

              <form
                className="flex items-end gap-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  submitUserMessage(inputValue);
                }}
              >
                <label className="sr-only" htmlFor="warrior-ai-input">
                  Ask Warrior AI about your shoot
                </label>
                <textarea
                  id="warrior-ai-input"
                  rows="1"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  className="field-input min-h-[3.2rem] flex-1 resize-none rounded-[1.4rem] pr-4"
                  placeholder="Tell Warrior AI the kind of shoot you want..."
                />
                <button
                  type="submit"
                  className="primary-button h-[3.2rem] w-[3.2rem] rounded-[1.2rem] px-0"
                  disabled={isThinking}
                  aria-label="Send message"
                >
                  <SendIcon className="h-4 w-4" />
                </button>
              </form>

              <div className="mt-4 flex items-start gap-2 text-xs leading-6 text-white/42">
                <SparklesIcon className="mt-0.5 h-4 w-4 text-accent-soft/75" />
                <p>
                  Warrior AI is currently a premium UI preview. Future versions can connect directly
                  to a real assistant for {siteConfig.brandName}.
                </p>
              </div>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        className={`fixed right-4 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-[1.45rem] border border-accent/30 bg-[#0f0f0f]/96 p-0 text-left shadow-[0_24px_55px_rgba(0,0,0,0.42)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-accent/50 sm:right-6 sm:h-auto sm:w-auto sm:gap-3 sm:px-4 sm:py-3 ${
          isHeroFirstScreen
            ? "bottom-[5.5rem] opacity-0 pointer-events-none sm:bottom-6 sm:opacity-72 sm:pointer-events-auto"
            : "bottom-[5.5rem] opacity-100 sm:bottom-6"
        }`}
        onClick={toggleChat}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        aria-expanded={isOpen}
        aria-controls="warrior-ai-panel"
      >
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-accent-soft">
          <BotIcon />
        </div>
        <div className="hidden sm:block">
          <p className="text-xs uppercase tracking-[0.28em] text-accent-soft/80">Warrior AI</p>
          <p className={`mt-1 text-sm text-white/72 ${isHeroFirstScreen ? "hidden" : "block"}`}>
            Ask about shoots, pricing, or next steps
          </p>
        </div>
      </motion.button>
    </>
  );
};
