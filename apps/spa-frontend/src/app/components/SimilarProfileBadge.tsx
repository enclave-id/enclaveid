interface SimilarProfileBadgeProps {
  peopleCount: number;
  url?: string;
}

function SimilarProfileBadge({
  peopleCount = 1123,
  url,
}: SimilarProfileBadgeProps) {
  return (
    <div className="bg-white pt-[15px] pb-[13px] pl-[9px] pr-[17px] border border-[#E5E8EE] rounded-xl w-full">
      <div className="flex items-center gap-2.5">
        <div className="flex -space-x-2 overflow-hidden shrink-0">
          <img
            className="inline-block h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <img
            className="inline-block h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
          <img
            className="inline-block h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
            alt=""
          />
          <img
            className="inline-block h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <span className="text-[#6C7A8A] text-xs">
          {`${peopleCount.toLocaleString()} people have a similar profile`}
        </span>
      </div>
    </div>
  );
}

export { SimilarProfileBadge };
