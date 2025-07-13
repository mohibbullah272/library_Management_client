import { Ellipsis } from "lucide-react";


const LoadingPage = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center   animate-ping">
            
            <Ellipsis/>
        </div>
    );
};

export default LoadingPage;