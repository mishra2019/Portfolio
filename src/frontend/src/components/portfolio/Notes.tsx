import { Plus, StickyNote, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface Note {
  id: number;
  text: string;
  createdAt: string;
}

export function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState("");

  const addNote = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    setNotes((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: trimmed,
        createdAt: new Date().toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setDraft("");
  };

  const deleteNote = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <section id="notes" className="py-16 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="section-heading">
            <StickyNote className="inline-block w-7 h-7 mr-2 mb-1" style={{ color: "var(--pf-accent)" }} />
            Personal <span>Notes</span>
          </h2>
          <p className="text-sm" style={{ color: "var(--pf-text-muted)" }}>
            Jot down reminders, ideas, or anything you want to remember. Notes are stored in this session only.
          </p>
        </motion.div>

        {/* Input row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex gap-3 mb-8"
        >
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) addNote();
            }}
            rows={2}
            placeholder="Write a note… (Ctrl+Enter to add)"
            className="notes-input flex-1"
          />
          <button
            type="button"
            onClick={addNote}
            disabled={!draft.trim()}
            className="notes-add-btn"
          >
            <Plus className="w-5 h-5" />
            <span className="text-xs font-semibold">Add</span>
          </button>
        </motion.div>

        {/* Notes grid */}
        {notes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-3 py-14"
          >
            <StickyNote className="w-10 h-10 opacity-25" style={{ color: "var(--pf-accent)" }} />
            <p className="text-sm" style={{ color: "var(--pf-text-muted)" }}>
              No notes yet — add your first one above
            </p>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="note-card group"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <StickyNote className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--pf-accent)" }} />
                    <button
                      type="button"
                      onClick={() => deleteNote(note.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-lg hover:bg-red-500/10"
                      style={{ color: "oklch(0.65 0.22 27)" }}
                      aria-label="Delete note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--pf-text-secondary)" }}>
                    {note.text}
                  </p>
                  <p className="text-[11px] mt-3" style={{ color: "var(--pf-text-muted)" }}>
                    {note.createdAt}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
