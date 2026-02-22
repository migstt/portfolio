import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg font-mono text-sm">
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-muted px-4 py-2 border-b border-border flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground ml-2">terminal</span>
          </div>
          <div className="p-6 space-y-3">
            <p className="text-muted-foreground">
              <span className="text-primary">guest@miguel</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-muted-foreground">$ </span>
              <span className="text-foreground">cd /this-page</span>
            </p>
            <p className="text-red-400">
              bash: cd: /this-page: No such file or directory
            </p>
            <p className="text-muted-foreground">
              <span className="text-primary">guest@miguel</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-muted-foreground">$ </span>
              <span className="text-foreground">echo $?</span>
            </p>
            <p className="text-foreground">404</p>
            <p className="text-muted-foreground">
              <span className="text-primary">guest@miguel</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-blue-400">~</span>
              <span className="text-muted-foreground">$ </span>
              <Link href="/" className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
                cd /home
              </Link>
              <span className="inline-block w-2 h-4 bg-foreground ml-1 animate-pulse" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
