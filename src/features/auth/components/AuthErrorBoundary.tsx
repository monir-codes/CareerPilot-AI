"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class AuthErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Auth Error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-4 border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900 rounded-md text-red-600 dark:text-red-400">
          <AlertTriangle className="w-12 h-12 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Authentication Error</h2>
          <p className="text-center max-w-md">
            {this.state.error?.message || "There was a problem verifying your session. Please try logging in again."}
          </p>
          <button 
            onClick={() => window.location.href = '/sign-in'}
            className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Go to Login
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
