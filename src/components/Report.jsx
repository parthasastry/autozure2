const Report = ({ type, reports }) => {
  return (
    <>
      <div>
        {reports && reports.length > 0
          ? reports.map((cf, index) => {
              return (
                <div key={index}>
                  <button className="bg-[#7734eb] hover:bg-[#7734ez] text-white font-bold my-2 py-2 px-4 rounded text-center">
                    <a
                      href={cf.signedUrl}
                      target="_blank"
                      title="Read PDF"
                      rel="noreferrer"
                    >
                      {type} Report
                    </a>
                  </button>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

export default Report;
