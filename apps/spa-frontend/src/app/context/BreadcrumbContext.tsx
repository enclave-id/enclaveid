import React, { createContext, useContext, useState, ReactNode } from "react";

interface BreadcrumbContextType {
  link: string;
  setLink: (link: string) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(
  undefined
);

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (context === undefined) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
};

export const BreadcrumbProvider: React.FC<{ children: ReactNode, initialLink?: string }> = ({
  children,
  initialLink = ""
}) => {
  const [link, setLink] = useState(initialLink);

  return (
    <BreadcrumbContext.Provider value={{ link, setLink }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
