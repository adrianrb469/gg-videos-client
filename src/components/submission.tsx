import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { axiosPrivate } from "@/api/axios";
import { useEffect, useState } from "react";

interface Submission {
    submission_id: string;
    email: string;
    review: string;
    rating: number;
    video_url: string;
    accepted: boolean;
    status: number;
}

export default function Submission({
    email,
    submission_id,
    review,
    rating,
    video_url,
    accepted,
    status,
}: Submission) {
    const [currentStatus, setCurrentStatus] = useState(status);

    function approveSubmission() {
        axiosPrivate
            .post(`/submissions/approve/${submission_id}`)
            .then((response) => {
                console.log(response);
                setCurrentStatus(1);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function rejectSubmission() {
        axiosPrivate
            .post(`/submissions/reject/${submission_id}`)
            .then((response) => {
                console.log(response);
                setCurrentStatus(2);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        setCurrentStatus(status);
    }, [status]);

    return (
        <div className=" mx-auto bg-white rounded-xl shadow-sm overflow-hidden m-3 p-5 w-full border">
            <div className="flex">
                <div className="flex-grow flex  justify-between flex-col">
                    <div>
                        <h1 className="text-lg font-bold">
                            Submission {submission_id}{" "}
                        </h1>
                        <span
                            className={`inline-block text-xs px-2 py-1 rounded-sm ${
                                currentStatus === 1
                                    ? "bg-green-500 text-white"
                                    : currentStatus === 2
                                    ? "bg-red-500 text-white"
                                    : "border-black-400 border text-black"
                            }`}
                        >
                            {currentStatus === 1
                                ? "Approved"
                                : currentStatus === 2
                                ? "Rejected"
                                : "Pending"}
                        </span>
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
                    <Button variant="outline" onClick={rejectSubmission}>
                        Reject
                    </Button>
                    <Button variant="outline" onClick={approveSubmission}>
                        Approve
                    </Button>
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
