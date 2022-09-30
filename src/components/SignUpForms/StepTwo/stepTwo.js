function StepTwo({ genreId, handler }) {

  return (
    <>
      <h2 className="band-creation-style text-sm font-medium font-bold text-emerald-400 dark:text-emerald-400 text-left">Style musical</h2>
      <div className="grid grid-cols-2 place-content-between">
        {genreId ? genreId.map((genre) => (
          <div key={genre.id} className="flex items-center mb-4">
            <input id={genre.id} type="checkbox" value={genre.id} onChange={(event) => handler(event.target.value)}
              className="w-4 h-4 text-emerald-300 bg-emerald-100 rounded border-emerald-300 focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-emerald-800 focus:ring-2 dark:bg-emerald-700 dark:border-emerald-600"></input>
            <label htmlFor="checkbox" className="ml-2 text-sm font-medium text-emerald-200 dark:text-emerald-300">{genre.name}</label>
            <input id={genre.name} type="hidden" value="0"></input>
            <label htmlFor="checkbox"></label>
          </div>
        ))
          : null
        }
      </div>
    </>
  );
};

export default StepTwo;