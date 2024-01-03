import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import userRefreshToken from "@/hooks/useRefreshToken";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import Submission from "@/components/submission";
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

function Home() {
    const { refreshToken } = userRefreshToken();
    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();
    const location = useLocation();

    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [page, setPage] = useState(1);

    const getSubmissions = async (page: number) => {
        try {
            const { data } = await axiosPrivate.get(
                `/submissions?page=${page}&limit=5`
            );
            console.log(data);
            setSubmissions(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getSubmissions(page);
    }, [page]);

    const handleNext = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePrevious = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <main className="max-w-2xl  mx-auto   h-full">
            <div className="flex flex-col">
                {submissions.map((submission) => (
                    <Submission {...submission} />
                ))}
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={handlePrevious} />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">{page}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" onClick={handleNext} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </main>
    );
}

export default Home;
