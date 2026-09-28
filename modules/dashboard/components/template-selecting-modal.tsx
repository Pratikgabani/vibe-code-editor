
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  ChevronRight,
  Search,
  Star,
  Code,
  Server,
  Globe,
  Zap,
  Clock,
  Check,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type TemplateId = "react" | "nextjs" | "express" | "vue" | "hono" | "angular";
type TemplateKind = "REACT" | "NEXTJS" | "EXPRESS" | "VUE" | "HONO" | "ANGULAR";
type TemplateCategory = "all" | "frontend" | "backend" | "fullstack";

type TemplateSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    template: TemplateKind;
    description?: string;
  }) => void;
};

interface TemplateOption {
  id: TemplateId;
  name: string;
  description: string;
  icon: string;
  color: string;
  popularity: number;
  tags: string[];
  features: string[];
  category: "frontend" | "backend" | "fullstack";
}

const templates: TemplateOption[] = [
  {
    id: "react",
    name: "React",
    description:
      "A JavaScript library for building user interfaces with component-based architecture",
    icon: "/react.svg",
    color: "#61DAFB",
    popularity: 5,
    tags: ["UI", "Frontend", "JavaScript"],
    features: ["Component-Based", "Virtual DOM", "JSX Support"],
    category: "frontend",
  },
  {
    id: "nextjs",
    name: "Next.js",
    description:
      "The React framework for production with server-side rendering and static site generation",
    icon: "/nextjs-icon.svg",
    color: "#000000",
    popularity: 4,
    tags: ["React", "SSR", "Fullstack"],
    features: ["Server Components", "API Routes", "File-based Routing"],
    category: "fullstack",
  },
  {
    id: "express",
    name: "Express",
    description:
      "Fast, unopinionated, minimalist web framework for Node.js to build APIs and web applications",
    icon: "/expressjs-icon.svg",
    color: "#000000",
    popularity: 4,
    tags: ["Node.js", "API", "Backend"],
    features: ["Middleware", "Routing", "HTTP Utilities"],
    category: "backend",
  },
  {
    id: "vue",
    name: "Vue.js",
    description:
      "Progressive JavaScript framework for building user interfaces with an approachable learning curve",
    icon: "/vuejs-icon.svg",
    color: "#4FC08D",
    popularity: 4,
    tags: ["UI", "Frontend", "JavaScript"],
    features: ["Reactive Data Binding", "Component System", "Virtual DOM"],
    category: "frontend",
  },
  {
    id: "hono",
    name: "Hono",
    description:
      "Fast, lightweight, built on Web Standards. Support for any JavaScript runtime.",
    icon: "/hono.svg",
    color: "#e36002",
    popularity: 3,
    tags: ["Node.js", "TypeScript", "Backend"],
    features: [
      "Dependency Injection",
      "TypeScript Support",
      "Modular Architecture",
    ],
    category: "backend",
  },
  {
    id: "angular",
    name: "Angular",
    description:
      "Angular is a web framework that empowers developers to build fast, reliable applications.",
    icon: "/angular-2.svg",
    color: "#DD0031",
    popularity: 3,
    tags: ["React", "Fullstack", "JavaScript"],
    features: [
      "Reactive Data Binding",
      "Component System",
      "Virtual DOM",
      "Dependency Injection",
      "TypeScript Support",
    ],
    category: "fullstack",
  },
];

const templateKindById: Record<TemplateId, TemplateKind> = {
  react: "REACT",
  nextjs: "NEXTJS",
  express: "EXPRESS",
  vue: "VUE",
  hono: "HONO",
  angular: "ANGULAR",
};

const templateCategories: TemplateCategory[] = [
  "all",
  "frontend",
  "backend",
  "fullstack",
];

