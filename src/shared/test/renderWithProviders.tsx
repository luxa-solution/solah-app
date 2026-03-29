import { render, type RenderOptions } from "@testing-library/react-native";
import type { PropsWithChildren, ReactElement } from "react";

import { Providers } from "@/shared/components/Providers";

function TestProviders({ children }: PropsWithChildren) {
  return <Providers>{children}</Providers>;
}

export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { wrapper: TestProviders, ...options });
}
