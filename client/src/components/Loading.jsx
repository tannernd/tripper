const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen">
        <div className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
            <span className="sr-only">Loading...</span>
        </div>
        </div>
    )
};

export default Loading;