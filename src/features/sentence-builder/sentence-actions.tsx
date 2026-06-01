"use client";

import { Volume2, Trash2, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SENTENCE_ACTIONS } from "@/utils/constants";

interface SentenceActionsProps {
  onSpeak: () => void;
  onClear: () => void;
  onSave: () => void;
  isSpeaking?: boolean;
  hasItems: boolean;
  isSaving?: boolean;
}

export function SentenceActions({
  onSpeak,
  onClear,
  onSave,
  isSpeaking = false,
  hasItems,
  isSaving = false,
}: SentenceActionsProps) {
  return (
    <div className="flex flex-wrap gap-3" role="group" aria-label="إجراءات الجملة">
      <Button
        variant="default"
        size="lg"
        onClick={onSpeak}
        disabled={!hasItems || isSpeaking}
        className="flex-1 min-w-[140px]"
        aria-label={SENTENCE_ACTIONS.speak}
      >
        {isSpeaking ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <Volume2 className="h-6 w-6" />
        )}
        {SENTENCE_ACTIONS.speak}
      </Button>
      <Button
        variant="accent"
        size="lg"
        onClick={onSave}
        disabled={!hasItems || isSaving}
        className="flex-1 min-w-[120px]"
        aria-label={SENTENCE_ACTIONS.save}
      >
        <Save className="h-6 w-6" />
        {SENTENCE_ACTIONS.save}
      </Button>
      <Button
        variant="outline"
        size="lg"
        onClick={onClear}
        disabled={!hasItems}
        className="flex-1 min-w-[120px]"
        aria-label={SENTENCE_ACTIONS.clear}
      >
        <Trash2 className="h-6 w-6" />
        {SENTENCE_ACTIONS.clear}
      </Button>
    </div>
  );
}
