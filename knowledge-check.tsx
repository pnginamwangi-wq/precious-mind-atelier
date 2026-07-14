import { useState } from "react";
import { Check, X } from "lucide-react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Hairline } from "./tokens";
import type { QuizQuestion } from "@/data/curriculum";

type QuestionState = {
  selected: string | null;
  submitted: boolean;
};

/**
 * Self-paced knowledge check for a chapter. Deliberately framed as a private
 * study aid rather than a graded test: it does not gate or feed into the
 * Academy's Certificate of Completion (see Governance Charter, Article V).
 */
export function KnowledgeCheck({ questions }: { questions: QuizQuestion[] }) {
  const [state, setState] = useState<QuestionState[]>(() =>
    questions.map(() => ({ selected: null, submitted: false })),
  );

  const allSubmitted = state.every((s) => s.submitted);
  const correctCount = state.filter(
    (s, i) => s.submitted && questions[i].options[Number(s.selected)]?.correct,
  ).length;

  function selectOption(qIndex: number, value: string) {
    setState((prev) =>
      prev.map((s, i) => (i === qIndex ? { ...s, selected: value } : s)),
    );
  }

  function submit(qIndex: number) {
    setState((prev) =>
      prev.map((s, i) => (i === qIndex ? { ...s, submitted: true } : s)),
    );
  }

  return (
    <div className="space-y-10">
      {questions.map((q, qIndex) => {
        const s = state[qIndex];
        const correctIndex = q.options.findIndex((o) => o.correct);
        const selectedIndex = s.selected !== null ? Number(s.selected) : null;
        const isCorrect = s.submitted && selectedIndex === correctIndex;

        return (
          <div key={q.prompt} className="border border-white/10 p-8 md:p-10">
            <p className="font-numeric text-[10px] uppercase tracking-[0.28em] text-gold">
              Question {qIndex + 1} of {questions.length}
            </p>
            <p className="mt-4 font-display text-xl leading-snug text-ivory md:text-2xl">
              {q.prompt}
            </p>

            <RadioGroup
              className="mt-6 space-y-3"
              value={s.selected ?? undefined}
              onValueChange={(value) => selectOption(qIndex, value)}
              disabled={s.submitted}
              aria-label={q.prompt}
            >
              {q.options.map((opt, oIndex) => {
                const id = `q${qIndex}-o${oIndex}`;
                const isThisCorrect = Boolean(opt.correct);
                const isThisSelected = selectedIndex === oIndex;
                return (
                  <label
                    key={id}
                    htmlFor={id}
                    className={cn(
                      "flex cursor-pointer items-center gap-4 border border-white/10 px-5 py-4 text-[14px] font-light text-ivory/90 transition-colors",
                      !s.submitted && "hover:border-gold/50",
                      s.submitted && isThisCorrect && "border-gold/70 bg-gold/5",
                      s.submitted &&
                        isThisSelected &&
                        !isThisCorrect &&
                        "border-red-400/40 bg-red-400/5",
                      s.submitted && "cursor-default",
                    )}
                  >
                    <RadioGroupItem value={String(oIndex)} id={id} />
                    <span className="flex-1">{opt.text}</span>
                    {s.submitted && isThisCorrect ? (
                      <Check className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                    ) : null}
                    {s.submitted && isThisSelected && !isThisCorrect ? (
                      <X className="h-4 w-4 shrink-0 text-red-400" aria-hidden />
                    ) : null}
                  </label>
                );
              })}
            </RadioGroup>

            {!s.submitted ? (
              <button
                type="button"
                onClick={() => submit(qIndex)}
                disabled={s.selected === null}
                className="mt-6 text-[11px] font-medium uppercase tracking-[0.28em] text-gold underline underline-offset-4 decoration-gold/40 transition-opacity hover:decoration-gold disabled:opacity-30"
              >
                Check answer
              </button>
            ) : (
              <p
                role="status"
                className={cn(
                  "mt-6 text-[14px] font-light leading-relaxed",
                  isCorrect ? "text-gold" : "text-platinum/70",
                )}
              >
                {isCorrect ? "Correct. " : "Not quite. "}
                {q.explanation}
              </p>
            )}
          </div>
        );
      })}

      {allSubmitted ? (
        <>
          <Hairline />
          <p className="text-[13px] font-light tracking-wide text-platinum/70">
            You answered {correctCount} of {questions.length} correctly. This
            knowledge check is for your own study; it is not scored toward the
            Academy&apos;s Certificate of Completion.
          </p>
        </>
      ) : null}
    </div>
  );
}
