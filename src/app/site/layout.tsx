import React from "react";
import Navigation from "@/components/site/navigation";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navigation />
      {children}
    </main>
  );
};

export default layout;
