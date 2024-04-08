function UnavailableChart() {
  return (
    <div className="absolute inset-0">
      <div className="h-2 bg-black/80 absolute top-1/2 -translate-y-1/2 w-full" />
      <div className="h-full bg-black/80 absolute left-1/2 -translate-x-1/2 w-2" />
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#F3F5F7] z-10 text-3xl w-[80%] mx-auto py-10 text-center">
        Unavailable
      </div>
    </div>
  );
}

export { UnavailableChart };
