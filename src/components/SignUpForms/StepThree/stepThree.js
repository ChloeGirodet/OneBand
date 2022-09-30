function StepThree({ instrumentId, handler }) {

  return (
    <>
      <h2 className="band-creation-style text-sm font-medium font-bold text-emerald-400 dark:text-emerald-300 text-left">Instruments</h2>
      <div className="grid grid-cols-2 place-content-between">
        {instrumentId ? instrumentId.map((instrument) => (
          <div key={instrument.id} className="flex items-center mb-4">
            <input id={instrument.id} type="checkbox" value={instrument.id} onChange={(event) => handler(event.target.value)}
              className="w-4 h-4 text-emerald-300 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
            <label htmlFor="default-checkbox" className="ml-2 text-emeraldo3t-medium text-emerald-200 dark:text-emerald-300">{instrument.name}</label>
            <input id={instrument.name} type="hidden" value="0"></input>
            <label htmlFor="default-checkbox"></label>
          </div>
        ))
          : null
        }
      </div>
    </>
  );
};

export default StepThree;