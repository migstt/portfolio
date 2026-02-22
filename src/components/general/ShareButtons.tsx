"use client";

import { Facebook, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { toast } from "sonner";

// X (Twitter) icon - Lucide doesn't have the new X logo
const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      Icon: Facebook,
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      Icon: XIcon,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      Icon: Linkedin,
    },
  ];

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h4 className="text-base font-semibold text-foreground mb-2">Share</h4>
      <div className="flex items-center gap-2">
        {shareLinks.map(({ name, href, Icon }) => (
          <Tooltip key={name}>
            <TooltipTrigger asChild>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Share on ${name}`}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 cursor-pointer"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share on {name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 cursor-pointer"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Link2 className="h-4 w-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{copied ? "Copied!" : "Copy link"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
