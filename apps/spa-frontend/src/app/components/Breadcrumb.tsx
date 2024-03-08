import classNames from "classnames";

import { useNavigate } from "react-router-dom";
import { useBreadcrumb } from "../context/BreadcrumbContext";

function Breadcrumb() {
  const navigate = useNavigate();
  const { link, setLink } = useBreadcrumb();

  const handleDashboardClick = () => {
    navigate("/dashboard");
    setLink("");
  };

  return (
    <div className="flex gap-1.5 items-center text-[23px] leading-[27px] font-medium">
      <button
        onClick={handleDashboardClick}
        className={classNames(
          link
            ? "text-active-breadcrumb-title underline"
            : "text-passiveLinkColor"
        )}
      >
        Traits Dashboard{" "}
      </button>{" "}
      {link && (
        <>
          <span className="text-passiveLinkColor">{">"}</span>{" "}
          <span className="text-passiveLinkColor">{link}</span>{" "}
        </>
      )}
    </div>
  );
}

export { Breadcrumb };