const TemplateSelectionModal = ({
  isOpen,
  onClose,
  onSubmit,
}: TemplateSelectionModalProps) => {
  const [step, setStep] = useState<"select" | "configure">("select");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<TemplateCategory>("all");
  const [projectName, setProjectName] = useState("");

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(normalizedSearchQuery) ||
      template.description.toLowerCase().includes(normalizedSearchQuery) ||
      template.tags.some((tag) => tag.toLowerCase().includes(normalizedSearchQuery));
    const matchesCategory = category === "all" || template.category === category;

    return matchesSearch && matchesCategory;
  });

  const handleSelectTemplate = (templateId: TemplateId) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      setStep("configure");
    }
  };

  const handleCreateProject = () => {
    const trimmedProjectName = projectName.trim();
    if (selectedTemplate && trimmedProjectName) {
      const template = templates.find((item) => item.id === selectedTemplate);

      if (!template) return;

      onSubmit({
        title: trimmedProjectName,
        template: templateKindById[template.id],
        description: template.description,
      });
      onClose();
      setStep("select");
      setSelectedTemplate(null);
      setProjectName("");
    }
  };

  const handleBack = () => {
    setStep("select");
  };

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={14}
          className={
            index < count ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
        />
      ));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
          // Reset state when closing
          setStep("select");
          setSelectedTemplate(null);
          setProjectName("");
        }
      }}
    >
      <DialogContent className="max-h-[85vh] overflow-y-auto p-5 sm:max-w-180 sm:p-6">
        {step === "select" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#17B8A6] flex items-center gap-2">
                <Plus size={24} className="text-[#17B8A6]" />
                Select a Template
              </DialogTitle>
              <DialogDescription>
                Choose a template to create your new playground
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-5 py-3">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 outline-none"
                    size={18}
                  />
                  <Input
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Tabs
                  defaultValue="all"
                  className="w-full sm:w-auto"
                  onValueChange={(value) => {
                    if (templateCategories.includes(value as TemplateCategory)) {
                      setCategory(value as TemplateCategory);
                    }
                  }}
                >
                  <TabsList className="grid w-full grid-cols-4 sm:w-100">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="frontend">Frontend</TabsTrigger>
                    <TabsTrigger value="backend">Backend</TabsTrigger>
                    <TabsTrigger value="fullstack">Fullstack</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <RadioGroup
                value={selectedTemplate || ""}
                onValueChange={handleSelectTemplate}
              >
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {filteredTemplates.length > 0 ? (
                    filteredTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`relative min-h-52 cursor-pointer rounded-lg border p-4 transition-colors hover:scale-[1.02] hover:border-[#17B8A6] hover:bg-muted/40 ${
                          selectedTemplate === template.id
                            ? "border-[#17B8A6] bg-[#17B8A6]/5 ring-1 ring-[#17B8A6]"
                            : "border-border"
                        }`}
                        onClick={() => handleSelectTemplate(template.id)}
                      >
                        <div className="absolute right-4 top-4 flex gap-0.5">
                          {renderStars(template.popularity)}
                        </div>

                        {selectedTemplate === template.id && (
                          <div className="absolute left-3 top-3 rounded-full bg-[#17B8A6] p-1 text-white">
                            <Check size={14} />
                          </div>
                        )}

                        <div className="flex h-full gap-3 pt-5">
                          <div
                            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                            style={{ backgroundColor: `${template.color}15` }}
                          >
                            <Image
                              src={template.icon || "/placeholder.svg"}
                              alt={`${template.name} icon`}
                              width={32}
                              height={32}
                              className="object-contain"
                            />
                          </div>

                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="mb-1 flex items-center gap-2">
                              <h3 className="truncate text-base font-semibold">
                                {template.name}
                              </h3>
                              <div className="flex gap-1">
                                {template.category === "frontend" && (
                                  <Code size={14} className="text-blue-500" />
                                )}
                                {template.category === "backend" && (
                                  <Server
                                    size={14}
                                    className="text-green-500"
                                  />
                                )}
                                {template.category === "fullstack" && (
                                  <Globe
                                    size={14}
                                    className="text-purple-500"
                                  />
                                )}
                              </div>
                            </div>

                            <p className="mb-3 line-clamp-3 text-sm text-muted-foreground">
                              {template.description}
                            </p>

                            <div className="mt-auto flex flex-wrap gap-1.5">
                              {template.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <RadioGroupItem
                          value={template.id}
                          id={template.id}
                          className="sr-only"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 flex flex-col items-center justify-center p-8 text-center">
                      <Search size={48} className="text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium">
                        No templates found
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  )}
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock size={14} className="mr-1" />
                <span>
                  Estimated setup time:{" "}
                  {selectedTemplate ? "2-5 minutes" : "Select a template"}
                </span>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  className="bg-[#17B8A6] hover:bg-[#129987] text-white"
                  disabled={!selectedTemplate}
                  onClick={handleContinue}
                >
                  Continue <ChevronRight size={16} className="ml-1" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-[#17B8A6]">
                Configure Your Project
              </DialogTitle>
              <DialogDescription>
                {templates.find((t) => t.id === selectedTemplate)?.name} project
                configuration
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-5 py-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  placeholder="my-awesome-project"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              <div className="rounded-lg border border-[#17B8A6]/40 p-4 shadow-sm">
                <h3 className="mb-2 font-medium">Selected Template Features</h3>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {templates
                    .find((t) => t.id === selectedTemplate)
                    ?.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <Zap size={14} className="text-[#17B8A6]" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-3 border-t pt-4">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
              <Button
                className="bg-[#17B8A6] hover:bg-[#129987] text-white"
                onClick={handleCreateProject}
                disabled={!projectName.trim()}
              >
                Create Project
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSelectionModal;
