export function Footer() {
  return (
    <div className="border-t bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">ArkLab AI Agents</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Empowering businesses with intelligent automation solutions
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>© 2025 ArkLab. All rights reserved.</span>
            <span>•</span>
            <span>Built with Next.js & TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  );
}
