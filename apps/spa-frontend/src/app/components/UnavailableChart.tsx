function UnavailableChart() {
  return (
    <div className="absolute inset-0">
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-gray-50 shadow-xl rounded-xl z-10 text-xl w-2/3 mx-auto py-3 text-center">
        Complete the questionnaires to see this chart
      </div>
    </div>
  );
}

export { UnavailableChart };
