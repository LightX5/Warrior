import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Warrior Lens Studio UI error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-canvas px-6 text-center">
          <div className="glass-panel max-w-xl rounded-[2rem] p-10">
            <p className="section-eyebrow">Stability First</p>
            <h1 className="font-display text-4xl text-white">Something interrupted the experience.</h1>
            <p className="mt-4 text-sm leading-7 text-white/65">
              Refresh the page to try again. The app structure is protected by an error
              boundary so failures stay contained instead of breaking the full site.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
