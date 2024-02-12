'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

import './style.css'
import { Button } from '../ui/button';
import { CodeIcon, FontBoldIcon, FontItalicIcon, StrikethroughIcon } from '@radix-ui/react-icons';
import { ArrowUUpLeft, ArrowUUpRight, TextHOne, TextHTwo } from '@phosphor-icons/react'
import { Input } from '../ui/input';

const Tiptap = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Color,
            TaskList.configure({
                HTMLAttributes: {
                    class: "not-prose pl-2",
                },
            }),
            TaskItem.configure({
                HTMLAttributes: {
                    class: "flex items-start my-4",
                },
                nested: true,
            }),
            TextStyle.configure({
                HTMLAttributes: {
                    class: "not-prose pl-2",
                },
            })
        ],
        content: `
    <h2>
      Hi there,
    </h2>
    <ul data-type="taskList">
      <li data-type="taskItem" data-checked="true">A list item</li>
      <li data-type="taskItem" data-checked="false">And another one</li>
    </ul>
    <p>
      this is a basic <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
    <p>
      I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    </p>
    <blockquote>
      Wow, that’s amazing. Good work, boy! 👏
      <br />
      — Mom
    </blockquote>
  `,
        editorProps: {
            attributes: {
                class: 'containerTip prose dark:prose-invert min-h-[65dvh] max-h-[65dvh] overflow-y-auto prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
            },
        },
    })

    if (!editor) return null

    return (
        <div className='space-x-4'>
            <div className='flex w-full space-x-2 p-1'>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    className={editor.isActive('bold') ? 'is-active' : ''}
                >
                    <FontBoldIcon />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    className={editor.isActive('italic') ? 'is-active' : ''}
                >
                    <FontItalicIcon />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }
                    className={editor.isActive('strike') ? 'is-active' : ''}
                >
                    <StrikethroughIcon />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                    <TextHOne size={16} />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    <TextHTwo size={16} />
                </Button>
                {/* <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .toggleCode()
                            .run()
                    }
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                    <CodeIcon />
                </Button> */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    <CodeIcon />
                </Button>
                {/* <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'is-active' : ''}
                >
                    blockquote
                </button> */}
                <Input
                    className='w-10 h-10 flex p-1'
                    type="color"
                    onInput={(event: any) => editor.chain().focus().setColor(event.target.value).run()}
                    value={editor.getAttributes('textStyle').color}
                />
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().unsetColor().run()}>UC</Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                >
                    <ArrowUUpLeft size={16} />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={
                        !editor.can()
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                >
                    <ArrowUUpRight size={16} />
                </Button>
            </div>
            <EditorContent editor={editor} />
            <Button>Save</Button>
        </div>
    )
}

export default Tiptap