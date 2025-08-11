import { Github, Linkedin, Mail } from "lucide-react";

export function MainFooter() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="mx-auto max-w-5xl px-5 pb-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p className="text-center md:text-left">
          © {year} Miguel Trinidad. All rights reserved.
        </p>

        <div className="flex items-center gap-4">
          <a
            href="mailto:mft.trinidad@gmail.com"
            className="hover:text-primary transition-colors"
            aria-label="Email Miguel"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
