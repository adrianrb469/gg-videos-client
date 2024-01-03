import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface Submission {
    submission_id: string;
    email: string;
    review: string;
    rating: number;
    video_url: string;
}

export default function Submission({
    email,
    submission_id,
    review,
    rating,
    video_url,
}: Submission) {
    return (
        <div className=" mx-auto bg-white rounded-xl shadow-sm overflow-hidden m-3 p-5 w-full border">
            <div className="flex">
                <div className="flex-grow flex  justify-between flex-col">
                    <div>
                        <h1 className="text-lg font-bold">
                            Submission {submission_id}
                        </h1>

                        <p>{email}</p>
                        <p>{review}</p>
                    </div>

                    {rating > 0 && (
                        <div className="flex items-center gap-1 ">
                            {[...Array(rating)].map((_, i) => (
                                <StarIcon
                                    key={i}
                                    className="w-4 h-4 purple"
                                    fill="currentColor"
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className=" flex flex-col justify-around gap-2 ">
                    <Dialog>
                        <DialogTrigger>
                            {" "}
                            <Button variant="link">Review Video</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Video Submission</DialogTitle>
                                <video
                                    src={video_url}
                                    className="rounded"
                                    controls
                                />
                                <DialogDescription>{review}</DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Button variant="outline">Reject</Button>
                    <Button variant="outline">Approve</Button>
                </div>
            </div>
        </div>
    );
}

function StarIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={props.fill || "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}
