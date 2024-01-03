import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useToast } from "@/components/ui/use-toast";

export default function Upload() {
    const [filename, setFilename] = useState("Choose File");
    const [file, setFile] = useState<File | null>(null);
    const [starRating, setStarRating] = useState(0);
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            "video/mp4": [".mp4", ".mov"],
        },
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
            setFilename(acceptedFiles[0].name);
        },
    });

    function newSubmission(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        console.log(file?.name);
        console.log(starRating);
        formData.append("email", e.currentTarget.email.value);
        formData.append("review", e.currentTarget.review.value);
        formData.append("rating", starRating.toString());
        formData.append("video", file!);

        // fake 1 second delay to simulate upload, console.log something after
        setTimeout(() => {
            toast({
                title: "Submission Successful",
                description: "Your submission will be reviewed, thank you!",
                variant: "default",
            });
            setIsLoading(false);
        }, 1000);

        // axiosFile
        //     .post("/upload/submission", formData)
        //     .then((response) => {
        //         console.log(response);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    }

    return (
        <div className="h-screen  bg-purple flex justify-center items-center">
            <Link to="/" className="text-white  absolute top-4 left-4">
                Back
            </Link>
            <main className="mx-auto max-w-xl p-4 md:p-6 md:w-full ">
                <Card className="space-y-6">
                    <CardHeader className="pt-4 pb-0">
                        <h1 className="text-2xl font-semibold ">
                            Submit your review
                        </h1>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={newSubmission}>
                            <div className="grid space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email" // Add this
                                        placeholder="example@email.com"
                                        required
                                        type="email"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="video">Video</Label>
                                    <div
                                        {...getRootProps()}
                                        className={`border-dashed border-2 border-gray-300 rounded-md p-4 text-center text-gray-500 dark:border-gray-600 ${
                                            isDragActive ? "bg-purple-200" : ""
                                        }`}
                                    >
                                        <UploadIcon className="w-8 h-8 mx-auto mb-2" />
                                        <p>Drag & Drop your video here</p>
                                        <p className="text-xs mt-2">or</p>
                                        <label
                                            htmlFor="file-upload"
                                            className="mt-2 cursor-pointer inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            <div className="w-fit overflow-hidden overflow-ellipsis whitespace-nowrap">
                                                {filename}
                                            </div>
                                        </label>
                                        <input {...getInputProps()} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="review">Review</Label>
                                    <Textarea
                                        id="review"
                                        name="review" // Add this
                                        placeholder="Write your review here"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="rating">Rating</Label>
                                    <div className="flex items-center gap-2">
                                        {[...Array(5)].map((_, i) => (
                                            <label key={i}>
                                                <input
                                                    type="radio"
                                                    id={`rating-${i + 1}`}
                                                    name="rating"
                                                    value={i + 1}
                                                    className="hidden"
                                                    onChange={(e) =>
                                                        setStarRating(
                                                            parseInt(
                                                                e.target.value
                                                            )
                                                        )
                                                    }
                                                />
                                                <StarIcon
                                                    className={`w-5 h-5 ${
                                                        starRating > i
                                                            ? "text-black"
                                                            : "text-gray-300"
                                                    }`}
                                                    {...(starRating > i && {
                                                        fill: "currentColor",
                                                    })}
                                                />
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <img
                                            src="/90-ring.svg"
                                            alt="loading"
                                            className=" h-5 w-5 mr-3"
                                        />
                                    ) : (
                                        "Submit"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </main>
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

function UploadIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    );
}
