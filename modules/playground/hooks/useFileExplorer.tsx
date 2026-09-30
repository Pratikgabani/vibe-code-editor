import { create } from 'zustand';
import { TemplateFile, TemplateFolder } from '@/modules/playground/lib/path-to-json';
import { toast } from '@/components/ui/toast';

interface OpenFile extends TemplateFile {
    id: string;
    hasUnsavedChanges: boolean;
    content: string;
    originalContent: string;
}

interface FileExplorerState {
    playgroundId: string;
    templateData: TemplateFolder | null;
    openFiles: OpenFile[];
    activeFileId: string | null;
    editorContent: string;
    setPlaygroundId: (id: string) => void;
    setTemplateData: (data: TemplateFolder | null) => void;
    setOpenFiles: (files: OpenFile[]) => void;
    setActiveFileId: (fileId: string | null) => void;
    setEditorContent: (content: string) => void;

    openFile: (file: TemplateFile) => void;
    closeFile: (fileId: string) => void;
    closeAllFiles: () => void;
}

// @ts-ignore
export const useFileExplorer = create<FileExplorerState>((set, get) => ({
    templateData: null,
    playgroundId: '',
    openFiles: [] satisfies OpenFile[],
    activeFileId: null,
    editorContent: '', 

    setPlaygroundId: (id) => set({ playgroundId: id }),
    setTemplateData: (data) => set({ templateData: data }),
    setEditorContent: (content) => set({ editorContent: content }),
    setOpenFiles: (files) => set({ openFiles: files }),
    setActiveFileId: (fileId) => set({ activeFileId: fileId }),

}))