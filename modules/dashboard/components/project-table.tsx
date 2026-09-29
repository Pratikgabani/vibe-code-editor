
"use client"

import Image from "next/image"
import { format } from "date-fns"
import type { Project } from "../types"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useState } from "react"
import { MoreHorizontal, Edit3, Trash2, ExternalLink, Copy, Download, Eye, Star, StarOff } from "lucide-react"
import { toast } from "@/components/ui/toast"
import { toggleStarMarked } from "@/modules/dashboard/actions"


interface ProjectTableProps {
  projects: Project[]
  onUpdateProject?: (id: string, data: { title: string; description: string }) => Promise<unknown> | void
  onDeleteProject?: (id: string) => Promise<unknown> | void
  onDuplicateProject?: (id: string) => Promise<unknown> | void
  onMarkasFavorite?: (id: string) => Promise<unknown> | void
}

interface EditProjectData {
  title: string
  description: string
}

export default function ProjectTable({
  projects,
  onUpdateProject,
  onDeleteProject,
  onDuplicateProject,
  onMarkasFavorite,
}: ProjectTableProps) {
  const [projectList, setProjectList] = useState(projects)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [editData, setEditData] = useState<EditProjectData>({ title: "", description: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [favoriteLoadingIds, setFavoriteLoadingIds] = useState<Set<string>>(new Set())

  const handleEditClick = (project: Project) => {
    setSelectedProject(project)
    setEditData({ title: project.title, description: project.description || "" })
    setEditDialogOpen(true)
  }

  const handleDeleteClick = async (project: Project) => {
    setSelectedProject(project)
    setDeleteDialogOpen(true)
  }

  const handleUpdateProject = async () => {
    if (!selectedProject || !onUpdateProject) return
    setIsLoading(true)
    try {
      await onUpdateProject(selectedProject.id, editData)
      // Instantly patch the row in local state
      setProjectList((current) =>
        current.map((p) =>
          p.id === selectedProject.id
            ? { ...p, title: editData.title, description: editData.description }
            : p
        )
      )
      setEditDialogOpen(false)
      toast.add({
        title: "Project updated successfully",
        type: "success",
      })
    } catch (error) {
      toast.add({
        title: "Error updating project",
        type: "error",
      })
      console.error("Error updating project:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkasFavorite = async (project: Project) => {
    const nextValue = !(project.Starmark?.[0]?.isMarked ?? false)

    // Optimistic update
    setProjectList((current) =>
      current.map((item) =>
        item.id === project.id
          ? { ...item, Starmark: [{ isMarked: nextValue }] }
          : item,
      ),
    )
    setFavoriteLoadingIds((prev) => new Set(prev).add(project.id))

    try {
      const result = await toggleStarMarked(project.id, nextValue)

      if (!result.success) {
        // Revert on failure
        setProjectList((current) =>
          current.map((item) =>
            item.id === project.id
              ? { ...item, Starmark: [{ isMarked: !nextValue }] }
              : item,
          ),
        )
        throw new Error(result.error ?? "Failed to update favorite")
      }

      toast.add({
        title: nextValue ? "Added to favorites" : "Removed from favorites",
        type: "success",
      })
    } catch (error) {
      console.error("Error toggling favorite:", error)
      toast.add({
        title: "Error updating favorite",
        type: "error",
      })
    } finally {
      setFavoriteLoadingIds((prev) => {
        const next = new Set(prev)
        next.delete(project.id)
        return next
      })
    }
  }

  const handleDeleteProject = async () => {
    if (!selectedProject || !onDeleteProject) return
    // Snapshot for rollback, then optimistically remove
    const snapshot = projectList
    setProjectList((current) => current.filter((p) => p.id !== selectedProject.id))
    setDeleteDialogOpen(false)
    setSelectedProject(null)
    setIsLoading(true)
    try {
      await onDeleteProject(selectedProject.id)
      toast.add({
        title: "Project deleted successfully",
        type: "success",
      })
    } catch (error) {
      // Revert on failure
      setProjectList(snapshot)
      toast.add({
        title: "Error deleting project",
        type: "error",
      })
      console.error("Error deleting project:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDuplicateProject = async (project: Project) => {
    if (!onDuplicateProject) return
    setIsLoading(true)
    try {
      const result = await onDuplicateProject(project.id) as Project | undefined
      if (result) {
        // Append the new duplicate with the same user info
        setProjectList((current) => [
          ...current,
          { ...result, user: project.user, Starmark: [] } as Project,
        ])
      }
      toast.add({
        title: "Project duplicated successfully",
        type: "success",
      })
    } catch (error) {
      toast.add({
        title: "Error duplicating project",
        type: "error",
      })
      console.error("Error duplicating project:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyProjectUrl = (projectId: string) => {
    const url = `${window.location.origin}/playground/${projectId}`;
    navigator.clipboard.writeText(url)
    toast.add({
      title: "Project URL copied to clipboard",
      type: "success",
    })
  }

  return (
    <>
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="w-12.5">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectList.map((project) => {
              const isFavorite = project.Starmark?.[0]?.isMarked ?? false
              const isFavoriteLoading = favoriteLoadingIds.has(project.id)
              return (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <Link href={`/playground/${project.id}`} className="hover:underline">
                      <span className="font-semibold">{project.title}</span>
                    </Link>
                    <span className="text-sm text-gray-500 line-clamp-1">{project.description}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-[#17B8A615] text-[#17B8A6] border-[#17B8A6]">
                    {project.template}
                  </Badge>
                </TableCell>
                <TableCell>{format(new Date(project.createdAt), "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={project.user.image || "/placeholder.svg"}
                        // @ts-ignore
                        alt={project.user.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm">{project.user.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={<Button variant="ghost" size="icon" className="h-8 w-8" />}
                    >
                      <>
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem
                        onClick={() => handleMarkasFavorite(project)}
                        disabled={isFavoriteLoading}
                      >
                        {isFavorite ? (
                          <>
                            <StarOff className="h-4 w-4 mr-2 text-yellow-400" />
                            Remove from Favorites
                          </>
                        ) : (
                          <>
                            <Star className="h-4 w-4 mr-2" />
                            Add to Favorites
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem render={<Link href={`/playground/${project.id}`} className="flex items-center" />}>
                        <>
                          <Eye className="h-4 w-4 mr-2" />
                          Open Project
                        </>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        render={<Link href={`/playground/${project.id}`} target="_blank" className="flex items-center" />}
                      >
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open in New Tab
                        </>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEditClick(project)}>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicateProject(project)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => copyProjectUrl(project.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Copy URL
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(project)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to your project details here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={editData.title}
                onChange={(e) => setEditData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter project title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editData.description}
                onChange={(e) => setEditData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Enter project description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="button" onClick={handleUpdateProject} disabled={isLoading || !editData.title.trim()}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedProject?.title}"? This action cannot be undone. All files and
              data associated with this project will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? "Deleting..." : "Delete Project"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}


