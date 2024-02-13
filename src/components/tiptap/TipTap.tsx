"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";

import './style.css'
import { Button } from '../ui/button';
import { CodeIcon, FontBoldIcon, FontItalicIcon, StrikethroughIcon, TrashIcon } from '@radix-ui/react-icons';
import { ArrowUUpLeft, ArrowUUpRight, TextHOne, TextHTwo } from '@phosphor-icons/react'
import { Input } from '../ui/input';
import useSupabase from '@/hooks/use-supabase';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type propsTipTap = {
    idNote: string | undefined;
    tituloNote: string | undefined;
    text: string | undefined;
}

function Tiptap({ idNote, tituloNote, text }: propsTipTap) {

    const supabase = useSupabase();
    const router = useRouter();

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
        content: text,
        editorProps: {
            attributes: {
                class: 'containerTip prose dark:prose-invert min-h-[65dvh] max-h-[65dvh] overflow-y-auto prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
            },
        },
    })

    if (!editor) return null

    async function onSave() {
        const { error } = await supabase.from('notes')
            .update({
                text: editor?.getHTML(),
                titulo: tituloNote,
            })
            .match({ id: idNote })
            .throwOnError()
            .select<string>('*')
            .throwOnError()
            .single();
        console.log(error);
        if (!error) {
            toast.success('Note updated successfully!', {
                style: {
                    borderRadius: '3px',
                    background: '#333',
                    color: '#fff',
                }
            })
        } else {
            toast.error('Error updating note!', {
                style: {
                    borderRadius: '3px',
                    background: '#333',
                    color: '#fff',
                }
            })
        }
    }

    async function onDelete() {
        const { error } = await supabase
            .from('notes')
            .delete()
            .eq('id', idNote as string)
            .single();
        if (!error) {
            toast.success('Note deleted successfully!',
                {
                    style: {
                        borderRadius: '3px',
                        background: '#333',
                        color: '#fff',
                    }
                })
            router.push('/notes');
        }
    }

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
            <div className='w-[78dvw] mx-auto flex flex-row justify-between'>
                <Button onClick={onSave}>Save</Button>
                <Button variant="destructive" className='flex flex-row gap-2 items-center' onClick={onDelete}> <TrashIcon /> Delete</Button>
            </div>
        </div>
    )
}

export default Tiptap