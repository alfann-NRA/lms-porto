'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, Strikethrough, List, ListOrdered } from 'lucide-react';

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const toggleClass = (isActive: boolean) => 
    `p-2 rounded-lg transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`;

  return (
    <div className="flex flex-wrap gap-2 mb-4 p-2 bg-card border-2 border-border rounded-xl shadow-sm">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={toggleClass(editor.isActive('bold'))}
      >
        <Bold className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={toggleClass(editor.isActive('italic'))}
      >
        <Italic className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={toggleClass(editor.isActive('strike'))}
      >
        <Strikethrough className="w-5 h-5" />
      </button>
      <div className="w-px h-8 bg-border mx-2 self-center"></div>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={toggleClass(editor.isActive('bulletList'))}
      >
        <List className="w-5 h-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={toggleClass(editor.isActive('orderedList'))}
      >
        <ListOrdered className="w-5 h-5" />
      </button>
    </div>
  );
};

export default function RichTextEditor({ content, onChange }: { content: string, onChange: (content: string) => void }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none min-h-[200px] p-4 bg-background rounded-xl border-2 border-border shadow-inner font-sans',
      },
    },
  });

  return (
    <div className="w-full">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
