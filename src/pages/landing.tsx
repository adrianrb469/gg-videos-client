import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Landing() {
    return (
        <main className="h-screen  bg-purple flex justify-center items-center">
            <div className="flex flex-col md:flex-row border bg-white border-gray-300  h-3/6 items-center  rounded-md ">
                <aside className="p-3 h-full  bg-zinc-100 w-full md:w-96">
                    <h1 className="text-3xl font-bold text-gray-500  w-96">
                        Image
                    </h1>
                </aside>
                <div className="p-3 h-full flex justify-center items-center flex-col gap-3 ">
                    <p className=" text-2xl text-gray-800 text-center p-2 ">
                        <b>Upload your video</b> and <b>earn rewards</b> for
                        your <br />
                        commissions.
                    </p>
                    <div className="flex gap-3">
                        <Button asChild>
                            <Link to="/signup">Get Started</Link>
                        </Button>
                        <Button asChild variant={"outline"}>
                            <Link to="/rewards">What rewards?</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Landing;
